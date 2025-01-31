import React, { useEffect, useState } from "react";
import { API_SERVER_HOST, getTourItemReview, putTourOne, deleteTourOne, } from "../../api/reviewApi";
import ReviewsSection from "../review/ReviewsSection";
import { HeartIcon, ShoppingCart } from "lucide-react";
import { Calendar, Popover, Badge } from "antd";
import { UserOutlined, CalendarOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import ReservationComponent from "../menus/ReservationComponent";
import useCustomReservation from "../../hooks/useCustomReservation";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getOne } from "../../api/tourApi";
import TourDetails from "./TourDetails";
import useCustomTourFav from "../../hooks/useCustomTourFav";
import { getAvailableCapacity } from "../../api/nuTourApi";

const initState = {
  tno: 0,
  tname: "",
  categoryName: "",
  tdesc: "",
  tprice: 0,
  taddress: '',
  uploadFileNames: [],
  tdate: [],
  maxCapacity: 0,
  // availableCapacity: 0,
};

const TourReadComponent = ({ tno }) => {
  const [tour, setTour] = useState(initState);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [cartVisible, setCartVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false); // For toggling tour details
  const { favItems, changeFav, refreshFav } = useCustomTourFav();
  const { reservationItems, changeReservation } = useCustomReservation();
  const [reviewAvg, setReviewAvg] = useState(0)
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const [availableCapacity, setAvailableCapacity] = useState(0);
  const { loginState } = useCustomLogin();

  console.log(reservationItems)

  const calculateAverage = (reviews) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const avg = sum / reviews.length; 
    return Number(avg.toFixed(1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getOne(tno).then((data) => {
      setTour(data);
    });

    getTourItemReview(tno).then((reviews) => {
      setReviews(reviews);
      setReviewAvg(calculateAverage(reviews))
    });
  }, [tno, refresh]);

  useEffect(() => {
    if (selectedDate) {
      setSelectedQuantity(0);
      setCartVisible(false)
      getAvailableCapacity(tno, selectedDate).then((data) => {
        console.log(data)
        setTour({ ...tour, availableCapacity: data })
        setAvailableCapacity(data)
      });
    }
  }, [selectedDate, tno]);

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

  const handleAddToCart = () => {
    if (availableCapacity === 0) {
      alert("This tour is fully booked.");
      return;
    }

    if (!selectedDate || selectedQuantity <= 0) {
      alert("Please select a valid date and quantity.");
      return;
    }

    const existingItem = reservationItems.find((item) => item.tno === tour.tno);

    // 추가 가능 수량 계산 함수
    const calculateMaxAddable = (capacity, currentQty) => capacity - currentQty;

    // 장바구니 업데이트 함수
    const updateCart = (quantity, date) => {
      changeReservation({
        email: loginState.email,
        tno: tour.tno,
        tqty: quantity,
        tdate: date,
      });
      setCartVisible(true);
    };

    // 새로운 투어 추가
    if (!existingItem) {
      if (selectedQuantity > availableCapacity) {
        alert(`You can only add up to ${availableCapacity} for this tour.`);
        return;
      }
      updateCart(selectedQuantity, selectedDate);
      return;
    }

    const currentQuantity = existingItem.tqty || 0;
    const totalQuantity = currentQuantity + selectedQuantity;

    // 같은 날짜의 경우
    if (selectedDate === existingItem.tdate) {
      const maxAddable = calculateMaxAddable(existingItem.availableCapacity, currentQuantity);

      if (totalQuantity > existingItem.availableCapacity) {
        if (maxAddable > 0) {
          alert(`You can only add ${maxAddable} more of this tour.`);
          updateCart(currentQuantity + maxAddable, selectedDate);
        } else {
          alert(`You already have the maximum quantity of ${existingItem.availableCapacity} in your cart.`);
        }
      } else {
        updateCart(totalQuantity, selectedDate);
      }
    } else {
      // 날짜 변경 처리
      if (window.confirm("Would you like to change to a different date?")) {
        if (selectedQuantity > availableCapacity) {
          alert(`You can only add up to ${availableCapacity} for the selected date.`);
        } else {
          updateCart(selectedQuantity, selectedDate);
        }
      }
    }
  };

  const handleAddToFavorites = async () => {
    if (!loginState.email) {
      alert("Please log in to add favorites.");
      return;
    }

    const isAlreadyFavorite = favItems.some((item) => item.tno === tour.tno);
    if (isAlreadyFavorite) {
      alert("You already liked this tour!");
      return;
    }

    try {
      await changeFav({ email: loginState.email, tno: tour.tno });
      alert("Product added to favorites!");
      refreshFav();
    } catch (error) {
      console.error("Failed to add favorite:", error);
      alert("Could not add to favorites. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-14 lg:px-20 lg:py-32 mt-20">
      <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Left Section: Image Gallery */}
        <div className="lg:flex-1">
          <div className="relative">
            <img
              src={`${API_SERVER_HOST}/api/tours/view/${tour.uploadFileNames[currentImage]}`}
              alt="Tour"
              className="w-full h-60 md:h-80 lg:h-[500px] object-contain"
            />
            <div className="flex mt-4 space-x-2 overflow-x-auto">
              {tour.uploadFileNames.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-16 h-16 md:w-20 md:h-20 overflow-hidden ${currentImage === index ? "ring-2 ring-blue-500" : ""
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
                {reviewAvg >= star + 1 ? (
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
                count={selectedDate ? availableCapacity > 0
                  ? availableCapacity
                  : "Full"
                  : "Select a Date"
                }
                style={{
                  backgroundColor: !selectedDate
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
              onClick={handleAddToCart}
              className="bg-stone-400 hover:bg-stone-600 text-white py-3 px-6 rounded-lg flex items-center justify-center"
            >
              <CalendarOutlined className="mr-2" />
              Update Availability
            </button>
            <button
              onClick={handleAddToFavorites}
              className="flex-1 border text-gray-700 py-3 rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              <HeartIcon className="mr-2 text-red-500" />
              Add to Favorites
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

      {/* Reservation Cart Button */}
      <div className="fixed top-24 right-10">
        <Badge count={reservationItems.length} offset={[0, 10]}>
          <button
            onClick={() => setCartVisible(!cartVisible)}
            className="bg-stone-400 hover:bg-stone-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          >
            <ShoppingCart className="h-6 w-6" />
          </button>
        </Badge>
      </div>

      {/* Reservation Drawer */}
      <div
        className={`z-50 fixed top-0 right-0 h-[70%] w-96 mt-40 p-6 overflow-auto transform ${cartVisible ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300`}
      >
        <ReservationComponent />
      </div>
      {/* Reviews Section */}
      <div className="mt-5">
        <ReviewsSection
          refresh={refresh}
          setRefresh={setRefresh}
          reviews={reviews}
          putOne={putTourOne}
          deleteOne={deleteTourOne}
        />
      </div>
    </div>
  );
};

export default TourReadComponent;
