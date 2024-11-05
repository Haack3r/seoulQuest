import React, { useRef, useState } from "react";
import TourListComponent from "../../components/tours/TourListComponent";
import TourImage from "../../layouts/TourImage";
import AboutToursComponent from "../../components/tours/AboutToursComponent ";
import TourMap from "../../components/TourMap"

const TourListPage = () => {
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
                <TourListComponent />
          {/* Add a ref to the AboutToursComponent */}
          <div ref={aboutRef}>
            <AboutToursComponent />
          </div>
        </div>
      </div>
  );
};

export default TourListPage;
