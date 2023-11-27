import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Modal = ({ isOpen, closeModal,id}) => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };



  const handleFileUpload = async (name,fileList) => {
    try {
      const formData = new FormData();
  
      // Convert the FileList to an array
      const files = Array.from(fileList);
  
      // Append each file to the formData
      files.forEach((file, index) => {
        formData.append(`resume`, file);
      });
  
      const token = Cookies.get('token');
      const t = {token:token,id:id}
  
      // Make a POST request to your API route with the FormData
      const response = await axios.post('http://127.0.0.1:8000/apply/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {t}, // Send the token as a parameter
      });
  
      console.log('Response from the server:', response.data);
    //   router.push('/')
  
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  // Handling Files and saving them in a variable
  let files = null;
  const handleFileInputChange = (e) => {
     files = e.target.files;
  };

  // Function to handle modal form submission
  const handleSubmit = () => {
    handleFileUpload(name,files);
    closeModal();
  };

    

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed inset-0 overflow-y-auto flex items-center justify-center z-50`}
    >
      <div className="modal-container bg-indigo-400 w-11/12 md:max-w-md mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Apply for Post</p>
            <div
              className="modal-close cursor-pointer z-50"
              onClick={closeModal}
            >
              <svg
                className="fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M15.998 1.543l-1.543-1.543-6.455 6.456-6.456-6.456-1.543 1.543 6.456 6.455-6.456 6.456 1.543 1.543 6.456-6.456 6.456 6.456 1.543-1.543-6.456-6.456 6.456-6.456z"
                ></path>
              </svg>
            </div>
          </div>
          <form>
            
            <div className="mb-4">
              <label className="block text-white text-md font-bold mb-2">
                Upload Resume
              </label>
              <input
                className=''
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileInputChange}
                />
            </div>
          </form>
          <div className="mt-5 text-right">
            <button
              onClick={handleSubmit}
              className="bg-slate-500 rounded-xl text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Submit
            </button>
            <button
              className="modal-close bg-gray-400 rounded-xl text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
