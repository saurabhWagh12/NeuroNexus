'use client'
import Image from 'next/image'
import Navbar from './components/Navbar'
import Card from './components/Card'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'


export default function Home() {
    const [products,setProducts] = useState(null);
    const [searchproducts,setsearchProducts] = useState(null);

    const [search,setSearch] = useState("");
    useEffect(()=>{
      async function calling(){
        try {
          const response = await axios.get('http://localhost:8000/products/');
          if(response.data.status===200){
            // console.log(response.data.data)
            setProducts(response.data.data)
          }else{
            console.log('Error')
          }
        } catch (error) {
          console.log(error)
        }
      }
      calling()
    },[]);

    const SearchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/products/search/?q=${search}`);
        if (response.data.status === 200) {
          setsearchProducts(response.data.data);
        } else {
          console.log('Error in Extracting data');
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className='w-screen min-h-screen bg-white'>
      <Navbar/>

      <div className="flex my-5 justify-center flex-col items-center sm:flex-row sm:items-center space-y-2 sm:space-y-0 space-x-0 sm:space-x-4">
        <input
          type="text"
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
          className="border border-gray-400 text-black p-2 rounded-lg w-full sm:w-64"
          placeholder="Search..."
        />
        <button onClick={()=>{SearchProduct()}} className="bg-gray-600 text-white p-2 rounded-lg w-full sm:w-auto">
          Search
        </button>
      </div>

      {searchproducts?(<h1 className='text-xl font-semibold text-black text-center'>Search Result</h1>):(<></>)}
      <div className='flex flex-wrap justify-center'>
        {searchproducts &&
          searchproducts.map((item) => (
            <Card id={item.id} name={item.name} description={item.description} price={item.price}
            image={item.image} date={item.date}/>
          ))}

      </div>

      {products?(<h1 className='text-xl mt-4 font-semibold text-black text-center'>Products</h1>):(<></>)}

      <div className='flex flex-wrap justify-center'>
        {products &&
          products.map((item) => (
            <Card id={item.id} name={item.name} description={item.description} price={item.price}
            image={item.image} date={item.date}/>
          ))}

      </div>
    </div>
  )
}
