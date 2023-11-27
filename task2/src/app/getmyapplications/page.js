'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ApplicationCard from '../components/ApplicationCard'
import axios from 'axios'
import Cookies from 'js-cookie'

function page() {
  const [data,setData] = useState(null);
  useEffect(()=>{
    async function calling(){
      try {
        const response = await axios.post('http://localhost:8000/allapplied/',{token:Cookies.get('token')});
        if(response.data.status===200){
          console.log(response.data.data)
          setData(response.data.data)
        }else{
          console.log('Error')
        }
      } catch (error) {
        console.log(error)
      }
    }
    calling()
  },[]);
  return (
    <div className='bg-white w-screen min-h-screen'>
        <Navbar/>
        <div className='flex flex-wrap justify-center'>
        {data &&
          data.map((item) => (
            <ApplicationCard id={item.id} date={item.date} userContact={item.onPOST.position} resume={item.resume} />
          ))}
      </div>
    </div>
  )
}

export default page