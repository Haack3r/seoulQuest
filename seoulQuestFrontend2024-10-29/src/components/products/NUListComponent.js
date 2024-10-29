import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";

import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import Button from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { getListNU } from "../../api/nuProductApi";


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
  const [error, setError] = useState(null); // Error handling state

  //for FetchingModal
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    getListNU({ page, size })
      .then(data => {
        console.log("API Response:", data);
        setServerData(data);
        setFetching(false); // Stop loading after success
      })
      .catch(err => {
        console.error("API Error:", err);
        setError("Failed to load product data"); // Set error state
        setFetching(false); // Stop loading after error
      });
  }, [page, size, refresh]);
  // Render error if present
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render loading modal
  if (fetching) {
    return <FetchingModal />;
  }


  return (
    <div className="mt-10 mr-2 ml-2">
      {/* 로딩중 모달 */}
      {fetching ? <FetchingModal /> : <></>}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-4xl font-bold text-center text-gray-900 tracking-wide">
            Artisan Treasures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {serverData.dtoList && serverData.dtoList.length > 0 ? (
            serverData.dtoList.map((product) => (
              <Card
                key={product.pno}
                onClick={() => moveToRead(product.pno)}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-white group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                    alt={product.pname}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-center">
                      <CardTitle className="text-lg font-semibold tracking-wide text-white">
                        {product.pname}
                      </CardTitle>
                      <CardDescription className="font-medium text-rose-400">
                        {product.pprice}
                      </CardDescription>
                      <Button
                        variant="outline"
                        className="mt-2 text-white hover:text-gray-900 hover:bg-white font-medium tracking-wide border-white"
                      >
                        Add to Collection
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              ))
            ) : (
              <p>No products available.</p> // Show this message when dtoList is empty
            )}
            
          </div>
        </div>
      </section>

      {/* page list */}
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default NUListComponent;
