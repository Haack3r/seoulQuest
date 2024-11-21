import React, { useEffect, useState } from 'react';
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
    const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
    const [serverData, setServerData] = useState(initState);
    const { loginState } = useCustomLogin();
    const [result, setResult] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        getList({ page, size })
            .then((data) => {
                setServerData(data);
                console.log(data)
                console.log(loginState.email)
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

    const goToProductRead = () => {
        navigate(`/products/review/list`);
        closeModal();
    };

    return (
        <div className="flex flex-col max-w-5xl mx-auto bg-gray-50 border border-gray-200 rounded-lg shadow-lg mt-10 p-6 mb-10">
            <div>
            <div className='text-3xl font-extrabold mb-5'>
                Product Reviews
            </div>
                {serverData.dtoList.length > 0 ? serverData.dtoList.map((review) => (
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
                )):
                (<div>
                    There is no review.
                </div>
                )}
            </div>

            <div className="mt-8">
                <PageComponent serverData={serverData} movePage={moveToList} />
            </div>
            
            {/* 모달 컴포넌트 */}
            {isModalOpen && (
                <ReviewModal
                    selectedReview={selectedReview}
                    closeModal={closeModal}
                    goToProductRead={goToProductRead}
                />
            )}
        </div>
    );
};

export default ListComponent;
