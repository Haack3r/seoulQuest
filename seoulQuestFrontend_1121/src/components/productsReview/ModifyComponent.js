import React, { useEffect, useState } from 'react';
import { deleteOne, getOne, putOne } from '../../api/reviewApi';
import useCustomMove from '../../hooks/useCustomMove';
import ResultModal from '../common/ResultModal';
import { useParams } from 'react-router-dom';
import { StarFilled, StarOutlined } from '@ant-design/icons';

const initState = {
    prid: 0,
    title: '',
    itemName: '',
    email: '',
    reviewContent: '',
    dueDate: null,
    rating: '',
    complete: false,
};

const ModifyComponent = ({prid}) => {
    const [review, setReview] = useState({ ...initState });
    const [result, setResult] = useState(null);
    const { moveToList, moveToRead } = useCustomMove();

    const toggleRating = (star) => {
        setReview((prevReview) => ({
            ...prevReview,
            rating: star,
        }));
    };

    useEffect(() => {
        getOne(prid).then((data) => setReview(data));
    }, [prid]);

    const handleClickModify = () => {
        console.log(review)
        putOne(review).then(() => {
            setResult('Modified');
        });
    };

    // const handleClickDelete = () => {
    //     deleteOne(prid).then(() => {
    //         setResult('Deleted');
    //     });
    // };

    const closeModal = () => {
        if (result === 'Deleted') moveToList({page:1});
        else moveToRead(prid);
    };

    const handleChangereview = (e) => {
        const { name, value } = e.target;
        setReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    return (
        <div className="max-w-3xl mx-auto bg-gray-50 border border-gray-200 rounded-lg shadow-lg mt-10 p-8">
            {result && (
                <ResultModal
                    title="처리 결과"
                    content={result}
                    callbackFn={closeModal}
                />
            )}

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Modify Review
            </h2>

            {/* 작성자 */}
            <div className="mb-6">
                <label className="block font-medium text-gray-600 mb-2">작성자</label>
                <div className="w-full p-3 bg-gray-100 border rounded-md text-gray-700">
                    {review.nickName}
                </div>
            </div>

            {/* 제목 */}
            <div className="mb-6">
                <label className="block font-medium text-gray-600 mb-2">제목</label>
                <input
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    name="title"
                    type="text"
                    value={review.title}
                    onChange={handleChangereview}
                />
            </div>

            {/* 별점 */}
            <div className="mb-6">
                <label className="block font-medium text-gray-600 mb-2">별점</label>
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className="cursor-pointer"
                            onClick={() => toggleRating(star)}
                        >
                            {review.rating >= star ? (
                                <StarFilled className="text-yellow-400 text-2xl mr-2" />
                            ) : (
                                <StarOutlined className="text-gray-300 text-2xl mr-2" />
                            )}
                        </span>
                    ))}
                </div>
            </div>

            {/* 내용 */}
            <div className="mb-6">
                <label className="block font-medium text-gray-600 mb-2">내용</label>
                <textarea
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    name="reviewContent"
                    value={review.reviewContent}
                    onChange={handleChangereview}
                    rows="4"
                />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end mt-8">
                {/* <button
                    className="rounded-lg px-6 py-3 mx-2 text-lg font-semibold text-white bg-stone-300 hover:bg-stone-400 shadow-md transition"
                    onClick={handleClickDelete}
                >
                    삭제
                </button> */}
                <button
                    className="rounded-lg px-6 py-3 mx-2 text-lg font-semibold text-white bg-stone-400 hover:bg-stone-500 shadow-md transition"
                    onClick={handleClickModify}
                >
                    수정
                </button>
            </div>
        </div>
    );
};

export default ModifyComponent;
