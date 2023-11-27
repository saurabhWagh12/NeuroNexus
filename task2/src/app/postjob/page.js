'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

function page() {
    const [user,setUser] = useState({position:"",experience:"",description:""});
    const token = Cookies.get('token');
      const t = {token:token}
    const router = useRouter();

    const HandleForm = async(e)=>{
        e.preventDefault();
        console.log(user)
        try{
            const response = await axios.post('http://localhost:8000/jobapplication/',user, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
                params: {t}, // Send the token as a parameter
            });
            if(response.data.status===200){
                // console.log(response.data)
                router.push('/')
            }else{
                console.log('Error')
            }
        }catch(e){
            console.log(e);
        }
    }

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">Login</h2>
        <form onSubmit={(e)=>{HandleForm(e)}}>
        
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="username">
              Position:
            </label>
            <input
              className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              id="position"
              name="position"
              type="text"
              value={user.position}
              onChange={(e)=>{setUser({...user,position:e.target.value})}}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
              Experience
            </label>
            <input
              className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              id="experience"
              name="experience"
              value={user.experience}
              onChange={(e)=>{setUser({...user,experience:e.target.value})}}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="experience">
                Description
            </label>
            <textarea
                className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                id="description"
                name="description"
                value={user.description}
                onChange={(e) => setUser({ ...user, description: e.target.value })}
                required
            />
        </div>

          <button
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default page