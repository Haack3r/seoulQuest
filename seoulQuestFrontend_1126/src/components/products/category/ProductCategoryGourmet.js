import React, { useState, useEffect } from "react";
import { HeartIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { getList } from "../../../api/productsApi";
import { API_SERVER_HOST } from "../../../api/reviewApi";
import useCustomFav from "../../../hooks/useCustomFav";
import useCustomLogin from "../../../hooks/useCustomLogin";

const host = API_SERVER_HOST;

const ProductCategoryGourmet = () => {
  const [products, setProducts] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [fetching, setFetching] = useState(false);

  const { favItems, changeFav, deleteFav, refreshFav } = useCustomFav();
  const { loginState } = useCustomLogin();

  const category = "Gourmet"; // Category filter
  const itemsPerPage = 4; // Number of items to display at once

  useEffect(() => {
    const fetchProducts = async () => {
      setFetching(true);
      try {
        const response = await getList({
          page: 1,
          size: 100, // Fetch a large number for local pagination
          category,
        });
        setProducts(response.dtoList || []); // Adjust to your API's response structure
      } catch (error) {
        console.error("Error fetching Gourmet products:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchProducts();
    refreshFav(); // Refresh favorite items
  }, [category]);

  const visibleProducts = products.slice(
    visibleIndex,
    visibleIndex + itemsPerPage
  );

  const handleNext = () => {
    if (visibleIndex + itemsPerPage < products.length) {
      setVisibleIndex(visibleIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (visibleIndex - itemsPerPage >= 0) {
      setVisibleIndex(visibleIndex - itemsPerPage);
    }
  };

  const handleToggleFavorite = async (product) => {
    if (!loginState.email) {
      alert("Please log in to manage favorites.");
      return;
    }

    const isFavorite = favItems.some((item) => item.pno === product.pno);

    try {
      if (isFavorite) {
        const favoriteItem = favItems.find((item) => item.pno === product.pno);
        await deleteFav(favoriteItem.fino);
      } else {
        await changeFav({ email: loginState.email, pno: product.pno });
      }
      refreshFav();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-8 max-w-6xl mx-auto mt-10">
      {/* Left Side Large Photo */}
      <div className="w-full lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1720499035742-9d2398ac5eac?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Category Banner"
          className="w-full h-[calc(2*15rem+7rem)] object-cover hidden lg:block opacity-80"
        />
      </div>

      {/* Right Side Products Section */}
      <div className="w-full lg:w-1/2 relative">
        <div className="mb-10 relative">
          {/* Category Header */}
          <div className="px-10 mb-4 text-center">
            <h2 className="text-lg font-bold text-gray-800 uppercase">
              {category} Delights
            </h2>
          </div>

          {fetching ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-2 gap-4">
                {visibleProducts.map((product) => {
                  const isFavorite = favItems.some(
                    (item) => item.pno === product.pno
                  );

                  return (
                    <div
                      key={product.pno}
                      className="relative flex flex-col items-center"
                    >
                      {/* Product Image */}
                      <div className="relative w-48 h-60 overflow-hidden">
                        <img
                          src={`${host}/api/products/view/${product.uploadFileNames?.[0]}`}
                          alt={product.pname}
                          className="w-full h-full object-cover opacity-80 hover:opacity-90"
                        />
                        <button
                          className={`absolute top-2 right-2 ${
                            isFavorite ? "text-red-500" : "text-gray-400"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite(product);
                          }}
                        >
                          <HeartIcon
                            className={`h-6 w-6 ${
                              isFavorite ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Product Details */}
                      <div className="mt-2 text-center">
                        <h3 className="text-sm font-bold text-gray-700">
                          {product.pname}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          ₩{product.pprice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Arrows */}
              <div className="absolute inset-y-0 flex justify-between items-center w-full">
                <button
                  onClick={handlePrev}
                  disabled={visibleIndex === 0}
                  className={`${
                    visibleIndex === 0
                      ? "text-gray-300"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <ChevronLeft className="h-10 w-10" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={visibleIndex + itemsPerPage >= products.length}
                  className={` ${
                    visibleIndex + itemsPerPage >= products.length
                      ? "text-gray-300"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <ChevronRight className="h-10 w-10" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryGourmet;
