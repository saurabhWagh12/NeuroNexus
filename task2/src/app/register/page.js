"use client"
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function SignUp() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
    const [user,setUser] = useState({username:"",email:"",password:"",isEmployer:"False",phone:"",firstname:"",lastname:""});
    
    const handleCheckboxChange = (event) => {
        if (user.isEmployer==="False")
            setUser({...user,isEmployer:"True"})
        else
            setUser({...user,isEmployer:"False"})

        setIsChecked(event.target.checked);
      };
    
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
          console.log('Response:', response.data);
          toast.success("Registered",{position:'top-center'})
          alert('Registration Successful')
          router.push('/')

        })
        .catch((error) => {
          // Handle error
          console.error(error.message);
          toast.error("SignUp error",{position:'top-center'});
        });
    }

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">Sign Up</h2>
        <form onSubmit={(e)=>{HandleForm(e)}}>

        
        <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
              Firstname
            </label>
            <input
              className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500"
              id="firstname"
              name="firstname"
              type="text"
              value={user.name}
              onChange={(e)=>{setUser({...user,firstname:e.target.value})}}
              required
            />
        </div>

        <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
              Lastname
            </label>
            <input
              className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500"
              id="lastname"
              name="lastname"
              type="text"
              value={user.name}
              onChange={(e)=>{setUser({...user,lastname:e.target.value})}}
              required
            />
        </div>

        <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
              Username
            </label>
            <input
              className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500"
              id="name"
              name="username"
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


          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
              Phone
            </label>
            <input
              className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500"
              id="phone"
              name="phone"
              type="text"
              value={user.name}
              onChange={(e)=>{setUser({...user,phone:e.target.value})}}
              maxLength={10}
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

          <div className='text-black pb-6'>
            <label>
                <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className=' mr-4'
                />
                Are you an Employer?
            </label>

        </div>


          <button
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
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