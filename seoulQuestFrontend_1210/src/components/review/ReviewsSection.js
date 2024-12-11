import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ReviewModal from './ReviewModal'; 
import useCustomLogin from '../../hooks/useCustomLogin';

const ReviewsSection = ({ refresh,
  setRefresh,
  reviews,
  putOne, 
  deleteOne }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedReview, setSelectedReview] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { isLogin,loginState } = useCustomLogin();
  

  // Update layout on window resize
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const reviewsPerSlide = windowWidth >= 1024 ? 2 : 1; // 2 reviews on large screens, 1 on small screens

  const handleNavigation = () => {
    navigate('/mypage/review'); 
};

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + reviewsPerSlide < reviews.length ? prevIndex + reviewsPerSlide : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - reviewsPerSlide >= 0 ? prevIndex - reviewsPerSlide : reviews.length - reviewsPerSlide
    );
  };

  const openModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
};

const closeModal = () => {
    setSelectedReview(null);
    setIsModalOpen(false);
    setRefresh(!refresh)
};

  return (
    <div className="mt-10 bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">What Customers Say About This Item</h2>
        {isLogin?
            (<button
                className="px-4 py-2 text-gray-500 underline hover:text-gray-600"
                onClick={handleNavigation}
            >
                Go to Your Review List
            </button>):''}
      </div>

      <div className="relative flex items-center">
        <button
          className="absolute left-[-20px] z-10 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>

        <div className="flex space-x-4 overflow-hidden w-full">
          {reviews &&reviews.slice(currentIndex, currentIndex + reviewsPerSlide).map((review) => (
            <div
              key={review.id}
              className="relative bg-white rounded-lg shadow-md p-4 w-full lg:w-1/2 border border-gray-200"
              onClick={() => openModal(review)} 
            >
              <div className="flex items-center mb-2">
                <div className="bg-stone-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {review.nickName[0]}
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-gray-800">{review.nickName}</h3>
                  <p className="text-xs text-gray-500">{review.dueDate}</p>
                </div>
              </div>
              {isLogin && review.email === loginState.email && (
                                <div className="absolute top-5 right-5 px-3 py-1 text-sm font-semibold text-white bg-teal-500 rounded-lg shadow-md">
                                My Review
                                </div>
                            )}
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {review.rating >= star ? (
                      <StarFilled className="text-yellow-400 text-xl" />
                    ) : (
                      <StarOutlined className="text-gray-300 text-xl" />
                    )}
                  </span>
                ))}
              </div>
              <h3 className="text-gray-800 leading-relaxed mb-2 font-semibold">{review.title}</h3>
              <p className="text-sm text-gray-700">{review.reviewContent}</p>
            </div>
          ))}
        </div>

        <button
          className="absolute right-[-20px] z-10 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100"
          onClick={nextSlide}
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      </div>
      {isModalOpen && (
                <ReviewModal
                    selectedReview={selectedReview}
                    closeEditModal={closeModal}
                    putOne={putOne}
                    deleteOne={deleteOne}
                />
            )}
    </div>
  );
};

export default ReviewsSection;
