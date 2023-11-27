from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import *
import jwt
from django.db.models import Q
import datetime
from .models import *
from django.contrib.auth import authenticate
from rest_framework import generics,status

# Searching for specific post:
def searchedResult(queryset):
    try:
        serializer = JobPOSTSerializer(queryset, many=True)
        return {'status': 200, 'data': serializer.data}
    except:
        return {'status': 404, 'message': 'Not Found'}

class JobPOSTSearchView(generics.ListAPIView):
    serializer_class = JobPOSTSerializer

    def get_queryset(self):
        queryset = JobPOST.objects.all()
        search_query = self.request.query_params.get('q', None)
        if search_query:
            queryset = queryset.filter(
                Q(position__icontains=search_query) | Q(description__icontains=search_query)
            )
        
        result = searchedResult(queryset)  # Serialize and store the result
        return result  # Return the result

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        status_code = queryset.get('status', 200)
        data = queryset.get('data', [])

        return Response({'data':data, 'status':status_code})
    



class ApplicationAPI(APIView):
    # Posting a Application on a particular job post(need to just pass jobId):
    def post(self, request):
        try:
            # token = request.COOKIES.get('token')

            token = request.query_params.get('t[token]')
            id = request.query_params.get('t[id]') 
            # print(token,id)
            if not token:
                return Response({'status': 400, 'message': 'Authentication failed'})

            try:
                # Verify the JWT token and decode the payload
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])

                # Retrieve the user based on the user ID in the payload
                user = User.objects.filter(id=payload['id']).first()
                checkingEmployer = USER.objects.get(user=user)
                jobPost = JobPOST.objects.get(pk=id)

                if not checkingEmployer.isEmployer:
                    application = Application.objects.create(user=checkingEmployer, onPOST=jobPost, resume=request.data.get('resume'))
                    application.save()
                    return Response({'status': 200, 'message': 'Application successful'})
                else:
                    return Response({'status': 400, 'message': 'Employer cannot apply. Create another employee account to apply'})

            except jwt.ExpiredSignatureError:
                return Response({'status': 400, 'message': 'Token has expired'})
            except User.DoesNotExist:
                return Response({'status': 400, 'message': 'User not found'})
            except USER.DoesNotExist:
                return Response({'status': 400, 'message': 'USER not found'})
            except JobPOST.DoesNotExist:
                return Response({'status': 400, 'message': 'JobPOST not found'})
        except Exception as e:
            return Response({'status': 400, 'message': f'Error: {str(e)}'})
    
    # Getting All Applications of User(Who applied in different job-openings):
    @api_view(['POST'])
    def getAllAppliedApplications(request):
        try:
            # token = request.COOKIES.get('token')
            token = request.data['token']
            if not token:
                return Response({'status': 400, 'message': 'Authentication failed'})

            try:
                # Verify the JWT token and decode the payload
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])

                # Retrieve the user based on the user ID in the payload
                user = User.objects.filter(id=payload['id']).first()
                checkingEmployer = USER.objects.get(user=user)
                applications = Application.objects.filter(user = checkingEmployer)
                if not checkingEmployer.isEmployer:
                    serializer = ApplicationSerializer(applications,many=True)
                    return Response({'status': 200, 'data': serializer.data})
                else:
                    return Response({'status': 400, 'message': "Employer don't have any applications "})

            except jwt.ExpiredSignatureError:
                return Response({'status': 400, 'message': 'Token has expired'})
            except User.DoesNotExist:
                return Response({'status': 400, 'message': 'User not found'})
            except USER.DoesNotExist:
                return Response({'status': 400, 'message': 'USER not found'})
            except JobPOST.DoesNotExist:
                return Response({'status': 400, 'message': 'JobPOST not found'})
        except Exception as e:
            return Response({'status': 400, 'message': f'Error: {str(e)}'})

    

#Getting all job posts:

@api_view(['GET'])
def getAllPosts(request):
    try:
        posts = JobPOST.objects.all().order_by('-date')
        serializer = JobPOSTSerializer(posts, many=True)  # Use the serializer

        return Response({'status': 200, 'data': serializer.data})
    except Exception as e:
        return Response({'status': 400, 'message': f'Error: {str(e)}'})


# Classes and Functions Related job posting and handling employer who is posting the job

