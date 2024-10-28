import React, { useEffect, useState } from 'react';
import { API_SERVER_HOST } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';
import { getOne } from '../../api/productsApi';
import FetchingModal from '../common/FetchingModal';
import useCustomCart from '../../hooks/useCustomCart';
// import useCustomLogin from '../../hooks/useCustomLogin';
import CartComponent from '../menus/CartComponent';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Button } from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons';

const initState = {
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
    uploadFileNames: []
};
const host = API_SERVER_HOST;

const ReadComponent = ({ pno }) => {
    const [product, setProduct] = useState(initState);
    const { moveToList, moveToModify, page, size } = useCustomMove();
    const [fetching, setFetching] = useState(false);
    const [currentImage, setCurrentImage] = useState(0)
    // const { changeCart, cartItems } = useCustomCart();
    // const { loginState } = useCustomLogin();

    // const handleClickAddCart = () => {
    //     let qty = 1;

    //     const addedItem = cartItems.filter(item => item.pno === parseInt(pno))[0];

    //     if (addedItem) {
    //         if (window.confirm("이미 추가된 상품입니다. 추가하시겠습니까? ") === false) {
    //             return;
    //         }
    //         qty = addedItem.qty + 1;
    //     }
    //     changeCart({ email: loginState.email, pno: pno, qty: qty });
    // };

    useEffect(() => {
        setFetching(true);

        getOne(pno).then(data => {
            setProduct(data);
            setFetching(false);
        });
    }, [pno]);

    return (
        <div className='grid grid-cols-3 gap-6 mt-10 m-4'>
            {/* Product Details Section */}
            <Card className='col-span-2 border-2 p-4 rounded-lg shadow-md'>
                <CardHeader className="space-y-1">
                    {fetching ? <FetchingModal /> : null}
                    <div className='border w-20 rounded-2xl border-solid text-center font-bold mb-2'>No.{product.pno}</div>
                    <CardTitle className='text-4xl font-bold'>{product.pname}</CardTitle>
                </CardHeader>
                
{/*--------------------------- Product Images ---------------------------------------------------------------------------*/}
                <CardContent className="grid gap-6 md:grid-cols-2">
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
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-3xl font-semibold">Description</h3>
                            <p className="mt-2 text-gray-600">{product.pdesc}</p>
                        </div>
                    
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold">{product.price.toLocaleString()}원</h3>
                        </div>
                        {/* Action Buttons */}
                        <div className='flex justify-end p-4 space-x-4'>
                            <button
                                type='button'
                                className='rounded p-4 text-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300'
                                //onClick={handleClickAddCart}
                            >
                                <ShoppingCartOutlined /> Add to Cart
                            </button>
                            <button
                                type='button'
                                className='rounded p-4 text-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300'
                                // onClick={() => moveToModify(pno)}
                            >
                                Buy Now
                            </button>
                            <button
                                type='button'
                                className='rounded p-4 text-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300'
                                onClick={() => moveToModify(pno)}
                            >
                                Modify
                            </button>
                            <button
                                type='button'
                                className='rounded p-4 text-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300'
                                onClick={() => moveToList({ page, size })}
                            >
                                List
                            </button>
                        </div>
                    </div>
                </CardContent>
            
                <CardFooter className="justify-between">
                    <p className="text-sm text-gray-500">Free shipping on orders over 50,000won</p>
                    <p className="text-sm text-gray-500">30-day return policy</p>
                </CardFooter>
            </Card>

            {/* Cart Section */}
            {/* <div className='col-span-1 border-2 p-4 rounded-lg shadow-md'>
                <CartComponent />
            </div> */}
         
        </div>
    );
};

export default ReadComponent;
