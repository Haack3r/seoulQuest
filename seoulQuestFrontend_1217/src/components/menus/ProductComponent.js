import React, { useCallback, useEffect, useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomFav from "../../hooks/useCustomFav";
import FavProductComponent from "../../components/favProductAndTour/FavProductComponent";
import { GiftOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ProductComponent = () => {
  const navigate = useNavigate();
  const { isLogin, loginState } = useCustomLogin();
  const {
    refreshFav,
    favItems = [],
    changeFav,
    deleteFav,
    deleteBulkFav,
  } = useCustomFav();

  const [localFavItems, setLocalFavItems] = useState(favItems);
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    setLocalFavItems(favItems);
    console.log("Updated localFavItems to:", favItems); // Confirm local state sync
  }, [favItems]);

  useEffect(() => {
    if (isLogin) {
      refreshFav(); // Ensure refreshFav loads items when logging in
    }
  }, [isLogin, refreshFav]);

  const handleDelete = useCallback(
    async (fino) => {
      await deleteFav(fino);
      refreshFav();
    },
    [deleteFav, refreshFav]
  );

  const handleBulkDelete = useCallback(async () => {
    console.log("deleteBulkFav called with selected items:", Array.from(selectedItems));
    const response = await deleteBulkFav(Array.from(selectedItems));
    if (response) {
        setSelectedItems(new Set()); // Clear selected items
        refreshFav(); // Re-fetch items to update state
    }
}, [deleteBulkFav, selectedItems, refreshFav]);


  const toggleSelectItem = useCallback((fino) => {
    setSelectedItems((prev) => {
      const updatedSet = new Set(prev);
      if (updatedSet.has(fino)) {
        updatedSet.delete(fino);
      } else {
        updatedSet.add(fino);
      }
      return updatedSet;
    });
  }, []);

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8">
      {isLogin ? (
        <div className="w-full max-w-3xl bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-xl">
          <div className="mb-6 border-b pb-4 flex items-center space-x-2">
            <GiftOutlined className="text-2xl sm:text-3xl text-gray-700" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Favorite Products
            </h2>
          </div>

          <div className="mb-6">
            {localFavItems.length > 0 ? (
              <ul className="space-y-4">
                {localFavItems.map((item) => (
                  <FavProductComponent
                    {...item}
                    key={item.fino}
                    changeFav={changeFav}
                    email={loginState.email}
                    handleDelete={handleDelete}
                    handleSelect={toggleSelectItem}
                    selected={selectedItems.has(item.fino)}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                No favorite products yet.
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
          Please log in to see your favorite products.
        </p>
      )}
    </div>
  );
};

export default ProductComponent;