class JobApplicationAPI(APIView):
    # Posting a job opening:
    def post(self,request):
        try:
            # token = request.COOKIES.get('token')
            token = request.query_params.get('t[token]')
            if not token:
                return Response({'status': 400, 'message': 'Authentication failed'})

            try:
                # Verify the JWT token and decode the payload
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])

                # Retrieve the user based on the user ID in the payload
                user = User.objects.filter(id=payload['id']).first()
                checkingEmployer = USER.objects.get(user=user)
                if checkingEmployer.isEmployer==True:
                    jobpost = JobPOST.objects.create(belongTo=checkingEmployer,description=request.data['description'],position=request.data['position'],experience=request.data['experience'])
                    jobpost.save()
                  
                    if jobpost:
                        return Response({'status':200,'message':'Job Post Creation Successful'})
                    else:
                        return Response({'status':400,'message':'Error in Post Creation'})
                else:
                    return Response({'status':400,'message':'Not An Employer'})

            except jwt.ExpiredSignatureError:
                return Response({'status': 400, 'message': 'Token has expired'})
        except:
            return Response({'status':400,'message':'Error'})

    # Getting all job posts posted by sepcific user: 
    @api_view(['POST'])
    def GetJobPosts(request):
        try:
            # token = request.COOKIES.get('token')
            token = request.data['token']
            if not token:
                return Response({'status': 400, 'message': 'Authentication failed'})

            try:
                # Verify the JWT token and decode the payload
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])

                # Retrieve the user based on the user ID in the payload
                user = User.objects.get(id=payload['id'])
                employer = USER.objects.get(user=user)
                if employer.isEmployer:
                    posts = JobPOST.objects.filter(belongTo = employer)
                    if posts:
                        serializer = JobAppilicationSerializer(posts,many=True)
                        try:
                            return Response({'status':200,'data':serializer.data})
                        except:
                            return Response({'status':400,'message':'Error in Extraction of Data'})
                    else:
                        return Response({'status':400,'message':'No Posts'})
                else:
                    return Response({'status':400,'message':'Not An Employer'})

            except jwt.ExpiredSignatureError:
                return Response({'status': 400, 'message': 'Token has expired'})
       
            
        except:
            return Response({'status':400,'message':'Error in Application'})
    
    # Getting all Applications on a Particular JOB-Post:
    @api_view(['GET'])
    def getApplicationsOnJOBPOST(request,id):
        try:
            jobPost = JobPOST.objects.get(pk=id)
            application = Application.objects.filter(onPOST=jobPost)
            serializer = ApplicationSerializer(application,many=True)
            return Response({'status':200,'data':serializer.data})
        except:
            return Response({'status':400,'message':'Error in Application Extration for this Job Post'})
        


# Functions and Classes For Handling User Related Functions Like Login,Logout,Registration: 

class LoginAPI(APIView):
    def post(self,request):
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
                userU = USER.objects.get(user=user)
                serializer = USERSerializer(userU)
                token = jwt.encode(payload, 'secret', algorithm='HS256')

                response = Response({'status': 200, 'token': token,'user':serializer.data})

                # Set the token as a cookie in the response
                # response.set_cookie(key='token', value=token, domain='.localhost', secure=False, httponly=False)
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
    
class RegisterAPI(APIView):
    def post(self, request):
        data = request.data
        try:
            serializer = RegisterSerializer(data=data)
            if serializer.is_valid():
                user = User.objects.create_user(username=serializer.data['username'], email=serializer.data['email'],first_name=serializer.data['firstname'],last_name=serializer.data['lastname'])
                user.set_password(serializer.data['password'])
                user.save()

                finalUser = USER.objects.create(user=user,isEmployer=serializer.data['isEmployer'],phone=serializer.data['phone'])
                finalUser.save()
                if finalUser:
                    return Response({'status': 200, 'message': 'Registration Successful'})
            return Response({'status': 400, 'message': 'Error in Registration'})
        except Exception as e:
            return Response({'status': 400, 'message': 'Error: ' + str(e)})


@api_view(['GET'])
def deleteApplication(request,id):
    try:
        application = Application.objects.get(pk=id)
        application.delete()
        return Response({'status':200,'message':'deleted job application'})

    except:
        return Response({'status':400,'message':'Error in deletion of application'})
    
    
@api_view(['GET'])
def deleteApplicationPOST(request,id):
    try:
        jobpost = JobPOST.objects.get(pk=id)
        jobpost.delete()
        return Response({'status':200,'message':'deleted Job Post'})

    except:
        return Response({'status':400,'message':'Error in deletion of Post'})