import React, { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import ProductComponent from '../components/menus/ProductComponent';
import TourComponent from '../components/menus/TourComponent';

const Favorite = () => {
  const [activeTab, setActiveTab] = useState('products'); // Default tab is "products"
  const [isSingleColumn, setIsSingleColumn] = useState(false); // Tracks if grid is single column

  // Detect screen size to adjust layout dynamically
  useEffect(() => {
    const updateColumnState = () => {
      setIsSingleColumn(window.innerWidth < 640); // 'sm' breakpoint for Tailwind is 640px
    };

    updateColumnState(); // Check on component mount
    window.addEventListener('resize', updateColumnState); // Check on resize

    return () => {
      window.removeEventListener('resize', updateColumnState);
    };
  }, []);

  return (
    <BasicLayout>
      <div className="bg-gray-100 pt-10 pb-10">
        {/* Title Section */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mt-16 mb-10">
          My Favorites
        </h1>

        {/* Switch Buttons (only visible on small screens) */}
        {isSingleColumn && (
          <div className="mb-6 px-4">
            <div className="flex justify-center space-x-4">
              <button
                className={`px-4 py-2 rounded-md transition ${
                  activeTab === 'products'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
                onClick={() => setActiveTab('products')}
              >
                Products
              </button>
              <button
                className={`px-4 py-2 rounded-md transition ${
                  activeTab === 'tours'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
                onClick={() => setActiveTab('tours')}
              >
                Tours
              </button>
            </div>
          </div>
        )}

        {/* Responsive Content Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 sm:px-10 lg:px-20">
          {/* Product Component */}
          {(activeTab === 'products' || !isSingleColumn) && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Favorite Products
              </h2>
              <ProductComponent />
            </div>
          )}

          {/* Tour Component */}
          {(activeTab === 'tours' || !isSingleColumn) && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Favorite Tours
              </h2>
              <TourComponent />
            </div>
          )}
        </div>
      </div>
    </BasicLayout>
  );
};

export default Favorite;
