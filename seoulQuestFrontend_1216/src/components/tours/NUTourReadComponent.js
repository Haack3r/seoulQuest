import React, { useEffect, useState } from 'react';
import {API_SERVER_HOST,getTourItemReview,} from "../../api/reviewApi";
import ReviewsSection from '../review/ReviewsSection';
import { Calendar, Popover, Badge } from "antd";
import { UserOutlined, CalendarOutlined,StarFilled, StarOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { getAvailableCapacity, getOneTNU } from '../../api/nuTourApi';

import TourDetails from './TourDetails';

const initState = {
    tno: 0,
    tname: '',
    categoryName: '',
    tdesc: '',
    tprice: 0,
    tlocation: '',
    uploadFileNames: [],
    tdate: [],
    maxCapacity: 0,
    // availableCapacity:0
};
const host = API_SERVER_HOST;

const NUTourReadComponent = ({ tno }) => {
    // const { moveToList, moveToModify, page, size } = useCustomMove();
    const [tour, setTour] = useState(initState);
    const [fetching, setFetching] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [currentImage, setCurrentImage] = useState(0)
    const [detailsVisible, setDetailsVisible] = useState(false); // For toggling tour details
    const [reviewAvg, setReviewAvg] = useState(0)
    const [reviews, setReviews] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [availableCapacity, setAvailableCapacity] = useState(0);
    const navigate = useNavigate();

    const calculateAverage = (reviews) => {
      if (reviews.length === 0) return 0;
      const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
      const avg = sum / reviews.length; 
      return Number(avg.toFixed(1));
    };
  
    useEffect(() => {
      // Fetch tour data
      window.scrollTo(0, 0);
      setFetching(true);
      getOneTNU(tno).then((data) => {
        setTour(data);
        setFetching(false);
      });
  
      console.log(tour)
  
      // Review 데이터 가져오기
      getTourItemReview(tno).then((reviews) => {
          console.log(reviews);
          setReviews(reviews);
          setReviewAvg(calculateAverage(reviews))
      });
   
    }, [tno,refresh]);

    useEffect(() => {
      console.log(selectedDate)
      if (selectedDate) {
        setSelectedQuantity(0);
        getAvailableCapacity(tno, selectedDate).then((data) => {
          console.log(data)
          setAvailableCapacity(data)
        });
      }
    }, [selectedDate, tno]);  


    const handleClickAddReservation = () => {
      
        const answer = window.confirm("Please log in first to book the tour.")
        if(answer){
          navigate('/member/login')
        }
        return
      };

    // // 팝업을 보여주고 닫는 핸들러
    // const handleVisibleChange = (visible) => {
    //     setVisible(visible);
    // };

    const calendarContent = (
      <div style={{ width: 300 }}>
        <Calendar
          fullscreen={false}
          onSelect={(e) => setSelectedDate(e.format("YYYY-MM-DD"))} //문자열로 포맷
          disabledDate={(current) =>
            !tour.tdate.some(
              (date) => date === current.format("YYYY-MM-DD") 
            )
          }
        />
        <div style={{ textAlign: "center", marginTop: 10, color: "#888" }}>
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
            {[...Array(5)].map((_, star) => 
            (
            <span key={star}>
              {reviewAvg >= star+1 ? (
                        <StarFilled className="text-yellow-400 text-xl" />
                    ) : (
                        <StarOutlined className="text-gray-300 text-xl" />
                    )}
              </span>
            )
            )}
               <span className="ml-2 text-gray-600">({reviewAvg}) {reviews.length}  reviews</span>
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
                  min="0"
                  max={availableCapacity}
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                  className="w-full border rounded-lg p-3 text-center"
                  placeholder="0"
                />
              </div>
            </div>
  
           {/* 실제 예약 가능 인원 정보 */}
          <div className="p-2 rounded-lg flex justify-end items-center space-x-3">
            <div className="text-sm text-gray-600 flex items-center">
              <span>Available</span>
              <Badge
                count={selectedDate? availableCapacity > 0
                      ? availableCapacity
                      : "Full"
                    : "Select a Date"
                }
                style={{backgroundColor: !selectedDate
                    ? "#d9d9d9"
                    : availableCapacity > 0
                    ? "#14b8a6" 
                    : "#ef4444", 
                  color: "white",
                  marginLeft: "5px", 
                }}
              />
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <span>Max</span>
              <Badge
                count={tour.maxCapacity}
                style={{
                  backgroundColor: "#3b82f6", 
                  color: "white",
                  marginLeft: "5px",
                }}
              />
            </div>
          </div>

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
                  Tour Policies
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
        <div className="mt-5">
          <ReviewsSection
            refresh={refresh}
            setRefresh={setRefresh}
            reviews={reviews}
          />
        </div>
      </div>
    )
}

export default NUTourReadComponent;
