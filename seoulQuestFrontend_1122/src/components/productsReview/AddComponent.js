import React, { useEffect, useState } from 'react';
import { getInfoforProduct, postAdd } from '../../api/reviewApi';
import ResultModal from '../common/ResultModal';
import useCustomMove from '../../hooks/useCustomMove';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const initState = {
    title: '',
    email: '',
    reviewContent: '',
    rating: 0, 
    selectedItemId: '',
};

const AddComponent = () => {
    const [review, setReview] = useState({ ...initState });
    const [result, setResult] = useState(null);
    const { moveToList } = useCustomMove();
    const navigate = useNavigate();

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
        postAdd(review)
            .then((result) => {
                console.log(result)
                setResult(result);
                setReview({ ...initState }); // 초기화
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const closeModal = () => {
        setResult(null);
        navigate("/review")
    };

    useEffect(() => {
        getInfoforProduct().then((data) => {
            if (data.paymentItemList.length === 0) {
                alert("There is no product to review.");
                navigate("/review");
            }
            setReview(data);
        });
    }, []);

    return (
        <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg mt-10 p-8">
            {result && (
                <ResultModal
                    title="Add Result"
                    content={`New review with ID: ${result} has been added`}
                    callbackFn={closeModal}
                />
            )}

            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Product Review</h2>

            {/* Title */}
            <div className="mb-6">
                <label className="block font-medium text-gray-600 mb-2">Title</label>
                <input
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    name="title"
                    type="text"
                    value={review.title}
                    onChange={handleChangereview}
                    placeholder="Enter the title"
                />
            </div>

            {/* Email */}
            <div className="mb-6">
                <label className="block font-medium text-gray-600 mb-2">Email</label>
                <input
                    className="w-full p-3 border rounded-md bg-gray-100 text-gray-500 focus:outline-none"
                    name="email"
                    type="text"
                    value={review.email}
                    onChange={handleChangereview}
                    disabled
                />
            </div>

            {/* Product Selection */}
            <div className="mb-6">
                <label className="block font-medium text-gray-600 mb-2">Product</label>
                <select
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    name="selectedItemId"
                    value={review.selectedItemId}
                    onChange={handleChangereview}
                >
                    <option value="" disabled>
                        Select your product
                    </option>
                    {review.paymentItemList?.length > 0 ? (
                        review.paymentItemList.map((product) => (
                            <option key={product.paymentItemId} value={product.paymentItemId}>
                                {product.pname}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>
                            No products available
                        </option>
                    )}
                </select>
            </div>

            {/* Rating */}
            <div className="mb-6">
                <label className="block font-medium text-gray-600 mb-2">Rating</label>
                <div className="flex items-center">
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
            <div className="mb-6">
                <label className="block font-medium text-gray-600 mb-2">Review Content</label>
                <textarea
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    name="reviewContent"
                    value={review.reviewContent}
                    onChange={handleChangereview}
                    placeholder="Write your review here"
                    rows="4"
                />
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition"
                    onClick={handleClickAdd}
                >
                    Submit Review
                </button>
            </div>
        </div>
    );
};

export default AddComponent;
