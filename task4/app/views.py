from django.shortcuts import render,redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import *
from django.conf import settings
import jwt
from django.db.models import Q
import datetime
from .models import *
import stripe
from django.contrib.auth import authenticate
from rest_framework import generics,status

# Create your views here.

# Searching for specific Product:
def searchedResult(queryset):
    try:
        serializer = ProductSerializer(queryset, many=True)
        return {'status': 200, 'data': serializer.data}
    except:
        return {'status': 404, 'message': 'Not Found'}

class ProductSearchView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        search_query = self.request.query_params.get('q', None)
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | Q(description__icontains=search_query)
            )
        
        result = searchedResult(queryset)  # Serialize and store the result
        return result  # Return the result

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        status_code = queryset.get('status', 200)
        data = queryset.get('data', [])

        return Response({ 'status':status_code,'data':data})
    




class AddToCartAPI(APIView):
    def post(self,request):
        try:
            productid = request.data['productId']
            # token = request.COOKIES.get('token')
            token = request.query_params.get('t[token]')

            payload = jwt.decode(token, 'secret', algorithms=['HS256'])

            # Retrieve the user based on the user ID in the payload
            
            user = User.objects.get(id=payload['id'])
            cart = Cart.objects.get(user=user)
            product = Product.objects.get(pk=productid)

            # Getting all items belonging to the cart of a person
            try:
                item = CopyOfProduct.objects.get(belongTo=cart, productId=product.id)
                item.quantity += 1
                item.save()
            except CopyOfProduct.DoesNotExist:
                copy = CopyOfProduct.objects.create(
                    productId=product.id,
                    image=product.image,
                    price=product.price,
                    name=product.name,
                    quantity=1,
                    belongTo=cart
                )
                copy.save()
            return Response({'status':200,'message':'Item added to Cart'})
        except Exception as e:
            return Response({'status': 400, 'message': 'Error: ' + str(e)})
   
    @api_view(['POST'])
    def getMyCart(request):
        try:
            # token = request.COOKIES.get('token')
            token = request.data['token']
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])

            # Retrieve the user based on the user ID in the payload
            user = User.objects.get(id=payload['id'])
            cart = Cart.objects.get(user=user)

            #Getting all items belong to cart of a person:
            items = CopyOfProduct.objects.filter(belongTo=cart)
            #Finding out total cost of cart
            total=0
            for item in items:
                total+=(item.price*item.quantity)
            serializer = CopyOfProductSerializer(items,many=True)

            return Response({'status':200,'data':serializer.data,'total':total})
        except Exception as e:
            return Response({'status': 400, 'message': 'Error: ' + str(e)})


class ProductAPI(APIView):
    def get(self,request):
        try:
            products = Product.objects.all()
            serializer = ProductSerializer(products,many=True)
            return Response({'status':200,'data':serializer.data})
        except Exception as e:
            return Response({'status': 400, 'message': 'Error: ' + str(e)})


class RegistrationAPI(APIView):
    def post(self, request):
        data = request.data
        try:
            serializer = RegisterSerializer(data=data)
            if serializer.is_valid():
                user = User.objects.create_user(username=serializer.data['username'], email=serializer.data['email'])
                user.set_password(serializer.data['password'])
                user.save()
                cart = Cart.objects.create(user=user)
                cart.save()
                return Response({'status': 200, 'message': 'Registration Successful'})
            return Response({'status': 400, 'message': 'Error in Registration'})
        except Exception as e:
            return Response({'status': 400, 'message': 'Error: ' + str(e)})

class LoginAPI(APIView):
    def post(self, request):
        try:
            data = request.data
            username = data.get('username')
            password = data.get('password')

            user = authenticate(username=username, password=password)

            if user is not None:

                # Create a JWT token
                payload = {
                    'id': user.id,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=1440),
                    'iat': datetime.datetime.utcnow()
                }

                token = jwt.encode(payload, 'secret', algorithm='HS256')
                response = Response({'status': 200, 'token': token})

                # Set the token as a cookie in the response
                response.set_cookie(key='token', value=token)
                return response
            else:
                return Response({'status': 400, 'message': 'Invalid Credentials'})

        except Exception as e:
            return Response({'status': 400, 'message': 'Error: ' + str(e)})

@api_view(['GET'])
def Logout(request):
    try:
        response = Response({'status': 200, 'message': 'Logging-Out'})
        response.delete_cookie('token')
        return response
    except:
        return Response({'status':400,'message':'Error in Logging-Out'})

@api_view(['get'])
def getProduct(request,id):
    try:
        product = Product.objects.get(pk=id)
        serializer = ProductSerializer(product)
        return Response({'status':200,'data':serializer.data})
    except Exception as e:
        return Response({'status': 400, 'message': 'Error: ' + str(e)})
    
@api_view(['GET'])
def reduceQuantity(request,id):
    try:
        product = CopyOfProduct.objects.get(pk=id)
        if product.quantity>0:
            product.quantity-=1
            if product.quantity == 0:
                product.delete()
                return Response({'status':200,'message':'Success'})
            else:
                product.save()
                return Response({'status':200,'message':'Success'})
        else:
            return Response({'status':400,'message':'Error'})
    except Exception as e:
        return Response({'status': 400, 'message': 'Error: ' + str(e)})

@api_view(['GET'])
def increaseQuantity(request,id):
    try:
        product = CopyOfProduct.objects.get(pk=id)
        if product.quantity>0:
            product.quantity+=1
            product.save()
            return Response({'status':200,'message':'Success'})
        else:
            return Response({'status':400,'message':'Error'})
    except Exception as e:
        return Response({'status': 400, 'message': 'Error: ' + str(e)})
    
