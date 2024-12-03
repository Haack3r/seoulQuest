import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import ProductComponent from '../components/menus/ProductComponent';
import TourComponent from '../components/menus/TourComponent';

const Favorite = () => {
  return (
    <BasicLayout>
      <div className="bg-gray-100 pt-10 pb-10">
        {/* Title Section */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mt-16 mb-10">
          My Favorites
        </h1>

        <div className="flex justify-center items-start min-h-screen w-full p-4 space-x-4 mt-10">
          {/* Product and Tour Components */}
          <div className="w-1/2 max-w-md">
            <ProductComponent />
          </div>
          <div className="w-1/2 max-w-md">
            <TourComponent />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Favorite;
