import React, { useState } from "react";
import ProductReviewComponent from "../../components/review/ProductReviewComponent";
import MyPageLayout from "../../layouts/MyPageLayout";
import BasicLayout from "../../layouts/BasicLayout";
import TourReviewComponent from "../../components/review/TourReviewComponent";

const ReviewPage = () => {
  window.scrollTo(0, 0);
  const [activeSegment, setActiveSegment] = useState("Product Reviews"); // 기본값 설정

  const handleSegmentChange = (value) => {
    console.log("Selected Segment:", value);
    setActiveSegment(value); // 상태 업데이트
  };

  return (
    <BasicLayout>
      <div className="p-6 bg-gray-100 flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-3 gap-6 w-full max-w-6xl mt-20">
          <div className="col-span-1 min-h-screen max-h-screen bg-gray-100">
            <MyPageLayout />
          </div>
          <div className="col-span-2">
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
