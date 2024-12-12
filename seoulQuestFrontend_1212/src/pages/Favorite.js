import React, { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import ProductComponent from '../components/menus/ProductComponent';
import TourComponent from '../components/menus/TourComponent';

const Favorite = () => {
  const [activeTab, setActiveTab] = useState('products'); // Default tab is "products"
  const [isSingleColumn, setIsSingleColumn] = useState(false); // Tracks if grid is single column

  // Detect screen size to adjust layout dynamically
  useEffect(() => {
    window.scrollTo(0, 0);
    const updateColumnState = () => {
      setIsSingleColumn(window.innerWidth < 1024); // Transition to single-column at `lg` breakpoint (1024px)
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

        {/* Switch Buttons (only visible in single-column layout) */}
        {isSingleColumn && (
          <div className="mb-6 px-4">
            <div className="flex justify-center space-x-4">
              <button
                className={`px-4 py-2 rounded-md transition ${
                  activeTab === 'products'
                    ? 'bg-gray-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
                onClick={() => setActiveTab('products')}
              >
                Products
              </button>
              <button
                className={`px-4 py-2 rounded-md transition ${
                  activeTab === 'tours'
                    ? 'bg-gray-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
                onClick={() => setActiveTab('tours')}
              >
                Tours
              </button>
            </div>
          </div>
        )}

        {/* Layout Section */}
        <div
          className={`${
            isSingleColumn
              ? 'grid grid-cols-1 gap-6'
              : 'flex justify-center items-start space-x-4'
          } px-4 sm:px-10 lg:px-20`}
        >
          {/* Product Component */}
          {(activeTab === 'products' || !isSingleColumn) && (
            <div className={isSingleColumn ? '' : 'w-1/2 max-w-md'}>
              <ProductComponent />
            </div>
          )}

          {/* Tour Component */}
          {(activeTab === 'tours' || !isSingleColumn) && (
            <div className={isSingleColumn ? '' : 'w-1/2 max-w-md'}>
              <TourComponent />
            </div>
          )}
        </div>
      </div>
    </BasicLayout>
  );
};

export default Favorite;
