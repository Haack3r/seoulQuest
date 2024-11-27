import React, { useEffect, useState } from "react";
import {
  API_SERVER_HOST,
  getTourItemReview,
  putTourOne,
  deleteTourOne,
} from "../../api/reviewApi";
import ReviewsSection from "../review/ReviewsSection";
import { StarIcon, HeartIcon, ShoppingCart } from "lucide-react";
import { Calendar, Popover, Badge } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import ReservationComponent from "../menus/ReservationComponent";
import useCustomReservation from "../../hooks/useCustomReservation";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getOne } from "../../api/tourApi";
import TourDetails from "./TourDetails";
import useCustomTourFav from "../../hooks/useCustomTourFav";

const initState = {
  tno: 0,
  tname: "",
  categoryName: "",
  tdesc: "",
  tprice: 0,
  tlocation: "",
  uploadFileNames: [],
  tDate: [],
  maxCapacity: 0,
  availableCapacity: 0,
};

const TourReadComponent = ({ tno }) => {
  const [tour, setTour] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [cartVisible, setCartVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false); // For toggling tour details
  const { isLogin, loginState } = useCustomLogin();
  const email = loginState.email;
  const { favItems, changeFav, refreshFav } = useCustomTourFav(email);
  const { reservationItems, changeReservation } = useCustomReservation();

  useEffect(() => {
    // Fetch tour data
    setFetching(true);
    getOne(tno).then((data) => {
      setTour({ ...initState, ...data, tDate: data.tdate });
      setFetching(false);
    });
  }, [tno]);

  const calendarContent = (
    <div style={{ width: 300 }}>
      <Calendar
        fullscreen={false}
        onSelect={(e) => setSelectedDate(e.format("YYYY-MM-DD"))}
        disabledDate={(current) =>
          !tour.tDate.some(
            (date) => date.tourDate === current.format("YYYY-MM-DD")
          )
        }
      />
      <div style={{ textAlign: "center", marginTop: 10, color: "#888" }}>
        Only available dates can be selected
      </div>
    </div>
  );

  const handleAddToCart = () => {
    if (!selectedDate || selectedQuantity <= 0) {
      window.alert("Please select a valid date and quantity.");
      return;
    }
    changeReservation({
      email: loginState.email,
      tno,
      tqty: selectedQuantity,
      tdate: selectedDate,
    });
    setCartVisible(true); // Automatically show the cart
  };

  const handleAddToFavorites = async () => {
    if (!loginState.email) {
      alert("Please log in to add favorites.");
      return;
    }

    const isAlreadyFavorite = favItems.some((item) => item.tno === tour.tno);
    if (isAlreadyFavorite) {
      alert("You already liked this product!");
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
              onClick={handleAddToCart}
              className="bg-stone-400 hover:bg-stone-600 text-white py-3 px-6 rounded-lg flex items-center justify-center"
            >
              <CalendarOutlined className="mr-2" />
              Update Availability
            </button>
            <button className="border text-gray-700 py-3 px-6 rounded-lg flex items-center justify-center hover:bg-gray-100">
              <HeartIcon className="mr-2 h-5 w-5 text-red-500" />
              Add to Favorites
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
        className={`z-50 fixed top-0 right-0 h-[70%] w-96 mt-40 p-6 overflow-auto transform ${
          cartVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <ReservationComponent maxCapacity={tour.maxCapacity} />
      </div>
      {/* Reviews Section */}
      <div className="mt-5">
        <ReviewsSection
          itemNo={tno}
          getItemReview={getTourItemReview}
          putOne={putTourOne}
          deleteOne={deleteTourOne}
        />
      </div>
    </div>
  );
};

export default TourReadComponent;
