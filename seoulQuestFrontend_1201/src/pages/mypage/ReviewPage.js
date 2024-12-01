import React, { useState } from "react";
import ProductReviewComponent from "../../components/review/ProductReviewComponent";
import MyPageLayout from "../../layouts/MyPageLayout";
import BasicLayout from "../../layouts/BasicLayout";
import TourReviewComponent from "../../components/review/TourReviewComponent";

const ReviewPage = () => {
  window.scrollTo(0, 0);
  const [activeSegment, setActiveSegment] = useState("Product Reviews");

  const handleSegmentChange = (value) => {
    console.log("Selected Segment:", value);
    setActiveSegment(value);
  };

  return (
    <BasicLayout>
      <div className="bg-gray-100 flex justify-center items-start min-h-screen mt-14">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 mt-20">
          {/* Sidebar for Large Screens */}
          <div className="hidden lg:block w-1/3">
            <MyPageLayout />
          </div>

          {/* Horizontal Menu for Small Screens */}
          <div className="lg:hidden fixed top-16 left-0 w-full">
            <MyPageLayout />
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-2/3  p-6">
            {/* Segmented Control */}
            <div className="flex ml-2 mt-2">
              {["Product Reviews", "Tour Reviews"].map((segment) => (
                <button
                  key={segment}
                  onClick={() => handleSegmentChange(segment)}
                  className={`px-10 mr-2 font-semibold transition-all duration-300 
                    ${
                      activeSegment === segment
                        ? "bg-stone-400 text-white shadow-lg scale-105"
                        : "bg-gray-200 text-stone-600 hover:bg-gray-300 hover:scale-105"
                    }`}
                >
                  {segment}
                </button>
              ))}
            </div>

            {/* Dynamic Content */}
            <div className="min-h-[300px] mt-6">
              {activeSegment === "Product Reviews" ? (
                <ProductReviewComponent />
              ) : (
                <TourReviewComponent />
              )}
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default ReviewPage;
