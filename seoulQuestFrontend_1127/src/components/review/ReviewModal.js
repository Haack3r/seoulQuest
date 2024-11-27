import React, { useState } from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import useCustomLogin from "../../hooks/useCustomLogin";

const ReviewModal = ({ selectedReview, closeEditModal, deleteOne ,putOne}) => {
  console.log("selectedReview.trid",selectedReview.trid)
  const { loginState } = useCustomLogin();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    prid: selectedReview.prid,
    trid: selectedReview.trid,
    title: selectedReview.title,
    reviewContent: selectedReview.reviewContent,
    rating: selectedReview.rating,
  });

  if (!selectedReview) return null;

  const handleClickDelete = (rid) => {
    console.log("rid" ,rid)
    deleteOne(rid).then(() => {
      closeEditModal();
    });
  };

  // 수정 핸들러
  const handleClickModify = () => {
    setIsEditMode(true); 
  };

  // 수정 폼 제출 핸들러
  const handleSubmitEdit = () => {
    console.log("editData.trid",editData.trid)
    console.log(editData.reviewContent)
    putOne(editData).then(() => {
      closeEditModal();
    });
  };

  // 입력값 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 평점 업데이트 핸들러
  const handleRatingChange = (rating) => {
    setEditData((prev) => ({
      ...prev,
      rating,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
         {selectedReview.email === loginState.email && (
                <div className="absolute top-5 right-5 px-3 py-1 text-sm font-semibold text-white bg-teal-500 rounded-lg shadow-md">
                  My Review
                </div>
              )}
        {!isEditMode ? (
          <>
            {/* 읽기 모드 */}
            <div className=" flex items-center mb-4">
              
              <div className="bg-stone-400 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                {selectedReview.nickName[0]}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">{selectedReview.nickName}</h3>
                <p className="text-sm text-gray-500">{selectedReview.dueDate}</p>
                <p className="text-sm text-gray-500">{selectedReview.itemName}</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {selectedReview.rating >= star ? (
                    <StarFilled className="text-yellow-400 text-2xl" />
                  ) : (
                    <StarOutlined className="text-gray-300 text-2xl" />
                  )}
                </span>
              ))}
            </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{selectedReview.title}</h4>
            <p className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 leading-relaxed">
              {selectedReview.reviewContent}
            </p>
            <div className="flex justify-end mt-6">
              {selectedReview.email === loginState.email && (
                <>
                  <button
                    className="px-4 py-2 bg-yellow-400 text-white rounded-lg mr-2 hover:bg-yellow-500"
                    onClick={handleClickModify}
                  >
                    Modify
                  </button>
                  <button
                    className="px-4 py-2 bg-stone-400 text-white rounded-lg mr-2 hover:bg-stone-500"
                    onClick={() => handleClickDelete(selectedReview.prid||selectedReview.trid)}
                  >
                    Delete
                  </button>
                </>
              )}
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                onClick={closeEditModal}
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 수정 모드 */}
            <div className="flex items-center mb-4">
              <div className="bg-stone-400 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                {selectedReview.nickName[0]}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">{selectedReview.nickName}</h3>
                <p className="text-sm text-gray-500">{selectedReview.itemName}</p>
              </div>
            </div>
            <div className="flex flex-col items-center mb-4">
              <p className="text-gray-600 font-medium">Update your rating:</p>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className="cursor-pointer"
                  >
                    {editData.rating >= star ? (
                      <StarFilled className="text-yellow-400 text-2xl" />
                    ) : (
                      <StarOutlined className="text-gray-300 text-2xl" />
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between mb-4">
            
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter title"
              />
            </div>
            <div className="mb-4">
              <textarea
                name="reviewContent"
                value={editData.reviewContent}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter review content"
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-yellow-400 text-white rounded-lg mr-2 hover:bg-yellow-500"
                onClick={handleSubmitEdit}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                onClick={() => setIsEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
