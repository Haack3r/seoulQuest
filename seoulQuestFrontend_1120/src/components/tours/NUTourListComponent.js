import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/reviewApi";
import PageComponent from "../common/PageComponent";
import { getListTNU } from "../../api/nuTourApi";
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
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  // New states for search
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("t"); // Default type; adjust based on your needs

  useEffect(() => {
    setFetching(true);
    getListTNU({ page, size, keyword, type })
      .then((data) => {
        if (data && Array.isArray(data.dtoList)) {
            setServerData(data);
          } else {
            setServerData(initState);
          }
          setFetching(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load tour data");
        setFetching(false);
      });
  }, [page, size, refresh, keyword, type]);


  // Handle search submission
  const handleSearch = () => {
    // Trigger a refresh with new keyword
    setFetching(true);
    getListTNU({ page: 1, size, keyword, type })
      .then((data) => {
        if (data && Array.isArray(data.dtoList)) {
          setServerData(data);
        } else {
          setServerData(initState);
        }
        setFetching(false);
      })
      .catch((err) => {
        setFetching(false);
      });
  };

  return (
    <div className="py-12">
      <section className="px-4 max-w-5xl mx-auto mb-1">
        <h2 className="mb-10 text-3xl font-bold uppercase text-center text-gray-800 tracking-widest">
          Curated Experiences
        </h2>

        {/* Search Input */}
        <div className="mt-8 flex justify-center mb-8">
          <div className="flex w-full max-w-2xl bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
            <Input
              placeholder="Search experiences..."
              className="flex-grow border-0 focus:ring-0 text-lg px-6"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {serverData.dtoList.map((tour) => (
            <div
              key={tour.tno}
              className="flex flex-col items-center transition-transform duration-300 cursor-pointer group"
              onClick={() => moveToRead(tour.tno)}
            >
              {/* Card Frame with Unified Hover Effect */}
              <div className="relative w-[320px] h-[430px] rounded-lg border border-white border-opacity-40 p-4 bg-opacity-20 backdrop-blur-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg">
                {/* Image with Overlay */}
                <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center opacity-80 transition-opacity duration-300 group-hover:opacity-90"
                    style={{
                      backgroundImage: `url(${host}/api/tours/view/s_${tour.uploadFileNames[0]})`,
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
                </div>

                {/* Text and Button Area */}
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

      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
};

export default NUTourListComponent;
