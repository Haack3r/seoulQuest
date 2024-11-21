import React from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';

const ReviewModal = ({ selectedReview, closeModal, goToProductRead }) => {
    if (!selectedReview) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center mb-4">
                    <div className="bg-stone-400 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                        {selectedReview.nickName[0]}
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">{selectedReview.nickName}</h3>
                        <p className="text-sm text-gray-500">{selectedReview.dueDate}</p>
                    </div>
                </div>
                {/* Rating */}
                <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="cursor-pointer">
                            {selectedReview.rating >= star ? (
                                <StarFilled className="text-yellow-400 text-2xl" />
                            ) : (
                                <StarOutlined className="text-gray-300 text-2xl" />
                            )}
                        </span>
                    ))}
                </div>
                {/* Review Content */}
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{selectedReview.title}</h4>
                <p className="text-gray-700">{selectedReview.reviewContent}</p>

                {/* Buttons */}
                <div className="flex justify-end mt-6">
                    <button
                        className="px-4 py-2 bg-yellow-400 text-white rounded-lg mr-2 hover:bg-yellow-500"
                        onClick={goToProductRead} // 상품 상세 페이지로 이동
                    >
                        Back
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                        onClick={closeModal} // 모달 닫기
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
