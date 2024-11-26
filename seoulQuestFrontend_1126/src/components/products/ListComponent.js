import React, { useEffect, useState } from "react";
import useCustomMove from "./../../hooks/useCustomMove";
import { getList, getProductCategories } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import Button from "../ui/Button";
import useCustomFav from "../../hooks/useCustomFav";
import { HeartIcon, SearchIcon } from "lucide-react";
import { Input } from "antd";

const host = API_SERVER_HOST;

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

const ListComponent = () => {
  const [serverData, setServerData] = useState(initState);
  const { exceptionHandle } = useCustomLogin();
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const { loginState } = useCustomLogin();
  const { favItems, changeFav, deleteFav, refreshFav } = useCustomFav();
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("t");
  const [fetching, setFetching] = useState(false);
  const [categories, setCategories] = useState([]); // Store fetched categories
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category


  useEffect(() => {
    refreshFav();
  }, []);

  useEffect(() => {
    // Fetch categories
    getProductCategories()
      .then((data) => {
        if (data && Array.isArray(data)) {
          setCategories(data);
        } else {
          console.log("No categories found");
          setCategories([]);
        }
      })
      .catch((err) => {
        exceptionHandle(err);
        setCategories([]);
      });
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleToggleFavorite = async (product) => {
    if (!loginState.email) {
      window.alert("Please log in to manage favorites.");
      return;
    }

    const isFavorite = favItems.some((item) => item.pno === product.pno);

    if (isFavorite) {
      const favoriteItem = favItems.find((item) => item.pno === product.pno);
      await deleteFav(favoriteItem.fino);
    } else {
      await changeFav({ email: loginState.email, pno: product.pno });
    }
  };

  useEffect(() => {
    setFetching(true);
    getList({ page, size, keyword, type, category: selectedCategory })
      .then((data) => {
        if (data && Array.isArray(data.dtoList)) {
          setServerData(data);
        } else {
          setServerData(initState);
        }
        setFetching(false);
      })
      .catch((err) => {
        exceptionHandle(err);
        setFetching(false);
      });
  }, [page, size, refresh, keyword, type, favItems, selectedCategory]);

  const handleSearch = () => {
    moveToList(1);
    setFetching(true);
    getList({ page: 1, size, keyword, type, category: selectedCategory })
      .then((data) => {
        setServerData(data && Array.isArray(data.dtoList) ? data : initState);
        setFetching(false);
      })
      .catch((err) => {
        exceptionHandle(err);
        setFetching(false);
      });
  };

  return (
    <div className="py-12">
      <section className="px-4 max-w-6xl mx-auto">
        <h2 className="mb-10 text-3xl font-bold text-center text-gray-800 tracking-wide uppercase">
          Artisan Treasures
        </h2>

        {/* Search Bar with Category Dropdown */}
        <div className="mt-8 flex justify-center items-center space-x-4">
          {/* Dropdown for Categories */}
          <select
            className="bg-white border border-gray-300 rounded-lg p-3 text-sm"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {/* {categories.map((categoryName, index) => ( */}
            {categories.length > 0 && categories.map((categoryName, index) => (
              <option key={index} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <div className="flex w-full h-12 max-w-xl bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <Input
              placeholder="Search experiences..."
              className="flex-grow border-0 focus:ring-0 text-lg py-6 px-6"
              value={keyword}
              onChange={(e) => {
                console.log("Keyword updated:", e.target.value);
                setKeyword(e.target.value);
              }}
            />

            <Button
              className="hidden sm:flex bg-orange-800 hover:bg-orange-700 text-white font-medium tracking-wide py-6 "
              onClick={handleSearch}
            >
              <SearchIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {serverData.dtoList && serverData.dtoList.length > 0 ? (
            serverData.dtoList.map((product) => {
              const isFavorite = favItems.some(
                (item) => item.pno === product.pno
              );

              return (
                <div
                  key={product.pno}
                  className="flex flex-col items-center"
                  onClick={() => moveToRead(product.pno)}
                >
                  {/* Product Image */}
                  <div className="relative w-56 h-80 overflow-hidden">
                    <p className="py-1 text-gray-700 text-xs text-left">
                      {product.categoryName}
                    </p>
                    <img
                      src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                      alt={product.pname}
                      className="w-full h-full object-cover opacity-80 hover:opacity-90"
                    />
                    <button
                      className={`absolute top-8 right-2 ${isFavorite ? "text-red-500" : "text-white"
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(product);
                      }}
                    >
                      <HeartIcon
                        className={`h-6 w-6 ${isFavorite ? "fill-current" : ""
                          }`}
                      />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="w-56 text-left mt-2">
                    {" "}
                    {/* Width matches the image */}
                    <span className="block text-sm font-bold text-gray-700">
                      {product.pname}
                    </span>
                    <span className="block text-sm text-gray-500">
                      ₩{product.pprice.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products available.
            </p>
          )}
        </div>
      </section >

      <PageComponent serverData={serverData} movePage={moveToList} />
    </div >
  );
};

export default ListComponent;
