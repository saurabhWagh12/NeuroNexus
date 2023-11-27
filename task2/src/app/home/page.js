'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/card'; 
import Navbar from '../components/Navbar';

function Page() {
  const [state, setState] = useState({ searchQuery: '' }); // Initialize searchQuery in state
  const [data, setData] = useState(null);
  const [searchResults, setSearchResults] = useState(null); // Store search results

  useEffect(() => {
    async function getJobPosts() {
      try {
        const response = await axios.get('http://localhost:8000/getjobposts/');
        if (response.status === 200) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getJobPosts();
  }, []);

  const handleSearchSubmit = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/jobpost/search/?q=${state.searchQuery}`)
        if(response.data.status===200){
            console.log(response.data.data)
            setSearchResults(response.data.data)
        }else{
            console.log('Error in Extracting data')
        }
    } catch (error) {
        console.log(error)
    }
    
  };

  return (
    <div className='bg-white w-screen min-h-screen'>
      <Navbar />
      <div >
      <div className='flex justify-center gap-8 my-8'>
        <input
         className='text-black px-3 font-semibold border-b-2'
          type="text"
          placeholder="Search for jobs..."
          value={state.searchQuery}
          onChange={(e) => setState({ searchQuery: e.target.value })} // Update searchQuery in state
        />
        <button className="px-4 py-2 rounded-lg font-semibold bg-indigo-400" onClick={handleSearchSubmit}>Search</button> {/* Removed (e) from the function call */}
      </div>
      </div>

      {searchResults?(<div className='text-black text-xl  font-bold text-center mx-6'>Search Result</div>):(<></>)}

      {searchResults && (
        <div className='flex flex-wrap justify-center'> 
          {searchResults.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              position={item.position}
              experience={item.experience}
              date={item.date}
              description={item.description}
            />
          ))}
        </div>
      )}


    <div className='text-black font-bold text-xl text-center mx-6'>All Posts</div>

      <div className='flex flex-wrap justify-center'>
        {data &&
          data.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              position={item.position}
              experience={item.experience}
              date={item.date}
              description={item.description}
            />
          ))}
      </div>
    </div>
  );
}

export default Page;
