import React, { useState } from 'react'
import { postAdd } from '../../api/reviewApi'
import ResultModal from '../common/ResultModal'
import useCustomMove from '../../hooks/useCustomMove'
import { StarFilled, StarOutlined } from '@ant-design/icons';

const initState = {
    title: '',
    writer: '',
    dueDate: '',
    reviewContent: '',
    rating: 0, 
}

const AddComponent = () => {
    const [review, setReview] = useState({ ...initState })
    const [result, setResult] = useState(null)
    const { moveToList } = useCustomMove()

    const toggleRating = (star) => {
        setReview((prevReview) => ({
            ...prevReview,
            rating: star, 
        }));
    };

    const handleChangereview = (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClickAdd = () => {
        console.log("review이게 보내진다", review);
        postAdd(review)
            .then((result) => {
                console.log(result);
                setResult(result.tno);
                setReview({ ...initState }); // 초기화
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const closeModal = () => {
        setResult(null);
        moveToList();
    };

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-8 rounded-lg shadow-lg bg-white max-w-4xl mx-auto">
            {/* 모달 처리 */}
            {result ? (
                <ResultModal
                    title={`Add Result`}
                    content={`New ${result} Added`}
                    callbackFn={closeModal}
                />
            ) : null}

            <h2 className="text-2xl font-bold text-center text-sky-600 mb-6">Product Review</h2>

            {/* Title */}
            <div className="flex justify-center mb-4">
                <label className="w-1/4 p-2 text-right font-medium text-gray-700">Title</label>
                <input
                    className="w-3/4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none shadow-sm"
                    name="title"
                    type="text"
                    value={review.title}
                    onChange={handleChangereview}
                    placeholder="Enter the title"
                />
            </div>

            {/* Writer */}
            <div className="flex justify-center mb-4">
                <label className="w-1/4 p-2 text-right font-medium text-gray-700">Writer</label>
                <input
                    className="w-3/4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none shadow-sm"
                    name="writer"
                    type="text"
                    value={review.writer}
                    onChange={handleChangereview}
                    placeholder="Enter the writer's name"
                />
            </div>

            {/* Rating */}
            <div className="flex justify-center mb-4">
                <label className="w-1/4 p-2 text-right font-medium text-gray-700">Rating</label>
                <div className="w-3/4 flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className="cursor-pointer mr-2"
                            onClick={() => toggleRating(star)}
                        >
                            {review.rating >= star ? (
                                <StarFilled className="text-yellow-400 text-2xl" />
                            ) : (
                                <StarOutlined className="text-gray-300 text-2xl" />
                            )}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex justify-center mb-4">
                <label className="w-1/4 p-2 text-right font-medium text-gray-700">Content</label>
                <textarea
                    className="w-3/4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none shadow-sm"
                    name="reviewContent"
                    value={review.reviewContent}
                    onChange={handleChangereview}
                    placeholder="Write your review here"
                    rows="4"
                />
            </div>

            {/* Button */}
            <div className="flex justify-center">
                <button
                    type="button"
                    className="rounded-lg p-3 w-40 bg-sky-500 text-white text-lg font-semibold hover:bg-sky-600 transition shadow-lg"
                    onClick={handleClickAdd}
                >
                    Write
                </button>
            </div>
        </div>
    );
};

export default AddComponent;
