import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';// Should be { Cookies } from 'js-cookie' without the braces
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isEmployer, setIsEmployer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function calling(){
        const got = Cookies.get('isEmployer');
        if (got === 'true') {
        setIsEmployer(true);
        } else {
        setIsEmployer(false);
        }
    }
    calling()
  }, []);

  function Logout(){
    Cookies.remove('token');
    Cookies.remove('isEmployer');
    router.push('/');
  }

  return (
    <nav className="bg-indigo-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-xl font-semibold">GetYourJob.com</a>
        <ul className="flex space-x-4">
          
          <li>
            {isEmployer ? (
              <a href="/postjob/" className="text-white hover:text-blue-300">
                Job Posts
              </a>
            ) : (
              <a href="/getmyapplications/" className="text-white hover:text-blue-300">
                Applications
              </a>
            )}
          </li>

          <li>
            <button onClick={()=>{Logout()}} className="text-white hover:text-blue-300">
              Logout
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
