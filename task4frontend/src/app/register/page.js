"use client"
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

function SignUp() {
  const router = useRouter();
    const [user,setUser] = useState({username:"",email:"",password:""});
    const headers = {
      'Content-Type': 'application/json', // Adjust the content type as needed
      // Add any other headers here if necessary
    };

    async function HandleForm(e){
      e.preventDefault();
      // console.log(user)
      await axios.post("http://localhost:8000/register/",user,{headers})
      .then((response) => {
          // Handle success
          if(response.data.status===200)
         { console.log('Response:', response.data);
          alert('Registration Successful')
          router.push('/login/')
        }else{
            alert('Error in Registration');
            console.log('Error')
        }
        })
        .catch((error) => {
          // Handle error
          alert('Error in Registration');
          console.error(error.message);
        });
    }

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">Sign Up</h2>
        <form onSubmit={(e)=>{HandleForm(e)}}>
        <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
              Name
            </label>
            <input
              className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500"
              id="name"
              name="name"
              type="text"
              value={user.name}
              onChange={(e)=>{setUser({...user,username:e.target.value})}}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2  text-black border rounded-lg focus:outline-none focus:border-blue-500"
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={(e)=>{setUser({...user,email:e.target.value})}}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={(e)=>{setUser({...user,password:e.target.value})}}
              required
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Sign Up
          </button>
          <div className='text-black pt-5 text-center'>Already have an account? <Link href='/login'>login</Link></div>
        </form>
      </div>
    </div>
  )
}

export default SignUp