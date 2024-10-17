import React, { useEffect, useState } from 'react';
import { API_SERVER_HOST } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';
import FetchingModal from '../common/FetchingModal';
// import useCustomCart from '../../hooks/useCustomCart';
// import useCustomLogin from '../../hooks/useCustomLogin';
// import CartComponent from '../menus/CartComponent';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { getOne } from '../../api/tourApi';
import { DatePicker, theme } from "antd";
import axios from 'axios';
import {ApartmentOutlined, MergeOutlined, PushpinFilled, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';

const initState = {
    tno: 0,
    tname: '',
    tcategoryName:'',
    tdesc: '',
    tprice: 0,
    tDate: null,
    tlocation:'',
    uploadFileNames: []
};
const host = API_SERVER_HOST;

// -------------calendar----------------
const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    };
//---------------------------------------------------


const TourReadComponent = ({ tno }) => {
    const [tour, setTour] = useState(initState);
    const { moveToList, moveToModify, page, size } = useCustomMove();
    const [fetching, setFetching] = useState(false);
    const [currentImage, setCurrentImage] = useState(0)

    // -------------calendar---------------------------------
    const { token } = theme.useToken();
     const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
     };

    //--------------cart---------------------------------------
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

    useEffect(() => {
        setFetching(true);

        getOne(tno).then(data => {
            setTour(data);
            setFetching(false);
        });
    }, [tno]); //tno값이 바뀔때마다 useEffect가 실행됨

    const ff = async (e) => {
        try {
            console.log("들어오나", e);
            console.log("들어오나", e.$d.toISOString());
    
            
            const dateString = e.$d.toISOString().split('T')[0];
            const params = new URLSearchParams({ date: dateString });
            // 예시: 쿼리 파라미터로 변환하여 요청 보내기
            const res = await axios.get(`http://localhost:8080/api/tours/date?${params.toString()}`);
            
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error("오류 발생:", error);
        }
    }
    


  return (
    <div className='grid grid-cols-3 gap-6 mt-10 m-4'>
    {/* Tour Details Section */}
        <Card className='col-span-2 border-2 p-4 rounded-lg shadow-md'>
            <CardHeader className="space-y-1">
                {fetching ? <FetchingModal /> : null}
                <div className='border w-20 rounded-2xl border-solid text-center font-bold mb-2'>No.{tour.tno}</div>
                <CardTitle className='text-4xl font-bold'>{tour.tname}</CardTitle>
            </CardHeader>
        {/* Tour Images */}
         <CardContent>
            <div className="space-y-4">
                <div className="aspect-square relative">
                    <img
                        src={`${host}/api/tours/view/${tour.uploadFileNames[currentImage]}`}
                        alt={tour.tname}
                        className="rounded-lg object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex space-x-2">
                            {tour.uploadFileNames.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`w-20 h-20 relative rounded-md overflow-hidden ${
                                currentImage === index ? 'ring-2 ring-primary' : ''
                                }`}
                            >
                            <img
                                src={`${host}/api/products/view/${image}`}
                                alt={`${tour.tname} thumbnail ${index + 1}`}
                                className="rounded-lg object-cover w-full h-full"
                            />
                            </button>
                            ))}
                        </div>
                    </div>

        {/* Product Information */}
       
        <div className='flex flex-col mt-10'>
            
             <div className='relative mb-4 flex w-full items-stretch'>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    <MergeOutlined />{tour.tcategoryName}
                </div>
            </div>
            <div className='relative mb-4 flex w-full items-stretch'>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {tour.tprice.toLocaleString()}won
                </div>
            </div>
            
            <div className='relative mb-4 flex w-full items-stretch'>
                    <DatePicker fullscreen={false} onPanelChange={onPanelChange} onChange={ff}/>
                {/* <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {tour.tDate}
                </div> */}
            </div>
            <div className='relative mb-4 flex w-full items-stretch'>
                
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    <UserOutlined />{tour.seatRemain}
                </div>
            </div>
            
            <div className='relative mb-4 flex w-full items-stretch'>
                {/* <div className='w-4/5 p-6 rounded border border-solid shadow-md'> */}
                    {tour.tdesc}
                {/* </div> */}
            </div>
        </div>

       
    
        {/* Action Buttons */}
        <div className='flex justify-end p-4 space-x-4'>
            <button
                type='button'
                className='rounded p-4 text-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300'
                //onClick={handleClickAddCart}
            >
                <ShoppingCartOutlined />Add to Cart
            </button>
            <button
                type='button'
                className='rounded p-4 text-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300'
                onClick={() => moveToModify(tno)}
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
       </CardContent>
            
        <CardFooter className="relative justify-between">
        </CardFooter>
    </Card>
    {/* Cart Section */}
    {/* <div className='col-span-1 border-2 p-4 rounded-lg shadow-md'>
        <CartComponent />
    </div> */}
</div>
  )
}

export default TourReadComponent