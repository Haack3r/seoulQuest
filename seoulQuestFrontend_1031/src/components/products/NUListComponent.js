import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import { Card, CardTitle, CardDescription } from "../ui/Card";
import Button from "../ui/Button";
import { getListNU } from "../../api/nuProductApi";
import "../../Product.css";

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

const NUListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    getListNU({ page, size })
      .then((data) => {
        console.log("API Response:", data);
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
      <section className="px-4 max-w-6xl mx-auto">
        <h2 className="mb-12 text-4xl font-bold text-center text-gray-800 tracking-wide uppercase">
          Artisan Treasures
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {serverData.dtoList && serverData.dtoList.length > 0 ? (
            serverData.dtoList.map((product) => (
              <Card
                key={product.pno}
                onClick={() => moveToRead(product.pno)}
                className="relative w-[320px] h-[430px] rounded-lg overflow-hidden bg-white border border-white border-opacity-40 p-4 bg-opacity-20 backdrop-blur-lg transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-lg cursor-pointer"
              >
                <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
                  <img
                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                    alt={product.pname}
                    className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center text-center text-white uppercase tracking-wider">
                  <CardTitle className="text-lg font-semibold mb-1">
                    {product.pname}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium mb-2 opacity-90">
                    ${product.pprice.toLocaleString()}
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="px-6 py-2 mt-4 bg-white bg-opacity-50 text-black font-semibold rounded-lg text-sm transition-all duration-300 hover:bg-opacity-80 hover:shadow-md"
                  >
                    Add to Collection
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </div>
      </section>

      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
};

export default NUListComponent;
