import React from 'react'
import ProductReviewComponent from '../../components/review/ProductReviewComponent'
import { useLocation, useNavigate } from 'react-router-dom';
import MyPageLayout from '../../layouts/MyPageLayout';
import BasicLayout from '../../layouts/BasicLayout';
import { Segmented } from 'antd';
import TourReviewComponent from '../../components/review/TourReviewComponent';

const ProductReviewPage = () => {
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
    <div className="p-6 w-full bg-gray-100 flex justify-center items-start">
    <div className="flex flex-row gap-6 w-full max-w-6xl mt-20">
      <div className="w-1/3">
        <MyPageLayout />
      </div>
      <div className="w-2/3">
      <Segmented
          options={['Product Reviews', 'Tour Reviews']}
          value={activeSegment}
          onChange={handleSegmentChange}
          size="large"
          block
          className="w-full max-w-md font-semibold"
        />
        {activeSegment === 'Product Reviews' ? <ProductReviewComponent /> : <TourReviewComponent />}
      </div>
    </div>
  </div>
</BasicLayout>
  )
}

export default ProductReviewPage