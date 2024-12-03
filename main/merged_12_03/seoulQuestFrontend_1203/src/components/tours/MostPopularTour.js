import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopReservedTours } from "../../api/tourApi"; // Replace with actual API file
import useCustomMove from "../../hooks/useCustomMove";
import { API_SERVER_HOST } from "../../api/reviewApi";
import { getTopReservedToursNU } from "../../api/nuTourApi";
import useCustomLogin from "../../hooks/useCustomLogin";

const host = API_SERVER_HOST;

const MostPopularTour = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { moveToTourRead, moveToTourReadNU} = useCustomMove();
  const {loginState} = useCustomLogin();

  // Fetch top reserved tours on component mount
  useEffect(() => {
    if(loginState.email){
    getTopReservedTours(3) // Fetch 3 most popular tours
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching most popular tours:", err);
        setError(err.message || "Failed to load tours");
        setLoading(false);
      });
    } else {
      getTopReservedToursNU(3) // Fetch 3 most popular tours
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching most popular tours:", err);
        setError(err.message || "Failed to load tours");
        setLoading(false);
      });
    }
  }, []);


  if (loading) {
    return <div className="text-center mt-12">Loading popular tours...</div>;
  }

  if (error) {
    return <div className="text-center mt-12 text-red-500">{error}</div>;
  }

  return (
    <div className="mt-12 max-w-5xl mx-auto flex flex-col items-center">
      {/* Most Popular Tours Header */}
      <h2 className="text-gray-700 text-2xl font-bold text-center mb-8 tracking-wide uppercase">
        Most Popular Tours
      </h2>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <div
            key={tour.tno}
            onClick={() => {loginState.email ?  moveToTourRead(tour.tno) : moveToTourReadNU(tour.tno)}}
            className="flex flex-col items-center text-center space-y-4 cursor-pointer"
          >
            {/* Tour Image */}
            <img
              src={`${host}/api/tours/view/${tour.uploadFileNames[0]}`}
              alt={tour.tname}
              className="w-full max-w-xs h-56 object-cover opacity-80 hover:opacity-90"
            />
            {/* Tour Details */}
            <div>
              <h3 className="text-md font-bold text-gray-600">{tour.tname}</h3>
              <p className="text-sm text-gray-500 mt-1">₩{tour.tprice.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularTour;
