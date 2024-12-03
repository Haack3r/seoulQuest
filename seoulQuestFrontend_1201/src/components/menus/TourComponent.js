import React, { useCallback, useEffect, useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomTourFav from "../../hooks/useCustomTourFav";
import FavTourComponent from "../../components/favProductAndTour/FavTourComponent";
import { LikeOutlined, DeleteOutlined } from "@ant-design/icons";

const TourComponent = () => {
  const { isLogin, loginState } = useCustomLogin();
  const {
    refreshFav,
    favItems = [], // Access favorite items directly from hook
    changeFav,
    deleteFav,
    deleteBulkFav,
  } = useCustomTourFav();

  const [localFavItems, setLocalFavItems] = useState([]); // Local state for tour favorites
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    // Directly set favItems to localFavItems without filtering by type
    setLocalFavItems(favItems);
    console.log("Updated localFavItems with tour items:", favItems);
  }, [favItems]);

  useEffect(() => {
    if (isLogin) {
      refreshFav(); // Ensure favorite items are refreshed when logging in
    }
  }, [isLogin, refreshFav]);

  const handleDelete = useCallback(
    async (ftino) => {
      await deleteFav(ftino);
      refreshFav();
    },
    [deleteFav, refreshFav]
  );

  const handleBulkDelete = useCallback(async () => {
    console.log(
      "deleteBulkFav called with selected items:",
      Array.from(selectedItems)
    );
    const response = await deleteBulkFav(Array.from(selectedItems));
    if (response) {
      setSelectedItems(new Set());
      refreshFav();
    }
  }, [deleteBulkFav, selectedItems, refreshFav]);

  const toggleSelectItem = useCallback((ftino) => {
    setSelectedItems((prev) => {
      const updatedSet = new Set(prev);
      if (updatedSet.has(ftino)) {
        updatedSet.delete(ftino);
      } else {
        updatedSet.add(ftino);
      }
      return updatedSet;
    });
  }, []);

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8">
      {isLogin ? (
        <div className="w-full max-w-3xl bg-white p-4 sm:p-6 lg:px-8 rounded-lg shadow-xl">
          <div className="mb-6 border-b pb-4 flex items-center space-x-2">
            <LikeOutlined className="text-2xl sm:text-3xl text-gray-700" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Favorite Tours
            </h2>
          </div>

          <div className="mb-6">
            {localFavItems.length > 0 ? (
              <ul className="space-y-4">
                {localFavItems.map((item) => (
                  <FavTourComponent
                    {...item}
                    key={`tour-${item.ftino}`} // Ensure each component has a unique key
                    changeFav={changeFav}
                    email={loginState.email}
                    handleDelete={handleDelete}
                    handleSelect={toggleSelectItem}
                    selected={selectedItems.has(item.ftino)}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                No favorite tours yet.
              </p>
            )}
          </div>

          {selectedItems.size > 0 && (
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
              onClick={handleBulkDelete}
            >
              <DeleteOutlined />
              <span>Delete Selected</span>
            </button>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">
          Please log in to see your favorite tours.
        </p>
      )}
    </div>
  );
};

export default TourComponent;
