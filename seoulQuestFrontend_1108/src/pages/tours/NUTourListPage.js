import React, { useRef } from "react";
import NUTourListComponent from "../../components/tours/NUTourListComponent";
import { MapPin, Home } from "lucide-react"; // Use any icon library you prefer
import MainImage from "./../../layouts/MainImage";
import TourImage from "../../layouts/TourImage";
import AboutToursComponent from "../../components/tours/AboutToursComponent ";
import SearchBar from "../../layouts/SearchBar";
import TourMap from "../../components/TourMap";

const NUTourListPage = () => {
    const aboutRef = useRef(null); // Create a ref for the AboutToursComponent
  
    const scrollToAbout = () => {
      // Scroll to the AboutToursComponent
      if (aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
  
    return (
      <div className="p-4 w-full" style={{ backgroundColor: "#E0DCD0" }}>
        {/* Content */}
        <div className="mt-2">
                <TourImage onScrollToAbout={scrollToAbout} />
                <TourMap />
                <NUTourListComponent />
          {/* Add a ref to the AboutToursComponent */}
          <div ref={aboutRef}>
            <AboutToursComponent />
          </div>
        </div>
      </div>
    );
  };

export default NUTourListPage;
