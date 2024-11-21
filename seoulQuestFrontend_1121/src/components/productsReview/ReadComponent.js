import React, { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { deleteOne, getOne } from '../../api/reviewApi';
import { StarFilled ,StarOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ResultModal from '../common/ResultModal';

const initState = {
    prid: 0,
    title: '',
    itemName: '',
    nickName: '',
    reviewContent: '',
    dueDate: null,
    rating: '',
};

const ReadComponent = ({ prid }) => {
    const [review, setReview] = useState(initState);
    const { moveToRead, moveToList, moveToModify } = useCustomMove();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getOne(prid).then((data) => {
            console.log(data);
            setReview(data);
        });
    }, [prid]);

    const handleClickDelete = () => {
        deleteOne(prid).then(() => {
            setResult('Deleted');
        });
    };

    const closeModal = () => {
        if (result === 'Deleted') moveToList({page:1});
        else moveToRead(prid);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-lg mt-10 p-6">
             {result && (
                <ResultModal
                    title="처리 결과"
                    content={result}
                    callbackFn={closeModal}
                />
            )}
            {/* Nickname and Date */}
            <div className="flex items-center mb-4">
              
                <div className="bg-stone-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {review.nickName[0]}
                </div>   
                <div className="ml-4">
                    <p className="font-bold text-gray-800 text-lg">{review.nickName}</p>
                    <p className="text-sm text-gray-500">{review.dueDate}</p>
                </div>
            </div>

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
            <div className="text-gray-800 leading-relaxed mb-2">
                {review.title}
            </div>
            {/* Review Content */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 leading-relaxed">
                {review.reviewContent}
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="rounded-lg px-6 py-3 mx-2 text-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 shadow-md transition"
                    onClick={() => moveToList()}
                >
                    review 목록으로 돌아가기
                </button>
                <button
                    className="rounded-lg px-6 py-3 mx-2 text-lg font-semibold text-white bg-stone-500 hover:bg-stone-400 shadow-md transition"
                    onClick={handleClickDelete}
                >
                    삭제
                </button>
                <button
                    type="button"
                    className="rounded-lg px-6 py-3 mx-2 text-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 shadow-md transition"
                    onClick={() => moveToModify(prid)}
                >
                    Modify
                </button>
            </div>
        </div>
    );
};

export default ReadComponent;
