import React, { useEffect, useState } from "react";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import { StarIcon, ShoppingCartIcon, HeartIcon } from 'lucide-react'
import { getOne } from "../../api/tourApi";
import { Calendar } from "antd";
import {UserOutlined, CalendarOutlined} from '@ant-design/icons';
import FetchingModal from "../common/FetchingModal";
import ReservationComponent from "../menus/ReservationComponent";
import useCustomReservation from "../../hooks/useCustomReservation";
import useCustomLogin from '../../hooks/useCustomLogin';

const initState = {
  tno: 0,
  tname: '',
  categoryName:'',
  tdesc: '',
  tprice: 0,
  tlocation:'',
  uploadFileNames: [],
  tDate: [],
  maxCapacity:0,
};
const host = API_SERVER_HOST;

const TourReadComponent = ({ tno }) => {
  console.log("여기는 tour"+tno)
  const [tour, setTour] = useState(initState);
  const { moveToList, moveToModify, page, size } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  const [currentImage, setCurrentImage] = useState(0)
  const [value, setValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [calendarMode, setCalendarMode] = useState('month'); // 초기 모드는 월
  const [dateInfo,setDateInfo] = useState()
  const {reservationItems,changeReservation} = useCustomReservation();
  const { loginState } = useCustomLogin();

  const handleClickAddReservation = () => {
    let qty = 1;
    let date = null;
    console.log("여기에 클릭한 날짜 " ,dateInfo.tourDate)
    console.log("예약되어있는 아이템",reservationItems)

    if(reservationItems.length !== 0){ //이미 추가된 상품이 있을때
    
      const addedItem = reservationItems.filter(item => item.tno === parseInt(tno))[0];
      console.log("추가되어있는 아이템의 날짜: " , addedItem.tdate)
      
      //클릭한 날짜와 추가 되어있는 아이템의 날짜가 다를때
      if (addedItem.tdate !== dateInfo.tourDate ) {
          // if (window.confirm("이미 추가된 투어입니다. 투어 날짜를 변경하시겠습니까? ") === false) {
          //     return;
          // }
          qty = addedItem.qty + selectedQuantity;  
          date = addedItem.tdate;
     
        // }else{ //클릭한 날짜와 추가되있는 날짜가 같을때 
        // qty = addedItem.qty + selectedQuantity;
      }

      changeReservation({ email: loginState.email, tno: tno, tqty: qty, tdate: date });
    }
    
    console.log("날짜를 넣을 거다 " ,dateInfo.tourDate)
    //추가된 상품이 없을때 
    changeReservation({ email: loginState.email, tno: tno, tqty: selectedQuantity , tdate: dateInfo.tourDate });
    // changeReservation({ email: loginState.email, tno: tno, tqty: selectedQuantity });
  };

  useEffect(() => {
    console.log("여기 들어옴")
    setFetching(true);

    getOne(tno).then((data) => {
      setTour({
        ...initState,
        ...data,
        tDate: data.tdate
      });
      setFetching(false);
    });
    
    console.log(dateInfo)
  }, [tno, dateInfo]); //tno값이 바뀔때마다 useEffect가 실행됨

// -------------------------------------------Calendar-------------------------------
const wrapperStyle = {
  width: 300,
  border: '1px solid #d9d9d9', 
  borderRadius: 4,
};

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
    console.log("예약할 날짜: " , newDateInfo.tourDate)

    setDateInfo(newDateInfo)
  } else {
      console.log("예약 불가"); // 예약 불가능한 경우
  }
 
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-3 gap-6 mt-20 m-4">
      <div className="col-span-2 p-4 rounded-lg ">
      {/* Tour modal*/}
        {fetching ? <FetchingModal /> : null}
{/* -------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Tour Images */}
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
                <label htmlFor="quantity" className="text-gray-700 mr-4 mt-10">
                    <UserOutlined />Number of Participants
                </label>
                {dateInfo !== undefined && (
                    <input
                        id="quantity"
                        type="number"
                        min="1"
                        max={dateInfo.available_capacity} 
                        value={selectedQuantity}
                        onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                        className="w-20 border border-gray-300 p-2 rounded-lg mt-5"
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
                <div className="flex space-x-4 mb-8 mt-8"> 
                  <button
                    className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg w-full"
                    onClick={handleClickAddReservation}
                  >
                    <CalendarOutlined  className="mr-2 h-4 w-4" /> Reserve Tour
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
      {/* Reservation Section */}
      <div className='col-span-1 border-2 p-4 rounded-lg shadow-md'>
        <ReservationComponent/>
      </div>
    </div>
  );
};

export default TourReadComponent;
