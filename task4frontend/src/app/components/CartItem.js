'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';

const ProductCard = (props) => {
const router = useRouter();

  const link = `http://localhost:8000/static${props.image}`;
  const cardStyle = {
    width: '300px', // Set your desired width
    height: '380px', // Set your desired height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    maxHeight: '200px', // Set your desired max image height
    objectFit: 'contain', // Use 'contain' to fit the image within the container
  };

  async function ReduceQuantity(id){
    try {
        const response = await axios.get(`http://localhost:8000/reducequantity/${id}/`);
        if(response.data.status===200){
            // alert("Item's Quantity Reduced");
            window.location.reload();
        }else{
            alert('error')
        }
    } catch (error) {
        console.log(error)
    }
 
  }

  async function IncreaseQuantity(id){
    try {
        const response = await axios.get(`http://localhost:8000/increasequantity/${id}/`);
        if(response.data.status===200){
            // alert("Item's Quantity Increased");
            window.location.reload();
        }else{
            alert('error')
        }
    } catch (error) {
        console.log(error)
    }
 
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden m-4 p-4" style={cardStyle}>
      <img
        src={link}
        alt={props.name}
        style={imageStyle}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{props.name}</h3>
        <p className="text-gray-600 mt-2"><button onClick={()=>{ReduceQuantity(props.id)}} className='border border-black border-1 px-2'>-</button>  Quantity: {props.quantity}  <button onClick={()=>{IncreaseQuantity(props.id)}} className='border border-black border-1 px-2'>+</button></p>
      </div>
      <div className="mt-4">
        <span className="text-gray-800 font-bold text-2xl">
          {props.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
