import React from "react";
import NUTourListComponent from "../../components/tours/NUTourListComponent";
import { MapPin, Home } from "lucide-react"; // Use any icon library you prefer
import MainImage from "./../../layouts/MainImage";
import TourImage from "../../layouts/TourImage";
import AboutToursComponent from "../../components/tours/AboutToursComponent ";
import SearchBar from "../../layouts/SearchBar";

const NUTourListPage = () => {
  return (
    <div className="p-4 w-full" style={{ backgroundColor: "#E0DCD0" }}>
      {/* Tour Page Title */}
      <div className="flex items-center justify-center -mb-28 mt-20">
        <MapPin className="h-7 w-7 text-orange-500 mr-1" /> {/* Tighter icon margin */}
        <h2 className="text-2xl font-bold text-gray-800">Our Tours</h2>
      </div>

      {/* Content */}
      <div className="mt-2">
        <TourImage />
        <SearchBar />
        <AboutToursComponent />
        <NUTourListComponent />
      </div>
    </div>
  );
};

export default NUTourListPage;
