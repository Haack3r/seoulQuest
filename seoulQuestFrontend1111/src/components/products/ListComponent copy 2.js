import React, { useEffect, useState } from "react";
import useCustomMove from "./../../hooks/useCustomMove";
import { getList } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import Button from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
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

  //for FetchingModal
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

  return (
    <div >
      {fetching ? <FetchingModal /> : null}

      {/* 카드 섹션 */}
      <section className="px-4 py-12 max-w-6xl mx-auto">
        <h2 className="mb-8 text-3xl font-semibold text-center text-gray-800 tracking-wide uppercase">
          Our Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {serverData.dtoList && serverData.dtoList.length > 0 ? (
            serverData.dtoList.map((product) => (
              <Card
                key={product.pno}
                onClick={() => moveToRead(product.pno)}
                className="relative w-full h-[280px] rounded-lg overflow-hidden bg-white shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer group"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                    alt={product.pname}
                    className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <CardTitle className="text-lg font-semibold">
                      {product.pname}
                    </CardTitle>
                    <CardDescription className="text-sm font-light">
                      ${product.pprice.toLocaleString()}
                    </CardDescription>
                  </div>
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

export default ListComponent;
