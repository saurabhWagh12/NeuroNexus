import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Card(props) {
  const [isEmployer, setIsEmployer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const got = Cookies.get('isEmployer');
    if (got === 'true') {
      setIsEmployer(true);
    } else {
      setIsEmployer(false);
    }
  }, []);

  const seeApplications = (id) => {
    router.push(`/applications/${id}/`);
  };

  // MODAL FUNCTIONS
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const DeleteJobApplication = async(id)=>{
    const response = await axios.get(`http://localhost:8000/deleteapplicationpost/${id}/`)
    console.log(id)
    // router.push('/');
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden min-w-lg max-w-lg mx-4 my-4">
      <div className="">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {props.date}
          </div>
          <span className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            {props.position}
          </span>
          <p className="mt-2 text-gray-500">{props.description}</p>
          <p className="mt-2 mb-3 text-gray-500">Experience: {props.experience}</p>
          <div className='flex'>
          <div>
            {isEmployer ? (
              <button onClick={() => seeApplications(props.id)} className="px-4 py-2 rounded-lg font-semibold bg-indigo-400">
                See Applications
              </button>
            ) : (
              <button onClick={openModal} className="px-4 py-2 rounded-lg font-semibold bg-indigo-400">
                Apply
              </button>
            )}
          </div>

          {isEmployer?(

            <button
            onClick={()=>{DeleteJobApplication(props.id)}}
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


          ):(<></>)}
        </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} id={props.id} closeModal={closeModal} />
    </div>
  );
}

export default Card;
