import axios from "axios";
import React, { useEffect, useState } from "react";
import { getMapByCategory } from "../api/mapApi";

const TourMap = () => {
  const [touristSpots, setTouristSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const totalPages = 5;
  const geoapifyApiKey = "c65e86bb88864eb4b9658fe2c9b1048e";

  // Initialize the Kakao map
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setTimeout(() => {
          const container = document.getElementById("map");
          console.log("Map container:", container);

          if (!container) {
            console.error("Map container not found.");
            return;
          }

          const mapOption = {
            center: new window.kakao.maps.LatLng(37.568477, 126.981611),
            level: 5,
          };
          const newMap = new window.kakao.maps.Map(container, mapOption);
          setMap(newMap);
          setLoading(false); // Set loading to false after map is set
        }, 500);
      });
    } else {
      console.error("Kakao Maps API not loaded.");
    }
  }, []);

  // Fetch tourist spots from the database based on selected category
  useEffect(() => {
    const fetchTourInfo = async () => {
      try {
        const data = await getMapByCategory(selectedCategory);
        console.log("Fetched Data:", data);
        setTouristSpots(data);
      } catch (err) {
        console.error("Error fetching tour data:", err);
        setError(err);
      } finally {
        setLoading(false); // Stop loading after the data is fetched
      }
    };
    fetchTourInfo();
  }, [selectedCategory]);

  // Function to get coordinates from an address using Geoapify API
  const getCoordinates = async (address) => {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address
    )}&apiKey=${geoapifyApiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lon, lat] = data.features[0].geometry.coordinates;
        return { lat, lon };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  };

  // Create markers on the map based on fetched data
  useEffect(() => {
    if (map && touristSpots.length > 0) {
      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);

      const createMarkers = async () => {
        try {
          const markerPromises = touristSpots
            .filter((spot) => (selectedCategory === "All" ? true : spot.TYPE === selectedCategory))
            .map(async (spot) => {
              const coordinates = await getCoordinates(spot.주소);
              if (coordinates) {
                const markerPosition = new window.kakao.maps.LatLng(coordinates.lat, coordinates.lon);
                const marker = new window.kakao.maps.Marker({
                  position: markerPosition,
                });
                marker.setMap(map);

                const infoWindow = new window.kakao.maps.InfoWindow({
                  content: `
                    <div style="padding:10px; width: 250px;">
                      <h3>${spot.시설명}</h3>
                      <p><strong>Type:</strong> ${spot.TYPE}</p>
                      <p><strong>Details:</strong> ${spot.시설상세내역}</p>
                      <p><strong>Address:</strong> ${spot.주소}</p>
                      <p><strong>Website:</strong> <a href="${spot.홈페이지}" target="_blank" rel="noopener noreferrer">${spot.홈페이지}</a></p>
                    </div>
                  `,
                });

                window.kakao.maps.event.addListener(marker, "click", () => {
                  infoWindow.open(map, marker);
                });

                window.kakao.maps.event.addListener(map, "click", () => {
                  infoWindow.close();
                });

                return marker;
              }
              return null;
            });

          const newMarkers = (await Promise.all(markerPromises)).filter(Boolean);
          setMarkers(newMarkers);
        } catch (error) {
          console.error("Error creating markers:", error);
        }
      };

      createMarkers();
    }
  }, [map, touristSpots, selectedCategory]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div
        className="rounded-lg"
        id="map"
        style={{
          width: "90%",
          height: "600px",
          border: "1px solid gray",
          marginBottom: "20px",
          marginTop: "50px",
        }}
      ></div>

      <div style={{ textAlign: "center" }}>
        <label>Category: </label>

        <p>Page Navigation:</p>
        <div style={{ display: "inline-flex", gap: "10px" }}>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              style={{
                padding: "10px 20px",
                border: "1px solid #007BFF",
                borderRadius: "5px",
                backgroundColor: currentPage === index + 1 ? "#007BFF" : "#FFF",
                color: currentPage === index + 1 ? "#FFF" : "#007BFF",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourMap;
