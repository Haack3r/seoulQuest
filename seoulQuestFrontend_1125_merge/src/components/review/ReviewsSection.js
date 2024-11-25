import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import ReviewModal from './ReviewModal'; 
import useCustomLogin from '../../hooks/useCustomLogin';
import { useNavigate } from 'react-router-dom';

const ReviewsSection = ({ itemNo, getItemReview ,putOne, deleteOne }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const { loginState } = useCustomLogin();
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        console.log(loginState.email);
        console.log(itemNo)
        
        getItemReview(itemNo).then((data) => {
            console.log(data)
            setReviews(data);
        });
    }, [itemNo,refresh]);

    const handleNavigation = () => {
        const currentPath = window.location.pathname;
        if (currentPath.includes('products')) {
            navigate('/review/products/list');
        } else if (currentPath.includes('tours')) {
            navigate('/review/tours/list');
        }
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
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
                <button
                    className="px-4 py-2 text-gray-500 underline hover:text-gray-600"
                    onClick={handleNavigation}
                >
                    Go to List
                </button>
            </div>

            <div className="relative flex items-center">
                <button
                    className="absolute left-[-20px] z-10 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100"
                    onClick={prevSlide}
                >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>

                <div className="flex space-x-4 overflow-hidden w-full">
                    {reviews.slice(currentIndex, currentIndex + 2).map((review) => (
                        <div
                            key={review.prid || review.trid}
                            className="relative bg-white rounded-lg shadow-md p-4 w-1/2 border border-gray-200"
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
                            {review.email === loginState.email && (
                                <div className="absolute top-5 right-5 px-3 py-1 text-sm font-semibold text-white bg-teal-500 rounded-lg shadow-md">
                                My Review
                                </div>
                            )}
                            {/* Rating */}
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="cursor-pointer">
                                        {review.rating >= star ? (
                                            <StarFilled className="text-yellow-400 text-xl" />
                                        ) : (
                                            <StarOutlined className="text-gray-300 text-xl" />
                                        )}
                                    </span>
                                ))}
                            </div>
                            {/* Review Title */}
                            <div className="text-gray-800 leading-relaxed mb-2 font-semibold">
                                {review.title}
                            </div>
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
