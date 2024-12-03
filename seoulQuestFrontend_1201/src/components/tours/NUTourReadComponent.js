import React, { useEffect, useState } from 'react';
import { StarIcon, HeartIcon } from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getOneTNU } from '../../api/nuTourApi';
import { Calendar, Popover } from "antd";
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import FetchingModal from "../common/FetchingModal";
import TourDetails from './TourDetails';
import ReviewsSection from '../review/ReviewsSection';
import {
    API_SERVER_HOST,
    getTourItemReview,
  } from "../../api/reviewApi";

const initState = {
    tno: 0,
    tname: '',
    categoryName: '',
    tdesc: '',
    tprice: 0,
    taddress: '',
    uploadFileNames: [],
    tDate: [],
    maxCapacity: 0,
    availableCapacity:0
};
const host = API_SERVER_HOST;

const NUTourReadComponent = ({ tno }) => {
    // const { moveToList, moveToModify, page, size } = useCustomMove();
    const [tour, setTour] = useState(initState);
    const [fetching, setFetching] = useState(false);
    const [currentImage, setCurrentImage] = useState(0)
    const [value, setValue] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [calendarMode, setCalendarMode] = useState('month'); // 초기 모드는 월
    const [dateInfo, setDateInfo] = useState()
    const [visible, setVisible] = useState(false); // 팝업 표시 여부
    const navigate = useNavigate();
    const [detailsVisible, setDetailsVisible] = useState(false); // For toggling tour details
 

    const handleClickAddReservation = () => {
        window.alert("Please log in first to book the tour.")
        return navigate('/member/login')
      };

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

        console.log("클릭된 날짜 포맷 :" + e.format('YYYY-MM-DD'));

        const formattedDate = e.format('YYYY-MM-DD');
        // 예약 가능한 날짜 찾기
        const selectedDate = tour.tDate.find(i => i.tourDate === formattedDate).tourDate;


        if (selectedDate) {
            console.log("예약할 날짜: ", selectedDate)

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

    useEffect(() => {
      window.scrollTo(0, 0);
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

    // --------------------------Calendar-------------------------------

    // 팝업 내에 표시할 내용(달력 컴포넌트)
    const calendarContent = (
        <div style={{ width: 300 }}>
            <Calendar
                fullscreen={false}
                onPanelChange={onPanelChange}
                cellRender={dateCellRender}
                onSelect={onSelect}
                disabledDate={disabledDate}

            />
            <div style={{ textAlign: "center", marginTop: "10px", color: "#888" }}>
                Only available dates can be selected
            </div>
        </div>
    );


    return (
        <div className="min-h-screen py-12 px-4 sm:px-14 lg:px-20 lg:py-32 mt-20">
        <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left Section: Image Gallery */}
          <div className="lg:flex-1">
            <div className="relative">
              <img
                src={`${API_SERVER_HOST}/api/tours/view/${tour.uploadFileNames[currentImage]}`}
                alt="Tour"
                className="w-full h-60 md:h-80 lg:h-[500px] object-cover"
              />
              <div className="flex mt-4 space-x-2 overflow-x-auto">
                {tour.uploadFileNames.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-16 h-16 md:w-20 md:h-20 overflow-hidden ${
                      currentImage === index ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <img
                      src={`${API_SERVER_HOST}/api/tours/view/${image}`}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
  
          {/* Right Section: Tour Details */}
          <div className="lg:flex-1">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              {tour.tname}
            </h1>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-600">(4.8) 24 reviews</span>
            </div>
            <p className="text-xl md:text-2xl font-light text-gray-900 mb-6">
              ₩{tour.tprice.toLocaleString()}
            </p>
            <p className="text-gray-700 mb-2"><strong>Tour Address:</strong> {tour.taddress}</p>
            <p className="text-gray-700 mb-6">{tour.tdesc}</p>
  
            {/* Date and Quantity Selection */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  <CalendarOutlined className="mr-2" />
                  Date
                </label>
                <Popover content={calendarContent} trigger="click">
                  <button className="w-full border rounded-lg p-3 text-left">
                    {selectedDate || "Select a date"}
                  </button>
                </Popover>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  <UserOutlined className="mr-2" />
                  Person
                </label>
                <input
                  type="number"
                  min={1}
                  max={tour.maxCapacity}
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                  className="w-full border rounded-lg p-3 text-center"
                  placeholder="0"
                />
              </div>
            </div>
  
            <p className="text-sm text-gray-400 mt-2">
              Max Participants: {tour.maxCapacity}
            </p>
  
            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6">
              <button
                onClick={handleClickAddReservation}
                className="bg-stone-400 hover:bg-stone-600 text-white py-3 px-6 rounded-lg flex items-center justify-center"
              >
                <CalendarOutlined className="mr-2" />
                Update Availability
              </button>
             
            </div>
  
            {/* Tour Details Section */}
            <div className="mt-10 bg-gray-100 p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Tour Details
                </h2>
                <button
                  onClick={() => setDetailsVisible(!detailsVisible)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  {detailsVisible ? "-" : "+"}
                </button>
              </div>
              {detailsVisible && <TourDetails />}
            </div>
          </div>
        </div>
  
        {/* Reviews Section */}
        {/* <div className="mt-5">
          <ReviewsSection
            itemNo={tno}
            getItemReview={getTourItemReview}
          />
        </div> */}
      </div>
    )
}

export default NUTourReadComponent;
