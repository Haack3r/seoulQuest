import React, { useEffect, useState } from 'react';
import { API_SERVER_HOST } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';
import { StarIcon, ShoppingCartIcon, HeartIcon } from 'lucide-react'

import useCustomCart from '../../hooks/useCustomCart';
import useCustomLogin from '../../hooks/useCustomLogin';
import CartComponent from '../menus/CartComponent';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { getOneTNU } from '../../api/nuTourApi';
import { Calendar } from "antd";
import { MergeOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';

const initState = {
    tno: 0,
    tname: '',
    categoryName:'',
    tdesc: '',
    tprice: 0,
    tlocation:'',
    uploadFileNames: [],
    tDate: [],
    max_capacity:0,
};
const host = API_SERVER_HOST;

const NUTourReadComponent = ({ tno }) => {
    const [tour, setTour] = useState(initState);
    const { moveToList, moveToModify, page, size } = useCustomMove();
    const [fetching, setFetching] = useState(false);
    const [currentImage, setCurrentImage] = useState(0)
    const [value, setValue] = useState(0);
    const { loginState } = useCustomLogin();
    const [selectedDate, setSelectedDate] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [calendarMode, setCalendarMode] = useState('month'); // 초기 모드는 월
    const [dateInfo,setDateInfo] = useState()

    // calendar style
    const wrapperStyle = {
        width: 300,
        border: '1px solid #d9d9d9', 
        borderRadius: 4,
    };

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

        getOneTNU(tno).then(data => {
            setTour({
                ...initState, // 초기 상태를 유지하면서
                ...data, // data의 속성들로 덮어씀
                tDate: data.tdate // tDate만 다시 설정
            });
            setFetching(false); 
            console.log(data.tdate);
        });
    }, [tno]);

    const onPanelChange = (value, mode) => {
        setCalendarMode(mode); // 현재 모드를 업데이트
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    
     //예약가능한 날짜만 밑줄 생기는 함수 
     const dateCellRender = (value) => {
        const formattedDate = value.format('YYYY-MM-DD');
        const checkDate = tour.tDate.find(date => date.tourDate === formattedDate); //서버에서 받아온 날짜와 일치하는 날짜를 체크 

        return (
            <div className={`${checkDate ? 'border-b-2 border-blue-500' : ''}`}></div>  //예약 가능한 날짜에만 밑줄, 클릭가능 
        );
    };

    //예약가능한 날짜만 선택할수 있게 하는 함수 
    const disabledDate = (current) => {
        
        if (calendarMode === 'year') {
            return false; //  년도 뷰에서는 활성화
        }
    
        // 날짜 뷰일 때만 예약된 날짜가 아닌 날짜를 비활성화
        const formattedDate = current.format('YYYY-MM-DD');
        return !tour.tDate.some(date => date.tourDate === formattedDate);
    };

    // //날짜 클릭시 날짜에 해당하는 예약 가능 인원 출력하는 함수 -> 클릭한 날짜를 서버로 보내는 것도 처리해야함.
    const onSelect = (e) => {
        // console.log(e);
        console.log("클릭된 날짜 포맷 :"+ e.format('YYYY-MM-DD'));

        const formattedDate = e.format('YYYY-MM-DD');
        // 예약 가능한 날짜 찾기
        const newDateInfo = tour.tDate.find(i => i.tourDate === formattedDate);
        
        if (newDateInfo) {
            console.log("클릭된 날짜:", newDateInfo.tourDate); // 예약 가능한 경우, 클릭한 날짜 출력
        } else {
            console.log("예약 불가"); // 예약 불가능한 경우
        }

        setDateInfo(newDateInfo)
        console.log(dateInfo)
 
    };


    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Tour Image */}
                    <div className="relative h-96 md:h-full">
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
                                    src={`${host}/api/tours/view/${image}`}
                                    alt={`${tour.tname} thumbnail ${index + 1}`}
                                    className="rounded-lg object-cover w-full h-full"
                                />
                                </button>
                                ))}
                            </div>
                        </div>
                    </div>

                {/* tour Details */}
                <div>
                    <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-4">{tour.tname}</h1>
                    <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-600">(4.8) 24 reviews</span>
                    </div>
                    <p className="text-2xl font-light text-gray-900 mb-6">₩{tour.tprice.toLocaleString()}</p>
                    <p className="text-gray-700 mb-6">
                    {tour.tdesc}
                    </p>

                    {/* Calendar Selection */}
                    <div style={wrapperStyle}>
                    <Calendar
                        fullscreen={false}
                        onPanelChange={onPanelChange}
                        cellRender={dateCellRender}
                        onSelect={onSelect}
                        disabledDate ={disabledDate}
                    />
                    </div>

                    {/* Quantity Selection */}
                    <label htmlFor="quantity" className="text-gray-700 mr-4 mt-8">
                        Number of Participants
                    </label>
                    {dateInfo !== undefined && (
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            max={dateInfo.available_capacity} // max에 tour.max_capacity를 사용
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="w-20 border-gray-300 p-2 rounded-lg"
                        />
                    )}
            
                    <div className="mt-4">
                        <UserOutlined /> Max Participants: {tour.max_capacity}
                        {dateInfo ? (
                            <div>
                                <UserOutlined /> Available Participants: {dateInfo.available_capacity}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    {/* Add to Cart and Wishlist Buttons */}
                    <div className="flex space-x-4 mb-8 mt-8"> <button
                                        className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg w-full"
                                        
                                    >
                                        <Link to="/user/tours"><ShoppingCartIcon className="mr-2 h-4 w-4" /> Reserve Tour</Link>
                                    </button>
                
                    <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 p-3 rounded-lg">
                        <HeartIcon className="h-4 w-4" />
                    </button>
                    </div>

                    {/* tour Details */}
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
                    {/* tour Tabs */}
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

export default NUTourReadComponent;
