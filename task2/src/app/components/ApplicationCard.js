'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios'

function ApplicationCard(props) {
  const linktoResume = `http://localhost:8000${props.resume}/`;
  const [isEmployer,setIsEmployer] = useState(false);
  useEffect(()=>{
    function calling(){
        if(Cookies.get('isEmployer')==='true'){
            setIsEmployer(true)
        }else{
            setIsEmployer(false)
        }
    }
    calling()
  },[]);

  const DeleteApplication = async(id)=>{
    try {
        // console.log(id)
        const response = await axios.get(`http://localhost:8000/deletejobapplication/${id}/`)
        if(response.data.status===200){
            alert('Application Deleted');
        }else{
            console.log('Error')
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden min-w-lg max-w-lg mx-4 my-4">
      <div className="">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {props.date}
          </div>
          <span className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            {props.userContact}
          </span>
          <a href={linktoResume} download className="mt-2 text-gray-500">
            Download Resume
          </a>

        {isEmployer?(<></>):(

            <button
            onClick={()=>{DeleteApplication(props.id)}}
            className="bg-red-400 text-whitem mx-4 p-2 px-4 rounded-full hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
            >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-trash-2"
            >
            <polyline points="3 6 5 6 21 6" />
            <path d="M16 6l-1.674-1.675C14.65 4.288 14 4.9 14 5.5" />
            <path
                d="M3 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6"
            />
            <path d="M10 11L10 17" />
            <path d="M14 11L14 17" />
            </svg>
            </button>


        )}

        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
