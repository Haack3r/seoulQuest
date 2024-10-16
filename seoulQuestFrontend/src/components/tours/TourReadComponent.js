import React, { useEffect, useState } from 'react';
import { API_SERVER_HOST } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';
import FetchingModal from '../common/FetchingModal';
// import useCustomCart from '../../hooks/useCustomCart';
// import useCustomLogin from '../../hooks/useCustomLogin';
// import CartComponent from '../menus/CartComponent';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { getOne } from '../../api/tourApi';
import { Calendar, DatePicker, theme } from "antd";
import axios from 'axios';

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
            console.log("들어오나", e.$d.toJSON());
    
            // 예시: 쿼리 파라미터로 변환하여 요청 보내기
            const res = await axios.get("http://localhost:8080/api/tours/date", {
                params: {
                    date: e.$d.toJSON() // 서버에서 요구하는 포맷에 맞춰 쿼리 파라미터로 전달
                }
            });
            
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
        
        {/* <div className='w-1/2 justify-center flex flex-col m-auto items-center'>
            {tour.uploadFileNames.map((i, idx) => (
                <img
                    alt='tour'
                    key={idx}
                    className='p-4 w-full rounded-md'
                    src={`${host}/api/tours/view/${i}`}
                />
            ))}
        </div> */}

        {/* Product Information */}
        <CardContent className="grid gap-6 md:grid-cols-2">
        <div className='flex flex-col mt-10'>
            <div className='relative mb-4 flex w-full items-stretch'>
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
                </div>
            </div>
            <div className='relative mb-4 flex w-full items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>PRICE</div>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
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
                    <DatePicker fullscreen={false} onPanelChange={onPanelChange} onChange={ff}/>
                {/* <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {tour.tDate}
                </div> */}
            </div>
            <div className='relative mb-4 flex w-full items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>SeatRemain</div>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {tour.seatRemain}
                </div>
            </div>
            <div className='relative mb-4 flex w-full items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>TLocation</div>
                <div className='w-4/5 p-6 rounded border border-solid shadow-md'>
                    {tour.tlocation}
                </div>
                {/* 지도 API 추가 */}
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
  )
}

export default TourReadComponent