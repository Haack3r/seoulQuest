import React, { useCallback } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { Outlet, useNavigate } from 'react-router-dom';

const ReviewIndexPage = () => {
  const navigate = useNavigate();

  const handleClickProductList = useCallback(() => {
    navigate({ pathname: 'product/list' });
  });
  const handleClickProductAdd = useCallback(() => {
    navigate({ pathname: 'product/add' });
  });
  const handleClickTourList = useCallback(() => {
    navigate({ pathname: 'tour/list' });
  });
  const handleClickTourAdd = useCallback(() => {
    navigate({ pathname: 'tour/add' });
  });

  return (
    <BasicLayout>
      <div className="w-full flex justify-start ml-10 space-x-12 mt-20">
        {/* Product List */}
        <div
          className="relative group text-gray-600 text-lg font-medium cursor-pointer hover:text-gray-800 transition"
          onClick={handleClickProductList}
        >
          Product Reviews
          <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-gray-800 transition-all duration-500 group-hover:w-full"></span>
        </div>

          {/* Tour List */}
          <div
          className="relative group text-gray-600 text-lg font-medium cursor-pointer hover:text-gray-800 transition"
          onClick={handleClickTourList}
        >
          Tour Reviews
          <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-gray-800 transition-all duration-500 group-hover:w-full"></span>
        </div>

        {/* Product Add */}
        <div
          className="relative group text-gray-600 text-lg font-medium cursor-pointer hover:text-gray-800 transition"
          onClick={handleClickProductAdd}
        >
          Add Product Review
          <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-gray-800 transition-all duration-500 group-hover:w-full"></span>
        </div>

        {/* Tour Add */}
        <div
          className="relative group text-gray-600 text-lg font-medium cursor-pointer hover:text-gray-800 transition"
          onClick={handleClickTourAdd}
        >
          Add Tour Review
          <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-gray-800 transition-all duration-500 group-hover:w-full"></span>
        </div>
      </div>

      <div className="flex flex-wrap w-full mt-8">
        <Outlet />
      </div>
    </BasicLayout>
  );
};

export default ReviewIndexPage;
