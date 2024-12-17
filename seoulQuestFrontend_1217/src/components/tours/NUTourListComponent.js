import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/reviewApi";
import PageComponent from "../common/PageComponent";
import { getListTNU, getTourCategoriesTNU } from "../../api/nuTourApi";
import { SearchIcon } from "lucide-react";
import { Button, Input } from "antd";

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

const NUTourListComponent = () => {
  const { page, size, refresh, moveToList, moveToTourReadNU } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  // New states for search
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("t");
  const [categories, setCategories] = useState([]); // Store fetched categories
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category

  useEffect(() => {
    // Fetch categories
    getTourCategoriesTNU()
      .then((data) => {
        if (data && Array.isArray(data)) {
          setCategories(data);
        } else {
          console.log("No categories found");
          setCategories([]);
        }
      })
      .catch(() => {
        setCategories([]);
      });
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearch = () => {
    setFetching(true);
    getListTNU({ page: 1, size, keyword, type, category: selectedCategory })
      .then((data) => {
        setServerData(data && Array.isArray(data.dtoList) ? data : initState);
        setFetching(false);
      })
      .catch(() => {
        setFetching(false);
      });
  };

  useEffect(() => {
    setFetching(true);
    getListTNU({ page, size, keyword, type, category: selectedCategory })
      .then((data) => {
        setServerData(data && Array.isArray(data.dtoList) ? data : initState);
        setFetching(false);
      })
      .catch(() => {
        setFetching(false);
      });
  }, [page, size, refresh, keyword, type, selectedCategory]);


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
            className="flex-grow border-0 focus:ring-0 text-lg px-6"
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
            return (
              <div
                key={tour.tno}
                className="flex flex-col items-center text-center"
                onClick={() => moveToTourReadNU(tour.tno)}
              >
                {/* Image with Heart Icon */}
                <div className="relative w-full max-w-xs h-52 overflow-hidden">
                  <img
                    src={`${host}/api/tours/view/${tour.uploadFileNames[0]}`}
                    alt={tour.tname}
                    className="w-full h-full object-cover opacity-80 hover:opacity-90"
                  />
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

export default NUTourListComponent;
