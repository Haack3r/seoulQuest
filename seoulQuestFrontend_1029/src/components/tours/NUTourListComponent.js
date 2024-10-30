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
    <div className="py-12">
      <section className="px-4 max-w-5xl mx-auto mb-16">
        <h2 className="mb-10 text-3xl font-bold uppercase text-center text-gray-800 tracking-widest">
          Curated Experiences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
          {serverData.dtoList.map((tour) => (
            <div
              key={tour.tno}
              className="flex flex-col items-center transition-transform duration-300 cursor-pointer group"
              onClick={() => moveToRead(tour.tno)}
            >
              {/* Outer Frame */}
              <div className="relative w-[320px] h-[360px] rounded-lg border border-white border-opacity-40 p-4 bg-opacity-20 backdrop-blur-lg">
                {/* Image with Black Overlay */}
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
                  <button className="px-6 py-2 mt-4 bg-white bg-opacity-50 text-black font-semibold rounded-lg text-sm transition-opacity duration-300 hover:bg-opacity-80 ">
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
