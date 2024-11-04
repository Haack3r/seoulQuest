import React, { useEffect, useState } from 'react';
import { API_SERVER_HOST } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';
<<<<<<< HEAD
import { getOne } from '../../api/productsApi';
import FetchingModal from '../common/FetchingModal';
import useCustomCart from '../../hooks/useCustomCart';
import useCustomLogin from '../../hooks/useCustomLogin';
import CartComponent from '../menus/CartComponent';

const initState = {
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
=======
import FetchingModal from '../common/FetchingModal';
// import useCustomCart from '../../hooks/useCustomCart';
// import useCustomLogin from '../../hooks/useCustomLogin';
// import CartComponent from '../menus/CartComponent';
import { getOne } from '../../api/tourApi';

const initState = {
    tno: 0,
    tname: '',
    tcategoryName:'',
    tdesc: '',
    tprice: 0,
    tDate: null,
    tlocation:'',
>>>>>>> origin/hyein
    uploadFileNames: []
};
const host = API_SERVER_HOST;

<<<<<<< HEAD
const TourReadComponent = ({ pno }) => {
    const [product, setProduct] = useState(initState);
    const { moveToList, moveToModify, page, size } = useCustomMove();
    const [fetching, setFetching] = useState(false);
    const { changeCart, cartItems } = useCustomCart();
    const { loginState } = useCustomLogin();

    const handleClickAddCart = () => {
        let qty = 1;

        const addedItem = cartItems.filter(item => item.pno === parseInt(pno))[0];

        if (addedItem) {
            if (window.confirm("이미 추가된 상품입니다. 추가하시겠습니까? ") === false) {
                return;
            }
            qty = addedItem.qty + 1;
        }
        changeCart({ email: loginState.email, pno: pno, qty: qty });
    };
=======
const TourReadComponent = ({ tno }) => {
    const [tour, setTour] = useState(initState);
    const { moveToList, moveToModify, page, size } = useCustomMove();
    const [fetching, setFetching] = useState(false);
    //const { changeCart, cartItems } = useCustomCart();
    //const { loginState } = useCustomLogin();

    // const handleClickAddCart = () => {
    //     let qty = 1;

    //     const addedItem = cartItems.filter(item => item.tno === parseInt(tno))[0];

    //     if (addedItem) {
    //         if (window.confirm("이미 추가된 상품입니다. 추가하시겠습니까? ") === false) {
    //             return;
    //         }
    //         qty = addedItem.qty + 1;
    //     }
    //     changeCart({ email: loginState.email, tno: tno, qty: qty });
    // };
>>>>>>> origin/hyein

    useEffect(() => {
        setFetching(true);

<<<<<<< HEAD
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
=======
        getOne(tno).then(data => {
            setTour(data);
            setFetching(false);
        });
    }, [tno]); //tno값이 바뀔때마다 useEffect가 실행됨

  return (
    <div className='grid grid-cols-3 gap-6 mt-10 m-4'>
    {/* Tour Details Section */}
    <div className='col-span-2 border-2 p-4 rounded-lg shadow-md'>
        {fetching ? <FetchingModal /> : null}

        {/* Tour Images */}
        
        <div className='w-1/2 justify-center flex flex-col m-auto items-center'>
            {tour.uploadFileNames.map((i, idx) => (
                <img
                    alt='tour'
                    key={idx}
                    className='p-4 w-full rounded-md'
                    src={`${host}/api/tours/view/${i}`}
>>>>>>> origin/hyein
                />
            ))}
        </div>

        {/* Product Information */}
        <div className='flex flex-col mt-10'>
            <div className='relative mb-4 flex w-full items-stretch'>
<<<<<<< HEAD
                <div className='w-1/5 p-6 text-right font-bold'>PNO</div>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {product.pno}
                </div>
            </div>
            <div className='relative mb-4 flex w-full items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>PNAME</div>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {product.pname}
=======
                <div className='w-1/5 p-6 text-right font-bold'>TNO</div>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {tour.tno}
                </div>
            </div>
            <div className='relative mb-4 flex w-full items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>TNAME</div>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {tour.tname}
                </div>
            </div>
             <div className='relative mb-4 flex w-full items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>TCategory</div>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {tour.tcategoryName}
>>>>>>> origin/hyein
                </div>
            </div>
            <div className='relative mb-4 flex w-full items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>PRICE</div>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
<<<<<<< HEAD
                    ${product.price}
                </div>
            </div>
            <div className='relative mb-4 flex w-full items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>PDESC</div>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {product.pdesc}
                </div>
            </div>
=======
                    {tour.tprice} 원
                </div>
            </div>
            <div className='relative mb-4 flex w-full items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>TDESC</div>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {tour.tdesc}
                </div>
            </div>
            <div className='relative mb-4 flex w-full items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>TDATE</div>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {tour.tDate}
                </div>
            </div>
            <div className='relative mb-4 flex w-full items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>TLocation</div>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {tour.tlocation}
                </div>
                {/* 지도 API 추가 */}
            </div>
>>>>>>> origin/hyein
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end p-4 space-x-4'>
            <button
                type='button'
                className='rounded p-4 text-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300'
<<<<<<< HEAD
                onClick={handleClickAddCart}
=======
                //onClick={handleClickAddCart}
>>>>>>> origin/hyein
            >
                Add to Cart
            </button>
            <button
                type='button'
                className='rounded p-4 text-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300'
<<<<<<< HEAD
                onClick={() => moveToModify(pno)}
=======
                onClick={() => moveToModify(tno)}
>>>>>>> origin/hyein
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
<<<<<<< HEAD
    <div className='col-span-1 border-2 p-4 rounded-lg shadow-md'>
        <CartComponent />
    </div>
=======
    {/* <div className='col-span-1 border-2 p-4 rounded-lg shadow-md'>
        <CartComponent />
    </div> */}
>>>>>>> origin/hyein
</div>
  )
}

export default TourReadComponent