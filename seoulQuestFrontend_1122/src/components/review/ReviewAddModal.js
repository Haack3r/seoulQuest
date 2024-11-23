import React, { useEffect, useState } from 'react';
import { getInfoforProduct, postAdd } from '../../api/reviewApi';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const initState = {
    title: '',
    email: '',
    reviewContent: '',
    rating: 0, 
    selectedItemId: '',
    paymentItemList: []
};

const ReviewAddModal = ({closeModal}) => {
    const [review, setReview] = useState({ ...initState });
    const [result, setResult] = useState(null);
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
        closeModal();
        postAdd(review)
            .then((result) => {
                console.log(result)
                setResult(result);
                setReview({ ...initState });
                navigate("/review")
            })
            .catch((e) => {
                console.error(e);
            });
    };

    useEffect(() => {
        getInfoforProduct().then((data) => {
            setReview(data);
        });
    }, []);

    return (
      
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <form  onSubmit={handleClickAdd}>
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
                    required
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
                    required
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
                    required
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
                <button
                    type='submit'
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg transition"
                >
                    Submit Review
                </button>

                <button
                type='button'
                className="ml-3 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
            </form>
            </div>
        </div>
    );
};

export default ReviewAddModal;
