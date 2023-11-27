import React from 'react';

const ProductCard = (props) => {
const productPage = `/product/${props.id}/`

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

  function handleAdding(){
    console.log('adding item '+props.id)
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
        {/* <p className="text-gray-600 mt-2">{props.description}</p> */}
      </div>
      <div className="mt-4">
        <span className="text-gray-800 font-bold text-2xl">
          {props.price}
        </span>
        <a href={productPage} className="bg-blue-500 text-white ml-6 mt-2 py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">
          View Product
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
