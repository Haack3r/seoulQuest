import React, { useEffect, useState } from 'react';
import { API_SERVER_HOST } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';
import { StarIcon, ShoppingCartIcon, HeartIcon } from 'lucide-react'

import useCustomCart from '../../hooks/useCustomCart';
import useCustomLogin from '../../hooks/useCustomLogin';
import CartComponent from '../menus/CartComponent';
import { getOneNU } from '../../api/nuProductApi';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';

const initState = {
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
    uploadFileNames: []
};
const host = API_SERVER_HOST;

const NUReadComponent = ({ pno }) => {
    const [product, setProduct] = useState(initState);
    const { moveToList, moveToModify, page, size } = useCustomMove();
    const [fetching, setFetching] = useState(false);
    const [currentImage, setCurrentImage] = useState(0)
    const [value, setValue] = React.useState(0);
    const { loginState } = useCustomLogin();
    const [selectedDate, setSelectedDate] = useState('');
    const [quantity, setQuantity] = useState(1);


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const { changeCart, cartItems } = useCustomCart();
    // const { loginState } = useCustomLogin();
  

    const handleClickAddCart = () => {
        // let qty = 1;

        // const addedItem = cartItems.filter(item => item.pno === parseInt(pno))[0];

        // if (addedItem) {
            
        // }
        // changeCart({ email: loginState.email, pno: pno, qty: qty });
        
    };

    useEffect(() => {
        setFetching(true);

        getOneNU(pno).then(data => {
            setProduct(data);
            setFetching(false);
        });
    }, [pno]);

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative h-96 md:h-full">
          <div className="space-y-4">
                        <div className="aspect-square relative">
                            <img
                                src={`${host}/api/products/view/${product.uploadFileNames[currentImage]}`}
                                alt={product.pname}
                                className="rounded-lg object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex space-x-2">
                            {product.uploadFileNames.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`w-20 h-20 relative rounded-md overflow-hidden ${
                                currentImage === index ? 'ring-2 ring-primary' : ''
                                }`}
                            >
                            <img
                                src={`${host}/api/products/view/${image}`}
                                alt={`${product.pname} thumbnail ${index + 1}`}
                                className="rounded-lg object-cover w-full h-full"
                            />
                            </button>
                            ))}
                        </div>
                    </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-4">{product.pname}</h1>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-gray-600">(4.8) 24 reviews</span>
            </div>
            <p className="text-2xl font-light text-gray-900 mb-6">₩{product.price.toLocaleString()}</p>
            <p className="text-gray-700 mb-6">
            {product.pdesc}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <label htmlFor="size" className="text-gray-700 mb-2 block">Size</label>
              <select
                id="size"
                className="w-full border border-gray-300 p-2 rounded-lg"
                // value={selectedSize}
                // onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">Select size</option>
                <option value="s">Small</option>
                <option value="m">Medium</option>
                <option value="l">Large</option>
                <option value="xl">X-Large</option>
              </select>
            </div>

            {/* Quantity Selection */}
            <div className="flex items-center mb-6">
                            <label htmlFor="quantity" className="text-gray-700 mr-4">
                                Number of Participants
                            </label>
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                max="15"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="w-20 border-gray-300 p-2 rounded-lg"
                            />
                        </div>

            {/* Add to Cart and Wishlist Buttons */}
            <div className="flex space-x-4 mb-8"> <button
                                className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg w-full"
                                
                            >
                                <Link to="/user/products"><ShoppingCartIcon className="mr-2 h-4 w-4" /> Reserve Tour</Link>
                            </button>
        
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 p-3 rounded-lg">
                <HeartIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                            <h2 className="text-gray-900 text-lg font-semibold mb-2">
                                Tour Details
                            </h2>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Duration: 3 hours</li>
                                <li>Meeting Point: Gyeongbokgung Palace Main Gate</li>
                                <li>Max Group Size: 15 people</li>
                                <li>Available: Tuesday, Thursday, Saturday</li>
                            </ul>
                        </div>
                    </div>
                </div>

        {/* Product Tabs */}
        <div className="mt-16">
                    <div className="flex space-x-4 bg-gray-100 p-2 rounded-t-lg">
                        <button className="px-4 py-2 rounded-lg focus:outline-none focus:bg-white">
                            Description
                        </button>
                        <button className="px-4 py-2 rounded-lg focus:outline-none focus:bg-white">
                            Itinerary
                        </button>
                        <button className="px-4 py-2 rounded-lg focus:outline-none focus:bg-white">
                            Reviews
                        </button>
                    </div>

                    <div className="bg-white p-6 border border-gray-200 rounded-b-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            About this Tour
                        </h3>
                        <p className="text-gray-700">
                            Experience the magic of Gyeongbokgung Palace under the moonlight with our exclusive evening tour...
                        </p>
                    </div>
                </div>
      </div>
    </div>
  )
}

export default NUReadComponent;
