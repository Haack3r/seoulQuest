import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { createRoot } from "react-dom/client";
import "../TourMap.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TourMap = () => {
  const [touristSpots, setTouristSpots] = useState([]);
  const [map, setMap] = useState(null);
  const [overlays, setOverlays] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const geoapifyApiKey = "c65e86bb88864eb4b9658fe2c9b1048e";
  const loginState = useSelector((state) => state.loginSlice);

  const MarkerIcon = ({ isSelected }) => (
    <div
      className={`marker-icon ${isSelected ? "selected" : ""}`}
      style={{ cursor: "pointer" }}
    >
      <FontAwesomeIcon icon={faMapPin} />
    </div>
  );

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 8,
        };
        const newMap = new window.kakao.maps.Map(container, mapOption);
        setMap(newMap);
      });
    }
  }, []);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.get("/api/user/tours/mapData");
        setTouristSpots(response.data);
      } catch (error) {
        console.error("Error fetching tour map data:", error);
      }
    };
    fetchMapData();
  }, []);

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

  useEffect(() => {
    if (!map || touristSpots.length === 0) return;

    overlays.forEach((overlay) => overlay.setMap(null));
    setOverlays([]);

    const createCustomOverlays = async () => {
      const newOverlays = await Promise.all(
        touristSpots.map(async (spot) => {
          const coordinates = await getCoordinates(spot.taddress);
          if (coordinates) {
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
              position: new window.kakao.maps.LatLng(
                coordinates.lat,
                coordinates.lon
              ),
              content: overlayContent,
              yAnchor: 1,
            });

            customOverlay.setMap(map);
            overlayContent.onclick = () => fetchTourDetails(spot.taddress);

            return customOverlay;
          }
          return null;
        })
      );

      setOverlays(newOverlays.filter(Boolean));
    };

    createCustomOverlays();
  }, [map, touristSpots, selectedSpot]);

  return (
    <section className="mt-10 px-4 max-w-5xl mx-auto mb-1">
      <h2 className="-mb-10 text-3xl font-bold uppercase text-center text-gray-800 tracking-widest">
        Explore On Map
      </h2>
      <div className="flex items-center justify-center mt-16">
        {/* Main Map Container */}
        <div className="relative lg:w-2/4 md:w-3/4 h-600px">
          <div
            id="map"
            style={{ width: "100%", height: "600px" }}
            className="rounded-lg border border-gray-300 shadow-lg relative"
          ></div>
          <div className="absolute inset-0 bg-pastel-overlay rounded-lg pointer-events-none"></div>
        </div>

        {selectedSpot && (
          <div className="top-16 right-4 h-[600px] w-1/4 bg-white shadow-lg rounded-lg border border-gray-300 flex flex-col overflow-hidden">
            <button
              className="absolute right-7 lg:right-80 text-right p-2"
              onClick={() => setSelectedSpot(null)}
            >
              ✖
            </button>
            <img
              className="h-1/3 w-full object-cover"
              src={`/api/user/tours/view/${selectedSpot.uploadFileNames[0]}`}
              alt="Tour Spot"
            />
            <div className="p-4 flex-grow flex flex-col justify-start">
  <h2 className="text-xl font-bold mb-2">{selectedSpot.tname}</h2>
  <p className="small-text text-sm mb-2 text-gray-700">Address: {selectedSpot.taddress}</p>
  
  {/* Apply truncated-description class to limit text after 3 lines */}
  <p className="truncated-description text-sm text-gray-600 mb-4">
    {selectedSpot.tdesc}
  </p>
  
  <p className="text-sm font-semibold">Price: ₩{selectedSpot.tprice} per person</p>
  <Link
    to={`/user/tours/read/${selectedSpot.tno}?page=1&size=10`}
    className="text-sm mt-4 px-6 py-3 bg-orange-800 text-white rounded-lg inline-block text-center transform transition-all hover:scale-105"
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
