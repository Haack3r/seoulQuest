import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { createRoot } from "react-dom/client";
import "../TourMap.css";
import { Link } from "react-router-dom";

const TourMap = () => {
  const [touristSpots, setTouristSpots] = useState([]);
  const [map, setMap] = useState(null);
  const [overlays, setOverlays] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null); // Stores selected tour details
  const geoapifyApiKey = "c65e86bb88864eb4b9658fe2c9b1048e";

  // Icon component with dynamic color and bounce effect
  const MarkerIcon = ({ isSelected }) => (
    <div
      className={`marker-icon ${isSelected ? "selected" : ""}`}
      style={{ cursor: "pointer" }}
    >
      <FontAwesomeIcon icon={faMapPin} />
    </div>
  );

  // Initialize Kakao Map
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

  // Fetch tourist spots for map pins
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

  // Fetch tour details by address when a pin is clicked
  const fetchTourDetails = async (address) => {
    try {
      const response = await axios.get(`/api/user/tours/by-address`, {
        params: { address },
      });
      if (response.status === 200) {
        setSelectedSpot(response.data[0]); // Assume first result if multiple tours share the address
      } else {
        console.error("No tour details found for this address.");
      }
    } catch (error) {
      console.error("Error fetching tour details:", error);
    }
  };

  // Get coordinates for each pin based on the address
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

  // Create custom overlays with tooltips
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

            // Use createRoot for rendering in React 18
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

            // Fetch tour details by address and update side panel when clicked
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
    <div className="flex items-center justify-center mt-16">
      {/* Main Map Container */}
      <div className="relative lg:w-2/4 md:w-3/4 h-600px">
        <div
          id="map"
          style={{ width: "100%", height: "600px" }}
          className="rounded-lg border border-gray-300 shadow-lg"
        ></div>
      </div>

      {/* Right Side Popup for Tour Information */}
      {selectedSpot && (
        <div className="top-16 right-4 h-[600px] w-1/4 bg-white shadow-lg rounded-lg border border-gray-300 flex flex-col overflow-hidden">
          <button
            className="absolute right-4  text-right p-2"
            onClick={() => setSelectedSpot(null)}
          >
            ✖
          </button>
          <img
            className="h-1/2 w-full object-cover"
            src={`/api/user/tours/view/${selectedSpot.uploadFileNames[0]}`}
            alt="Tour Spot"
          />
          <div className="p-4 flex-grow flex flex-col justify-start">
            <h2 className="text-sm font-bold mb-2">{selectedSpot.tname}</h2>
            <p className="text-sm">Address:{selectedSpot.taddress}</p>
            <p className="text-sm text-gray-600 mb-4">{selectedSpot.tdesc}</p>
            <p className="text-sm">Price: ₩{selectedSpot.tprice} per person</p>
            <Link
              to={`/user/tours/read/${selectedSpot.tno}?page=1&size=10`}
              className="text-sm mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg inline-block text-center"
            >
              Reserve Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourMap;
