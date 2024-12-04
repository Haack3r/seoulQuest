import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faCircleInfo,
  faMagnifyingGlass,
  faFire
} from "@fortawesome/free-solid-svg-icons";
import TourListComponent from "../../components/tours/TourListComponent";
import TourImage from "../../layouts/TourImage";
import TourMap from "../../components/TourMap";
import MostPopularTour from "../../components/tours/MostPopularTour";
import AboutToursComponent from "../../components/tours/AboutToursComponent ";


const TourListPage = () => {
  // Refs for each component
  const aboutRef = useRef(null);
  const tourMapRef = useRef(null);
  const tourListRef = useRef(null);
  const tourPopularRef = useRef(null);
  const tourImageRef = useRef(null);

  // State to track visibility of the navigation bar
  const [showNav, setShowNav] = useState(false);

  // Scroll functions
  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTourMap = () => {
    if (tourMapRef.current) {
      tourMapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTourList = () => {
    if (tourListRef.current) {
      tourListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPopularTour = () => {
    if (tourPopularRef.current) {
      tourPopularRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Track scrolling to toggle navigation bar visibility
  useEffect(() => {
    const handleScroll = () => {
      if (tourImageRef.current) {
        const tourImageBottom = tourImageRef.current.getBoundingClientRect().bottom;
        setShowNav(tourImageBottom <= 0); // Show navigation bar when TourImage scrolls out of view
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative p-4 w-full" style={{ backgroundColor: "#E0DCD0" }}>
      {/* TourImage with scroll-to functions */}
      <div ref={tourImageRef}>
        <TourImage
          onScrollToAbout={scrollToAbout}
          onScrollToTourMap={scrollToTourMap}
          onScrollToTourList={scrollToTourList}
        />
      </div>

      {/* Other components */}
      <div ref={tourMapRef}>
        <TourMap />
      </div>
      <div ref={tourPopularRef}>
        <MostPopularTour />
        </div>
      <div ref={aboutRef}>
        <AboutToursComponent />
      </div>
      <div ref={tourListRef}>
        <TourListComponent />
      </div>

      {/* Right-Side Navigation */}
      {showNav && (
        <nav className="fixed top-1/2 right-4 transform -translate-y-1/2  p-4">
          <ul className="space-y-4">
            <li>
              <button
                onClick={scrollToTourMap}
                title="Map"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faMapLocationDot} />
              </button>
            </li>
            <li>
              <button
                onClick={scrollToPopularTour}
                title="Popular Tour"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faFire} />
              </button>
            </li>
            <li>
              <button
                onClick={scrollToAbout}
                title="About Our Tour"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faCircleInfo} />
              </button>
            </li>
            <li>
              <button
                onClick={scrollToTourList}
                title="Search Tour"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TourListPage;
