import React, { useEffect, useState } from "react";
import useCustomMove from "./../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/reviewApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import Button from "../ui/Button";
import { getList } from "../../api/tourApi";
import Input from "../ui/Input"; // Assuming you have an Input component
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
  const { loginState } = useCustomLogin();
  const { favItems, changeFav, deleteFav, refreshFav } = useCustomTourFav();

  // Refresh favorites on component mount
  useEffect(() => {
    refreshFav();
  }, []);

  // New states for search
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("t");

  // Handle search submission
  const handleSearch = () => {
    setFetching(true);
    getList({ page: 1, size, keyword, type })
      .then((data) => {
        setServerData(data && Array.isArray(data.dtoList) ? data : initState);
        setFetching(false);
      })
      .catch((err) => {
        exceptionHandle(err);
        setFetching(false);
      });
  };

  // Toggle favorite status
  const handleToggleFavorite = async (tour) => {
    if (!loginState.email) {
      window.alert("Please log in to manage favorites.");
      return;
    }

    const isFavorite = favItems.some((item) => item.tno === tour.tno);

    if (isFavorite) {
      const favoriteItem = favItems.find((item) => item.tno === tour.tno);
      await deleteFav(favoriteItem.fino);
    } else {
      await changeFav({ email: loginState.email, tno: tour.tno });
    }
  };

  // Fetch tour list on mount and whenever dependencies change
  useEffect(() => {
    setFetching(true);
    getList({ page, size, keyword, type })
      .then((data) => {
        setServerData(data && Array.isArray(data.dtoList) ? data : initState);
        setFetching(false);
      })
      .catch((err) => {
        exceptionHandle(err);
        setFetching(false);
      });
  }, [page, size, refresh, keyword, type, favItems]);
    
    

  return (
    <div className="py-12">
      <section className="px-4 max-w-5xl mx-auto mb-1">
        <h2 className="mb-10 text-3xl font-bold uppercase text-center text-gray-800 tracking-widest">
          Curated Experiences
        </h2>

        {/* Search Input */}
        <div className="mt-8 flex justify-center">
          <div className="flex w-full max-w-2xl bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
            <Input
              placeholder="Search experiences..."
              className="flex-grow border-0 focus:ring-0 text-lg py-6 px-6"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button
              className="bg-orange-800 hover:bg-rose-700 text-white font-medium tracking-wide py-6 px-6 rounded-r-full"
              onClick={handleSearch}
            >
              <SearchIcon className="h-5 w-5 mr-2" />
              Explore
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-10">
          {serverData.dtoList && serverData.dtoList.length > 0 ? (
            serverData.dtoList.map((tour) => {
              const isFavorite = favItems.some((item) => item.tno === tour.tno);
              return (
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
                      <button
                        className={`hover:text-gray-500 ${
                          isFavorite ? "text-gray-500 fill-current" : "text-white"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(tour);
                        }}
                      >
                        <HeartIcon
                          className={`mr-2 h-4 w-4 ${
                            isFavorite ? "fill-current" : ""
                          }`}
                        />
                      </button>
                      <button className="px-6 py-2 bg-white bg-opacity-50 text-black font-semibold rounded-lg text-sm transition-all duration-300 hover:bg-opacity-80 hover:shadow-md">
                        Reserve
                      </button>
                    </div>
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
