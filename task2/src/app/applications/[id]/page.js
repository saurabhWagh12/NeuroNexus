'use client'
import Navbar from '@/app/components/Navbar';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ApplicationCard from '@/app/components/ApplicationCard';
import { useRouter } from 'next/navigation';

function page({params}){
  const {id} = params; 
  const router = useRouter();
  const [data,setData] = useState(null);

  useEffect(()=>{
    async function calling(){
      const response = await axios.get(`http://127.0.0.1:8000/getapplicationonpost/${id}/`);
      if(response.data.status===200){
        // console.log(response.data.data)
        setData(response.data.data);
      }else{
        console.log('Error')
      }
    }
    calling()

  },[]);


  return (
    <div className='bg-white w-screen min-h-screen text-black'>
      <Navbar/>
      <div className='flex flex-wrap justify-center'>
        {data &&
          data.map((item) => (
             <ApplicationCard id={item.id} date={item.date} userContact={item.user.phone} resume={item.resume}/>
          ))}
      </div>

    </div>
  )
}

export default page