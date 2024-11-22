import React, { useCallback, useEffect, useState } from 'react';
import { getList } from '../../api/reviewApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import useCustomLogin from '../../hooks/useCustomLogin';
import ReviewModal from './ReviewModal';
import { useNavigate } from 'react-router-dom';

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
};

const ListComponent = () => {
    const { page, size, refresh, moveToList} = useCustomMove();
    const [serverData, setServerData] = useState(initState);
    const { loginState } = useCustomLogin();
    const [selectedReview, setSelectedReview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMyReviews, setShowMyReviews] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        getList({ page, size })
            .then((data) => {
                setServerData(data);
                console.log(data);
                console.log(loginState.email);
            })
            .catch((error) => {
                console.error('Error fetching list:', error);
            });
    }, [page, size, refresh]);

    const openModal = (review) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedReview(null);
        setIsModalOpen(false);
    };

    const toggleReviewFilter = () => {
        setShowMyReviews((prevState) => !prevState);
    };

    const filteredDtoList = showMyReviews
        ? serverData.dtoList.filter((review) => review.email === loginState.email)
        : serverData.dtoList;

    return (
        <div className="flex flex-col max-w-5xl mx-auto bg-gray-50 border border-gray-200 rounded-lg shadow-lg p-6 mb-20">
            <div>
                <div className="text-3xl font-extrabold mb-5">Product Reviews</div>

                <div className="flex justify-end mb-5">
                    <div
                        className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out cursor-pointer"
                        onClick={() => navigate('/review/product/add')}
                    >
                        Write Review
                    </div>
                </div>

                {filteredDtoList.length > 0 ? (
                    filteredDtoList.map((review) => (
                        <div
                            key={review.prid}
                            className="flex flex-row gap-6 mb-5 justify-between bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-3 cursor-pointer"
                            onClick={() => openModal(review)}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-sm text-gray-500">{review.dueDate}</div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{review.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">By: {review.nickName}</p>
                            <p className="text-sm text-gray-600 mb-4">Item: {review.itemName}</p>

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
                        </div>
                    ))
                ) : (
                    <div>There is no review.</div>
                )}
            </div>

            <div className="bottom-4 right-4">
                <button
                    className="text-blue-600 hover:underline font-semibold"
                    onClick={toggleReviewFilter}
                >
                    {showMyReviews ? 'View All Reviews' : 'View My Reviews'}
                </button>
            </div>

            <div className="mt-8">
                <PageComponent serverData={serverData} movePage={moveToList} />
            </div>

            {/* 모달 컴포넌트 */}
            {isModalOpen && (
                <ReviewModal
                    selectedReview={selectedReview}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default ListComponent;
