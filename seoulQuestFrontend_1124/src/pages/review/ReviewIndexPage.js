import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Segmented } from 'antd';

const ReviewIndexPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeSegment = location.pathname.includes('tour') ? 'Tour Reviews' : 'Product Reviews';

  const handleSegmentChange = (value) => {
    if (value === 'Product Reviews') {
      navigate('products/list');
    } else {
      navigate('tours/list');
    }
  };

  return (
    <BasicLayout>
      <div className="max-w-5xl mx-auto mt-20 px-4">
        {/* Segmented Component */}
        <div className="flex justify-center mb-8">
          <Segmented
            options={['Product Reviews', 'Tour Reviews']}
            value={activeSegment}
            onChange={handleSegmentChange}
            size="large"
            block
            className="w-full max-w-md mt-10 font-semibold"
          />
        </div>

        {/* Outlet for nested routes */}
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </BasicLayout>
  );
};

export default ReviewIndexPage;
