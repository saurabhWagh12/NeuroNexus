'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar';
import Card from '../components/card';

function page() {
    const [data,setData] = useState(null); 
    useEffect(()=>{
        async function getJobPosts(){
            const response = await axios.post('http://localhost:8000/getalljobposts/',{token:Cookies.get('token')})
            console.log(response.data)
            setData(response.data.data)
        }
        getJobPosts();
    },[]);
  return(
    <div className='bg-white w-screen min-h-screen'>
        <Navbar/>
        <div className='flex flex-wrap justify-center'>
        {data &&
          data.map((item) => (
            <Card key={item.id} id={item.id} position={item.position} experience={item.experience} date={item.date} description={item.description} />
          ))}
      </div>
    </div>
  )
}

export default page