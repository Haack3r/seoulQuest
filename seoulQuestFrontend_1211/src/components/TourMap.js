import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faPerson, faTimes } from "@fortawesome/free-solid-svg-icons";
import { createRoot } from "react-dom/client";
import "../TourMap.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TourMap = () => {
  const [touristSpots, setTouristSpots] = useState([]);
  const [map, setMap] = useState(null);
  const [overlays, setOverlays] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const geoapifyApiKey = "c65e86bb88864eb4b9658fe2c9b1048e";
  const loginState = useSelector((state) => state.loginSlice);
  const overlaysRef = useRef([]);

  const MarkerIcon = ({ isSelected }) => (
    <div
      className={`marker-icon ${isSelected ? "selected" : ""}`}
      style={{
        cursor: "pointer",
        fontSize: isSelected ? "50px" : "35px",
      }}
    >
      <FontAwesomeIcon icon={faPerson} />
    </div>
  );

  useEffect(() => {
    const initMapAndFetchData = async () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const mapOption = {
            center: new window.kakao.maps.LatLng(37.5665, 126.978),
            level: 7,
          };
          const newMap = new window.kakao.maps.Map(container, mapOption);
          setMap(newMap);
        });
      }

      try {
        const response = await axios.get("/api/user/tours/mapData");
        const spotsWithCoordinates = await Promise.all(
          response.data.map(async (spot) => {
            const coordinates = await getCoordinates(spot.taddress);
            return { ...spot, coordinates };
          })
        );
        setTouristSpots(spotsWithCoordinates);
      } catch (error) {
        console.error("Error fetching tour map data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initMapAndFetchData();
  }, []);

  const getCoordinates = async (address) => {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address
    )}&apiKey=${geoapifyApiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.features && response.data.features.length > 0) {
        const [lon, lat] = response.data.features[0].geometry.coordinates;
        return { lat, lon };
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
    return null;
  };

  const fetchTourDetails = async (address) => {
    try {
      const response = await axios.get(`/api/user/tours/by-address`, {
        params: { address },
      });
      if (response.status === 200) {
        setSelectedSpot(response.data[0]);
      } else {
        console.error("No tour details found for this address.");
      }
    } catch (error) {
      console.error("Error fetching tour details:", error);
    }
  };

  useEffect(() => {
    if (!map || touristSpots.length === 0) return;

    overlays.forEach((overlay) => overlay.setMap(null));
    overlaysRef.current = [];

    touristSpots.forEach((spot) => {
      const { coordinates } = spot;
      if (!coordinates) return;

      const overlayContent = document.createElement("div");
      const tooltip = document.createElement("div");
      tooltip.className = "custom-tooltip";
      tooltip.innerHTML = `<h3>${spot.tname}</h3><p>${spot.taddress}</p>`;
      overlayContent.appendChild(tooltip);

      const root = createRoot(overlayContent);
      root.render(
        <MarkerIcon isSelected={selectedSpot?.tname === spot.tname} />
      );

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(coordinates.lat, coordinates.lon),
        content: overlayContent,
        yAnchor: 1,
      });

      customOverlay.setMap(map);
      overlayContent.onclick = () => fetchTourDetails(spot.taddress);
      overlaysRef.current.push(customOverlay);
    });

    setOverlays(overlaysRef.current);
  }, [map, touristSpots, selectedSpot]);

  return (
    <section className="mt-10 px-4 max-w-5xl mx-auto mb-1">
      <h2 className="-mb-10 text-3xl font-bold uppercase text-center text-gray-800 tracking-widest">
        Explore On Map
      </h2>
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center mt-16 space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="relative w-full lg:w-3/4 h-72 lg:h-[600px]">
          <div
            id="map"
            className="w-full h-full rounded-lg border border-gray-300 shadow-lg"
          ></div>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <p>Loading map data...</p>
            </div>
          )}
        </div>

        {selectedSpot && (
  <div className="flex flex-row lg:flex-col items-start bg-white shadow-md rounded-lg border border-gray-300 overflow-hidden w-full lg:w-1/4 relative">
    {/* Spot Image */}
    {selectedSpot.uploadFileNames && selectedSpot.uploadFileNames.length > 0 ? (
      <img
        className="w-1/3 lg:w-full h-40 lg:h-auto object-cover opacity-80"
        src={`/api/tours/view/${selectedSpot.uploadFileNames[0]}`}
        alt="Tour Spot"
      />
    ) : (
      <div className="w-1/3 lg:w-full h-40 lg:h-auto flex items-center justify-center bg-gray-200">
        <p>No Image</p>
      </div>
    )}

    {/* Spot Details */}
    <div className="flex flex-col p-4 w-2/3 lg:w-full">
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        onClick={() => setSelectedSpot(null)}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2 className="text-lg font-bold mb-2">{selectedSpot.tname}</h2>
      <p className="text-sm text-gray-700">Address: {selectedSpot.taddress}</p>
      <p className="text-sm font-semibold mb-4">
        Price: ₩{selectedSpot.tprice} per person
      </p>
      <Link
        to={
          loginState.email
            ? `/user/tours/read/${selectedSpot.tno}?page=1&size=10`
            : `/tours/read/${selectedSpot.tno}?page=1&size=10`
        }
        className="block text-center bg-orange-800 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
      >
        Reserve Now
      </Link>
    </div>
  </div>
)}

      </div>
    </section>
  );
};

export default TourMap;
