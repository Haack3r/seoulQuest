import axios from "axios";
import React, { useEffect, useState } from "react";

const TourMap = () => {
  const [touristSpots, setTouristSpots] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const geoapifyApiKey = "c65e86bb88864eb4b9658fe2c9b1048e";

  // Initialize Kakao Map
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) {
          console.error("Map container not found.");
          return;
        }
        const mapOption = { center: new window.kakao.maps.LatLng(37.5665, 126.9780), level: 8 };
        const newMap = new window.kakao.maps.Map(container, mapOption);
        setMap(newMap);
        console.log("Kakao map initialized.");
      });
    } else {
      console.error("Kakao Maps API not loaded.");
    }
  }, []);

  // Fetch tourist spots data for Seoul
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.get('/api/user/tours/location', { params: { location: "Seoul" } });
        console.log("Fetched Seoul tourist spots:", response.data);
        setTouristSpots(response.data);
      } catch (error) {
        console.error("Error fetching Seoul tour map data:", error);
      }
    };
    fetchMapData();
  }, []);

  // Geocoding function to get coordinates from each address
  const getCoordinates = async (address) => {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${geoapifyApiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.features && response.data.features.length > 0) {
        const [lon, lat] = response.data.features[0].geometry.coordinates;
        console.log(`Coordinates for ${address}:`, { lat, lon });
        return { lat, lon };
      } else {
        console.warn(`No coordinates found for address: ${address}`);
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
    return null;
  };

  // Create markers on the map based on all addresses in tourist spots
  useEffect(() => {
    if (!map || touristSpots.length === 0) return;

    // Clear existing markers before adding new ones
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    const createMarkers = async () => {
      try {
        const markerPromises = touristSpots.map(async (spot) => {
          // Ensure we're working with a full address
          console.log("Processing address for:", spot.tname, "| Full address:", spot.taddress);
          const coordinates = await getCoordinates(spot.taddress);  // Convert each address to coordinates
          if (coordinates) {
            const markerPosition = new window.kakao.maps.LatLng(coordinates.lat, coordinates.lon);
            const marker = new window.kakao.maps.Marker({ position: markerPosition });
            marker.setMap(map);
            console.log("Marker placed for:", spot.tname);

            // Info window for marker
            const infoWindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:10px; width: 250px;"><h3>${spot.tname}</h3><p><strong>Address:</strong> ${spot.taddress}</p></div>`,
            });

            // Show info window on marker click
            window.kakao.maps.event.addListener(marker, "click", () => infoWindow.open(map, marker));
            window.kakao.maps.event.addListener(map, "click", () => infoWindow.close());

            return marker;
          }
          return null;
        });

        const newMarkers = (await Promise.all(markerPromises)).filter(Boolean);  // Filter out any null markers
        setMarkers(newMarkers);
      } catch (error) {
        console.error("Error creating markers:", error);
      }
    };

    createMarkers();
  }, [map, touristSpots]);

  return (
    <div className="flex items-center justify-center mt-16">
      <div
        id="map"
        style={{ width: "90%", height: "600px" }}
        className="rounded-lg border border-gray-300 shadow-lg"
      ></div>
    </div>
  );
};

export default TourMap;
