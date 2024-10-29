import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import { getListTNU } from "../../api/nuTourApi";


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

  useEffect(() => {
    setFetching(true);

    getListTNU({ page, size })
      .then((data) => {
        setServerData(data);
        setFetching(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load product data");
        setFetching(false);
      });
  }, [page, size, refresh]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (fetching) {
    return <FetchingModal />;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10" style={{ backgroundColor: "#f5f1e9" }}>
      <section className="px-6 max-w-6xl mx-auto">
        <h2 className="mb-12 text-4xl font-semibold text-center text-gray-800 tracking-wide">
          Curated Cultural Experiences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {serverData.dtoList.map((tour) => (
            <div
              key={tour.tno}
              className="relative flex flex-col items-center bg-white shadow-lg transition-transform duration-300 cursor-pointer"
              onClick={() => moveToRead(tour.tno)}
              style={{
                width: "340px", // Wider polaroid size
                height: "360px", // Taller for polaroid look
                padding: "16px", // Inner padding for polaroid feel
              }}
            >
              {/* Pin Element */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-4 h-4 bg-red-500 rounded-full shadow-md z-20"></div>

              {/* Polaroid Image with Gradient Overlay */}
              <div className="relative w-full h-48 mb-4 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition duration-300 group-hover:brightness-110"
                  style={{
                    backgroundImage: `url(${host}/api/tours/view/s_${tour.uploadFileNames[0]})`,
                  }}
                ></div>
                {/* Bright Light Effect Overlay */}
                <div className="absolute inset-0 "></div>
              </div>

              {/* Bottom White Area for "Handwritten" Title */}
              <div className="flex flex-col items-center justify-start bg-white w-full h-28 pt-4" style={{ borderTop: "1px solid #eaeaea" }}>
                <h3 className="text-lg font-bold text-gray-800 mb-1" style={{ fontFamily: "'Patrick Hand', cursive", letterSpacing: '1px' }}>
                  {tour.tname}
                </h3>
                <p className="text-md font-medium text-gray-600 mb-3">
                  ₩{tour.tprice} per person
                </p>
                <button className="px-4 py-1 bg-gray-800 text-white font-medium rounded-md text-sm transition hover:bg-gray-900">
                  Reserve Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination Component */}
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
};

export default NUTourListComponent;
