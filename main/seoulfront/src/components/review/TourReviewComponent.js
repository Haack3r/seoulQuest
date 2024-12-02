import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/PageComponent";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import useCustomLogin from "../../hooks/useCustomLogin";
import ReviewModal from "./ReviewModal";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import ReviewAddModal from "./ReviewAddModal";
import { Switch } from "antd";
import {
  getTourList,
  getInfoforTour,
  postTourAdd,
  deleteTourOne,
  putTourOne,
} from "../../api/reviewApi";

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

const TourReviewComponent = () => {
  const { page, size } = useCustomMove();
  const [refresh, setRefresh] = useState(false);
  const [serverData, setServerData] = useState(initState);
  const { loginState } = useCustomLogin();
  const [selectedReview, setSelectedReview] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const movePage = (pageParam) => {
    const queryStr = createSearchParams({
      page: pageParam.page || page,
      size: pageParam.size || size,
    }).toString();

    // 현재 경로에 쿼리 스트링 추가하여 이동
    navigate({ pathname: location.pathname, search: queryStr });
  };

  const openEditModal = (review) => {
    setSelectedReview(review);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedReview(null);
    setEditModalOpen(false);
    setRefresh(!refresh);
  };

  const OpenAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    setRefresh(!refresh);
  };

  useEffect(() => {
    const params = { page, size, email: loginState.email };

    getTourList(params)
      .then((data) => {
        setServerData(data);
      })
      .catch((error) => {
        console.error("Error fetching list:", error);
      });
  }, [page, size, refresh]);

  return (
    <div className="max-w-7xl min-w-[320px] md:min-w-[768px] mx-auto mt-20 mb-20">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 mb-10">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 ">My Reviews</h2>
          <button
            className="text-gray-500 underline hover:text-blue-600 hover:underline font-semibold py-2 px-4 transition duration-200"
            onClick={OpenAddModal}
          >
            Write a Review
          </button>
        </div>

        {serverData.dtoList.length > 0 ? (
          serverData.dtoList.map((review) => (
            <div
              key={review.trid}
              className="flex flex-row gap-4 mb-5 items-center bg-gray-50 hover:bg-gray-100 rounded-lg shadow transition-shadow p-6 cursor-pointer"
              onClick={() => openEditModal(review)}
            >
              <div className="text-sm text-gray-500 w-1/6 text-center">
                {review.dueDate}
              </div>
              <div className="text-lg font-semibold text-gray-800 w-2/6 truncate">
                {review.title}
              </div>
              <div className="text-sm text-gray-600 w-1/6 truncate">
                {review.itemName}
              </div>
              <div className="flex items-center justify-center w-1/6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
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
          <div className="text-center text-gray-500 py-10">
            Be the first to leave a review!
          </div>
        )}
        <div className="mt-6">
          <PageComponent serverData={serverData} movePage={movePage} />
        </div>
      </div>
      {editModalOpen && (
        <ReviewModal
          selectedReview={selectedReview}
          closeEditModal={closeEditModal}
          deleteOne={deleteTourOne}
          putOne={putTourOne}
        />
      )}
      {addModalOpen && (
        <ReviewAddModal
          closeAddModal={closeAddModal}
          getInfo={getInfoforTour}
          postAdd={postTourAdd}
        />
      )}
    </div>
  );
};

export default TourReviewComponent;
