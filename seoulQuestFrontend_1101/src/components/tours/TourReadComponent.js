import React, { useEffect, useState } from "react";
import { API_SERVER_HOST } from "../../api/todoApi";
// import useCustomMove from "../../hooks/useCustomMove";
import { StarIcon,HeartIcon, CloudCog } from 'lucide-react'
import { getOne } from "../../api/tourApi";
import { Calendar, Popover} from "antd";
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
  availableCapacity:0
};
const host = API_SERVER_HOST;

const TourReadComponent = ({ tno }) => {
  // const { moveToList, moveToModify, page, size } = useCustomMove();
  console.log("여기는 tourRead"+tno)
 
  const [tour, setTour] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [calendarMode, setCalendarMode] = useState('month'); 
  const {reservationItems,changeReservation} = useCustomReservation();
  const { loginState } = useCustomLogin();
  const [visible, setVisible] = useState(false); // 팝업 표시 여부

    // 팝업을 보여주고 닫는 핸들러
    const handleVisibleChange = (visible) => {
      setVisible(visible);
    };

    const onchangeQty = (e) => {
      
      // 날짜가 선택되지 않은 경우 경고창을 띄우고 수량을 업데이트하지 않음
      if (!selectedDate) {
          window.alert("Please select a reservation date.");
          return;
      }
  
      // 날짜가 선택된 경우에만 수량을 업데이트
      setSelectedQuantity(e.target.value);
  };
    // //날짜 클릭시 날짜에 해당하는 예약 가능 인원 출력하는 함수 -> 클릭한 날짜를 서버로 보내는 것도 처리해야함.
    const onSelect = (e) => {
      setVisible(false); // 날짜 선택 후 팝업 닫기
      
      console.log("클릭된 날짜 포맷 :"+ e.format('YYYY-MM-DD'));

      const formattedDate = e.format('YYYY-MM-DD');
      // 예약 가능한 날짜 찾기
      const selectedDate = tour.tDate.find(i => i.tourDate === formattedDate).tourDate;
      
      
      if (selectedDate) {
        console.log("예약할 날짜: " , selectedDate)
       
        setSelectedDate(selectedDate)
      } else {
          console.log("예약 불가"); // 예약 불가능한 경우
      }
    
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

  
      // 팝업 내에 표시할 내용(달력 컴포넌트)
      const calendarContent = (
        <div style={{ width: 300 }}>
          <Calendar
            fullscreen={false}
            onPanelChange={onPanelChange}
            cellRender={dateCellRender}
            onSelect={onSelect}
            disabledDate ={disabledDate}
            
          />
          <div style={{ textAlign: "center", marginTop: "10px", color: "#888" }}>
            Only available dates can be selected
          </div>
        </div>
      );

      const handleClickAddReservation = () => {
        let qty = selectedQuantity;
        let date = selectedDate;
        
        if(!date){
          window.alert("Please select a reservation date.");
          return;
        }

        if(date && !qty){
          window.alert("To proceed with booking, please choose the number of participants for the tour.");
          return;
        }
        // 같은 투어가 이미 예약되어 있는지 확인
        const existingItem = reservationItems.find( item => item.tno === parseInt(tno));
    
        if (existingItem) {
            // 날짜가 다르거나 수량이 변경된 경우에만 확인 창을 띄우고 예약을 변경
            if (existingItem.tdate !== selectedDate || existingItem.qty !== selectedQuantity) {
                const confirmChange = window.confirm("This tour is already reserved. Would you like to update your reservation?");
                if (!confirmChange) return;
    
                qty = selectedQuantity; // 수량을 선택된 수량으로 변경 
                date = selectedDate; // 날짜를 선택된 날짜로 변경
            } 
        }
        // 변경 사항을 적용하여 예약을 업데이트
        changeReservation({ email: loginState.email, tno, tqty: qty, tdate: date});
      };
    
    useEffect(() => {
      setFetching(true);

      getOne(tno).then((data) => {
        setTour({
          ...initState,
          ...data,
          tDate: data.tdate
        });
        setFetching(false);
      });
      console.log(tour.maxCapacity)
      console.log(selectedDate)
    }, [tno, selectedDate]); //tno값이 바뀔때마다 useEffect가 실행됨

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 grid gap-6 mt-20 m-4 md:grid-cols-3">
      <div className="md:col-span-2 p-4 rounded-lg w-full">
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
      {/* tour content*/}
          <div className="p-4 md:p-8">
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

              <div className="flex justify-between items-center space-x-4 border-t-2">
              {/* 날짜 선택 버튼 */}
              <div className="w-1/2 mt-5">
              <label htmlFor="quantity" className="text-gray-700 flex items-center mb-2">
                      <CalendarOutlined className="mr-2 text-bold" /> Date
                  </label>
                  <Popover
                      content={calendarContent}
                      trigger="click"
                      open={visible}
                      onOpenChange={handleVisibleChange}
                      placement="bottom"
                  >
                      <button 
                          className="flex items-center justify-center p-3 border border-gray-300 rounded-lg w-full hover:bg-gray-100 text-base cursor-pointer"
                      >
                          <span className="text-center">{selectedDate ? selectedDate : 'Select a date'}</span>
                      </button>
                  </Popover>
              </div>

              {/* 참가자 수 선택 */}
              <div className="w-1/2 mt-5">
                  <label htmlFor="quantity" className="text-gray-700 flex items-center mb-2">
                      <UserOutlined className="mr-2 text-bold" /> Person
                  </label>
                  
                  <input
                      id="quantity"
                      type="number"
                      min="1"
                      max={selectedDate ? tour.tqty : 1 }
                      // max={selectedDate ? tour.availableCapacity : 1 } //나중에 이거로 바꾸기
                      value={selectedQuantity}
                      onChange={onchangeQty}
                      className="w-full border border-gray-300 p-3 rounded-lg text-center"
                  />
                  
              </div>
          </div>
              {/* Capacity Information */} 
              <div className="ml-1 text-sm text-end font-semibold text-gray-400">Max Participants: {tour.maxCapacity}</div>
              {/* Add to Cart and Wishlist Buttons */}
              <div className="flex space-x-4 mb-10 mt-8"> 
                <button
                  className="flex items-center justify-center bg-stone-400 hover:bg-stone-600 text-white p-3 rounded-lg w-full"
                  onClick={handleClickAddReservation}
                >
                  <CalendarOutlined  className="mr-2 h-4 w-4" /> Update Availability
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
      <div className='col-span-1 w-full'>
        <ReservationComponent maxCapacity={tour.maxCapacity}/>
      </div>
    </div>
  );
};

export default TourReadComponent;