import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/reviewApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import Button from "../ui/Button";
import { getList, getTourCategories } from "../../api/tourApi"; // Fetch categories
import Input from "../ui/Input";
import { HeartIcon, SearchIcon } from "lucide-react";
import useCustomTourFav from "../../hooks/useCustomTourFav";

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

const TourListComponent = () => {
  const { exceptionHandle } = useCustomLogin();
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const { isLogin, loginState } = useCustomLogin();
  const email = loginState.email; // Get email from login state
  const { favItems, changeFav, deleteFav, refreshFav } = useCustomTourFav(email);

  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("t");
  const [categories, setCategories] = useState([]); // Store fetched categories
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category

    
    useEffect(() => {
        if (isLogin && email) {
            refreshFav();
        }
  }, [isLogin, email, refreshFav]);

  useEffect(() => {
    // Fetch categories
    getTourCategories()
      .then((data) => setCategories(data))
      .catch((err) => exceptionHandle(err));
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearch = () => {
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

  const handleToggleFavorite = async (tour) => {
    if (!loginState.email) {
      window.alert("Please log in to manage favorites.");
      return;
    }

    const isFavorite = favItems.some((item) => item.tno === tour.tno);

    if (isFavorite) {
      const favoriteItem = favItems.find((item) => item.tno === tour.tno);
      await deleteFav(favoriteItem.ftino);
    } else {
      await changeFav({ email: loginState.email, tno: tour.tno });
    }
  };

  useEffect(() => {
    setFetching(true);
    getList({ page, size, keyword, type, category: selectedCategory })
      .then((data) => {
        setServerData(data && Array.isArray(data.dtoList) ? data : initState);
        setFetching(false);
      })
      .catch((err) => {
        exceptionHandle(err);
        setFetching(false);
      });
  }, [page, size, refresh, keyword, type, favItems, selectedCategory]);

  return (
    <div className="py-20">
      <section className="max-w-5xl mx-auto">
        <h2 className="mb-10 text-2xl font-bold uppercase text-center text-gray-700 tracking-wide">
          Explore Curated Tours
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
            {categories.map((categoryName, index) => (
              <option key={index} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <div className="flex w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
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

        {/* Tour Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
          {serverData.dtoList && serverData.dtoList.length > 0 ? (
            serverData.dtoList.map((tour) => {
              const isFavorite = favItems.some((item) => item.tno === tour.tno);
              return (
                <div
                  key={tour.tno}
                  className="flex flex-col items-center text-center"
                  onClick={() => moveToRead(tour.tno)}
                >
                  {/* Image with Heart Icon */}
                  <div className="relative w-full max-w-xs h-52 overflow-hidden">
                    <img
                      src={`${host}/api/tours/view/s_${tour.uploadFileNames[0]}`}
                      alt={tour.tname}
                      className="w-full h-full object-cover opacity-80 hover:opacity-90"
                    />
                    <button
                      className={`absolute top-2 right-2 ${
                        isFavorite ? "text-red-500" : "text-white"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(tour);
                      }}
                    >
                      <HeartIcon
                        className={`h-6 w-6 ${
                          isFavorite ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {/* Tour Details */}
                  <div className="mt-4">
                    <p className="text-xs text-gray-500">{tour.categoryName}</p>
                    <h3 className="text-md font-bold text-gray-600">
                      {tour.tname}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">₩{tour.tprice}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No tours available.</p>
          )}
        </div>
      </section>

      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
};

export default TourListComponent;
