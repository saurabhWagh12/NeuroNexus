'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import CardItem from '../components/CartItem'
import Navbar from '../components/Navbar';
import payment from '../payment'


function Cart() {
  const [product,setProduct] = useState(null);
  const token = Cookies.get('token');
  const [total,setTotal] = useState(0)

  const dict = {'Volley Ball':'price_1OAYVDSHgfpV3VGrsai38oIT','Cricket Bat':'price_1OAYVlSHgfpV3VGrTKul2Tf4','Foot Ball':'price_1OAYU4SHgfpV3VGrIMMCcCJr','Badminton Racket':'price_1OAYWDSHgfpV3VGrGSgbKM0u'};

  useEffect(()=>{
    async function calling(){
      try {
        const response = await axios.post('http://localhost:8000/getcartproducts/',{token:token});
        if(response.data.status===200){
          setProduct(response.data.data)
          setTotal(response.data.total)
        }else{
          console.log("error")
        }
      } catch (error) {
        console.log(error)
      }
    }
    calling()
  },[]);

  function handlePayment(){
    const lineItems = []
    for (let i = 0; i < product.length; i++) {
      const item = product[i];
      if(item.name in dict){
        const foundValue = dict[item.name];
        let obj = {price:foundValue,quantity:item.quantity}
        lineItems.push(obj);
      }
    }
    payment({
      lineItems:lineItems
    })
  }

  return (
    <div className='w-screen min-h-screen bg-white text-black'>
      <Navbar/>
      <div className='flex gap-4 justify-center py-5'>
      <h1 className='text-xl mt-4 font-semibold text-black text-center'>Total : {total}</h1>
      <button onClick={(()=>{
        handlePayment()
      })} className="bg-blue-500 text-white ml-6 mt-2 py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">Proceed To checkout</button>
      </div>
      <div className='flex flex-wrap justify-center'>

        {product &&
            product.map((item) => (
              <CardItem id={item.id} name={item.name} quantity={item.quantity} price={item.price}
              image={item.image} />
            ))}
      </div>
        
    </div>
  )
}

export default Cart