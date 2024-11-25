import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import MyPageLayout from '../../layouts/MyPageLayout';
import BasicLayout from '../../layouts/BasicLayout';
import { Segmented } from 'antd';
import TourReviewComponent from '../../components/review/TourReviewComponent';
import ProductReviewComponent from '../../components/review/ProductReviewComponent';

const TourReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeSegment = location.pathname.includes('tour') ? 'Tour Reviews' : 'Product Reviews';
  
    const handleSegmentChange = (value) => {
        if (value === 'Product Reviews') {
            navigate('/mypage/review/products');
          } else {
            navigate('/mypage/review/tours');
          }
    };

  return (
    <BasicLayout>
       <div className="p-6 bg-gray-100 flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-3 gap-6 w-full max-w-6xl mt-20">
          <div className="col-span-1 min-h-screen max-h-screen bg-gray-100">
            <MyPageLayout />
          </div>
          <div className="col-span-2">
           <Segmented
        options={['Product Reviews', 'Tour Reviews']}
        value={activeSegment}
        onChange={handleSegmentChange}
        size="large"
        block
        className="w-full max-w-md font-semibold"
      />
            <div className="min-h-[300px]">
        {activeSegment === 'Product Reviews' ? (
          <ProductReviewComponent />
        ) : (
          <TourReviewComponent />
        )}
      </div>
          </div>
        </div>
      </div>
    </BasicLayout> 
  )
}

export default TourReviewPage