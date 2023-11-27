"use client"
import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

function LoginPage() {

    const router = useRouter();
    const [user,setUser] = useState({username:"",password:""});
    const headers = {
      'Content-Type': 'application/json', // Adjust the content type as needed
      // Add any other headers here if necessary
    };

    async function HandleForm(e){
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:8000/login/",user,{headers})
        if(response.data.status==200){
            Cookies.set('token',response.data.token);
            Cookies.set('isEmployer',response.data.user.isEmployer);
            alert('Logging In')
            const isEmployer = Cookies.get('isEmployer')
            if(isEmployer==='true')
                router.push("/post") 
            else
                router.push('/home')
        }else{
          console.log('Error In Login')
        }
        
      } catch (error) {
        console.log(error)
      }

    }

    

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">Login</h2>
        <form onSubmit={(e)=>{HandleForm(e)}}>
        
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              id="username"
              name="username"
              type="username"
              value={user.username}
              onChange={(e)=>{setUser({...user,username:e.target.value})}}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={(e)=>{setUser({...user,password:e.target.value})}}
              required
            />
          </div>
          <button
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
            type="submit"
          >
            Login
          </button>
          <div className='text-black pt-5 text-center'>Don't have an account? <Link href='/register'>SignUp</Link></div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage