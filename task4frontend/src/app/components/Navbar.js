'use client'
import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    function Logout(){
        Cookies.remove('token');
        Cookies.remove('isEmployer');
        router.push('/');
    }
  return (
    <nav className="bg-blue-500 p-4 flex flex-col sm:flex-row items-center justify-between">
      {/* Brand Name */}
      <a href='/' className="text-white text-2xl font-bold mb-2 sm:mb-0">
        SportsLover.com
      </a>

      {/* Search Bar */}
     

      {/* Shopping Cart Icon */}
      <div className="text-white mt-2 sm:mt-0">
            <a href='/cart/' className='text-white pr-6 text-lg'>Cart</a>
            <button onClick={()=>{Logout()}} className="text-white mt-2 sm:mt-0">
            Logout
      </button>
      </div>
      
    </nav>
  );
};

export default Navbar;
