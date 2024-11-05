import React, { useEffect, useState } from "react";
import useCustomMove from "./../../hooks/useCustomMove";

import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getList } from "../../api/tourApi";
import TourMap from "../TourMap";
import { getMapByCategory } from "../../api/mapApi";

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
const categories = [
  "All",
  "Nature",
  "Culture/Art/History",
  "Leisure/Sports",
  "Shopping",
  "Cuisine",
];

const TourListComponent = () => {
  const { exceptionHandle } = useCustomLogin();
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [role, setRole] = useState(null);

  // State for fetching status and selected category
  const [fetching, setFetching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [tourMapData, setTourMapData] = useState([]); // Map data for selected category

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user object from localStorage
    if (user && user.role && Array.isArray(user.role)) {
      setRole(user.role[1] ? "ADMIN" : "USER");
    }
    setFetching(true);
    getList({ page, size })
      .then((data) => {
        console.log("API Response:", data);
        if (!data || !data.dtoList) {
          throw new Error("Invalid data structure");
        }
        setServerData(data);
      })
      .catch((err) => {
        console.error(err);
        exceptionHandle(err);
      })
      .finally(() => setFetching(false));
  }, [page, size, refresh]);

  // Handler for category change
  const changeHandler = async (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);

    try {
      const data = newCategory === "All"
        ? await getList({ page, size })
        : await getMapByCategory(newCategory);

      setTourMapData(data?.dtoList || data); // Update map data with new selection
    } catch (error) {
      console.error("Error fetching map data by category:", error);
    }
  };

  return (
    <div className="py-12">
      <div style={{ textAlign: "center" }}>
        <label>Category: </label>
        <select
          value={selectedCategory}
          onChange={changeHandler}
          style={{ padding: "5px", margin: "10px" }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        
        {fetching && <FetchingModal />}
        
        <section className="px-4 max-w-5xl mx-auto mb-1">
          <h2 className="mb-10 text-3xl font-bold uppercase text-center text-gray-800 tracking-widest">
            Curated Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {serverData.dtoList.map((tour) => (
              <div
                key={tour.tno}
                className="flex flex-col items-center transition-transform duration-300 cursor-pointer group"
                onClick={() => moveToRead(tour.tno)}
              >
                <div className="relative w-[320px] h-[430px] rounded-lg border border-white border-opacity-40 p-4 bg-opacity-20 backdrop-blur-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg">
                  <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center opacity-80 transition-opacity duration-300 group-hover:opacity-90"
                      style={{
                        backgroundImage: `url(${host}/api/tours/view/s_${tour.uploadFileNames[0]})`,
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center justify-center text-center text-white uppercase tracking-widest">
                    <h3 className="text-lg font-bold mb-1">{tour.tname}</h3>
                    <p className="text-sm font-medium mb-2 opacity-90">
                      ₩{tour.tprice} per person
                    </p>
                    <button className="px-6 py-2  bg-white bg-opacity-50 text-black font-semibold rounded-lg text-sm transition-all duration-300 hover:bg-opacity-80 hover:shadow-md">
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conditionally render TourMap with selected category data */}
        {selectedCategory && (
          <TourMap data={tourMapData} /> // Pass map data to TourMap
        )}
        
        <PageComponent serverData={serverData} movePage={moveToList} />
      </div>
    </div>
  );
};

export default TourListComponent;
