'use client'
import Navbar from '@/app/components/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

function Product({params}) {
  const {id} = params;
  const [product,setProduct] = useState(null);
  const token = Cookies.get('token');
  const t = {token:token}

  useEffect(()=>{
    async function calling(){
        try {
            const response = await axios.get(`http://localhost:8000/getproduct/${id}/`)
            if(response.data.status===200){
              setProduct(response.data.data)
              console.log(response.data)
            }else{
              console.log('Error')
            }
          
        } catch (error) {
          console.log(error);
        }
      }
      calling()
  },[])

  async function addToCart(){
    console.log("Clicked");
    try {
      const response = await axios.post('http://localhost:8000/addtocart/',{productId:id}, {
        headers: {
          'Content-Type': 'multipart/form-data',
          },
          params: {t}, // Send the token as a parameter
      });
      if(response.data.status===200){
        console.log(response.data)
        alert(response.data.message)
      }else{
        console.log(response.data)
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  return (

    <div className=' min-w-screen min-h-screen bg-white'>
      <Navbar/>

    <div className="bg-slate-100 text-black rounded-lg shadow-md  flex item-center justify-center mx-10 mt-10 p-4">
    {product ? (
      <>
        <img src={`http://localhost:8000/static${product.image}`} alt={product.name} className="w-48 h-48 object-cover mx-auto" />
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <span className="text-gray-800 font-bold text-3xl">{product.price}</span>
          <button onClick={()=>{addToCart()}} className="bg-blue-500 ml-4 text-white mt-4 py-3 px-6 rounded-full hover-bg-blue-600 transition duration-300">
            Add to Cart
          </button>
        </div>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  </div>

  )
}

export default Product