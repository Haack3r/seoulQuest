import React, { useEffect, useState } from 'react';
import { API_SERVER_HOST } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';
import { getOne } from '../../api/productsApi';
import FetchingModal from '../common/FetchingModal';
import useCustomCart from '../../hooks/useCustomCart';
// import useCustomLogin from '../../hooks/useCustomLogin';
import CartComponent from '../menus/CartComponent';

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
            <div className='col-span-2 border-2 p-4 rounded-lg shadow-md'>
                {fetching ? <FetchingModal /> : null}

                {/* Product Images */}
                
                <div className='w-1/2 justify-center flex flex-col m-auto items-center'>
                    {product.uploadFileNames.map((i, idx) => (
                        <img
                            alt='product'
                            key={idx}
                            className='p-4 w-full rounded-md'
                            src={`${host}/api/products/view/${i}`}
                        />
                    ))}
                </div>

                {/* Product Information */}
                <div className='flex flex-col mt-10'>
                    <div className='relative mb-4 flex w-full items-stretch'>
                        <div className='w-1/5 p-6 text-right font-bold'>PNO</div>
                        <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                            {product.pno}
                        </div>
                    </div>
                    <div className='relative mb-4 flex w-full items-stretch'>
                        <div className='w-1/5 p-6 text-right font-bold'>PNAME</div>
                        <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                            {product.pname}
                        </div>
                    </div>
                    <div className='relative mb-4 flex w-full items-stretch'>
                        <div className='w-1/5 p-6 text-right font-bold'>PRICE</div>
                        <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                            {product.price}원
                        </div>
                    </div>
                    <div className='relative mb-4 flex w-full items-stretch'>
                        <div className='w-1/5 p-6 text-right font-bold'>PDESC</div>
                        <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                            {product.pdesc}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='flex justify-end p-4 space-x-4'>
                    <button
                        type='button'
                        className='rounded p-4 text-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300'
                        //onClick={handleClickAddCart}
                    >
                        Add to Cart
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

            {/* Cart Section */}
            {/* <div className='col-span-1 border-2 p-4 rounded-lg shadow-md'>
                <CartComponent />
            </div> */}
        </div>
    );
};

export default ReadComponent;
