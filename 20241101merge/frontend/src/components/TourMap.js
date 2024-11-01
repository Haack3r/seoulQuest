import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TourMap = () => {


    const [touristSpots, setTouristSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [map, setMap] = useState(null);
    const [geocoder, setGeocoder] = useState(null);

    // Initialize the map on component mount
    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
                setTimeout(() => {
                    const container = document.getElementById('map');
                    console.log("Checking map container:", container); // Log if the container is found
                    if (!container) {
                        console.error("Map container not found.");
                        return;
                    }

                    const mapOption = {
                        center: new window.kakao.maps.LatLng(37.568477, 126.981611),
                        level: 5, // Initial map zoom level
                    };
                    const newMap = new window.kakao.maps.Map(container, mapOption);
                    setMap(newMap);
                    if (window.kakao.maps.services) {
                        const geocoderInstance = new window.kakao.maps.services.Geocoder();
                        setGeocoder(geocoderInstance);
                        console.log("Geocoder initialized:", geocoderInstance);
                    } else {
                        console.error("Geocoder service not found in Kakao Maps.");
                    }
                    console.log("Map initialized:", newMap);
                }, 70); // Delay to ensure DOM is ready
            });
        } else {
            console.error("Kakao Maps API not loaded.");
        }
    }, []);


    // Fetch tour information
    useEffect(() => {
        const fetchTourInfo = async () => {
            try {
                const encodedKey = encodeURIComponent('arCCpeP2+qGI/skRFQTdlVIk9YawcmDuV4L0FJVA67AgRUI/hUD3mY3QVU/6N845xHz0ekWjD8CpnC5jyxY4PQ==');
                const response = await axios.get(`https://api.odcloud.kr/api/3069594/v1/uddi:28c97776-812e-4957-98ad-af93c027a671_201909271539?serviceKey=${encodedKey}`, {
                    params: {
                        page: 1,
                        perPage: 10,
                        returnType: 'JSON'
                    }
                });

                setTouristSpots(response.data.data);
                console.log("Tourist spots data:", response.data.data);
            } catch (err) {
                console.error('Error fetching MICE tourism data:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTourInfo();
    }, []);

    // Add markers and info windows once the tour data is loaded
    useEffect(() => {
        console.log("Processing spot: 100");
        if (map && geocoder && touristSpots.length > 0) {
            touristSpots.forEach((spot) => {
                console.log("Processing spot:", spot);
                if (spot.주소) {
                    geocoder.addressSearch('Seoul City Hall', (result, status) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            console.log("Test address found:", result);
                        } else {
                            console.warn("Test geocoding failed for: Seoul City Hall");
                        }
                    });
                    // Add an info window for the marker
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
                    // Manually place a test marker at Seoul City Hall
                    var testMarkerPosition = new window.kakao.maps.LatLng(37.568477, 126.981611);
                    var testMarker = new window.kakao.maps.Marker({
                        position: testMarkerPosition
                    });
                    testMarker.setMap(map);

                    // Add an event listener for the test marker
                    window.kakao.maps.event.addListener(testMarker, 'click', () => {
                        console.log("Test marker clicked");
                        alert("Test marker clicked!");
                        infoWindow.open(map, testMarker); // Open the info window
                    });

                    geocoder.addressSearch(spot.주소, (result, status) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            const markerPosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                            const marker = new window.kakao.maps.Marker({ position: markerPosition });
                            marker.setMap(map);

                            // Set the map level to 4 and animate the zoom effect centered on the marker
                            map.setLevel(4, {
                                anchor: markerPosition,
                                animate: {
                                    duration: 500 // Set animation duration to 500ms
                                }
                            });



                            // Add an event listener for each marker
                            window.kakao.maps.event.addListener(marker, 'click', () => {
                                //alert(`Marker clicked: ${spot.시설명}`); // Display an alert
                                console.log("Marker clicked:", spot.시설명);
                                infoWindow.open(map, marker); // Open the info window
                            });

                            // Close the info window when clicking on the map elsewhere
                            window.kakao.maps.event.addListener(map, 'click', () => {
                                infoWindow.close();
                            });
                        }

                    });
                }
            });
        }
    }, [map, geocoder, touristSpots]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log("Rendering TourMap component");
    return <div>
        <div id="map" style={{ width: '100%', height: '500px' }}></div>
        {/* Add other JSX here if needed */}
    </div>
};

export default TourMap;
