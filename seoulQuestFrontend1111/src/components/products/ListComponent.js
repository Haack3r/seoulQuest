import React, { useEffect, useState } from "react";
import useCustomMove from "./../../hooks/useCustomMove";
import { getList } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import {
  CardTitle,
  CardDescription,
} from "../ui/Card";

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
  const { exceptionHandle } = useCustomLogin();
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  // Fetching Modal
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    getList({ page, size })
      .then((data) => {
        if (data && Array.isArray(data.dtoList)) {
          setServerData(data);
        } else {
          console.error("Unexpected data structure:", data);
          setServerData(initState); 
        }
        setFetching(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        exceptionHandle(err);
        setFetching(false);
      });
  }, [page, size, refresh]);

  // Randomly generate rotation and margin for each product card to create a freeform layout
  const getRandomTransform = () => `rotate(${Math.random() * 4 - 2}deg) translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;

  return (
    <div>
      {fetching ? <FetchingModal /> : null}

      {/* 상단 설명 섹션 */}
      <section className="text-center py-12">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">Our Products</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover our unique and exceptional quality products designed for the modern generation.
        </p>
        <div className="border-t-2 border-gray-300 mx-auto my-4 w-16"></div>
      </section>

      {/* 자유분방한 제품 카드 레이아웃 */}
      <section className="px-4 py-8 max-w-8xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-1">
          {serverData.dtoList && serverData.dtoList.length > 0 ? (
            serverData.dtoList.map((product) => (
              <div
                key={product.pno}
                onClick={() => moveToRead(product.pno)}
                className="cursor-pointer text-center group transform transition-transform duration-300"
                style={{
                  transform: getRandomTransform(),
                  margin: `${Math.random() * 8}px`,
                }}
              >
                {/* 제품 이미지 */}
                <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
                  <img
                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                    alt={product.pname}
                    className="w-3/4 h-full object-contain transition-transform duration-300 transform group-hover:scale-105"
                  />
                </div>

                {/* 제품명과 가격 */}
                <CardTitle className="text-md font-medium text-gray-800 mt-2">
                  {product.pname}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  ${product.pprice.toLocaleString()}
                </CardDescription>
              </div>
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

export default ListComponent;
