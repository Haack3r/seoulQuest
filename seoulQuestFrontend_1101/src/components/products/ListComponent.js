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
  CardFooter,
  CardHeader,
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
        console.log("Fetched data:", data); // Log the data to inspect its structure
        if (data && Array.isArray(data.dtoList)) {
          setServerData(data);
        } else {
          console.error("Unexpected data structure:", data);
          setServerData(initState); // Fallback to initial state if data is incorrect
        }
        setFetching(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        exceptionHandle(err);
        setFetching(false); // Reset fetching state on error
      });
  }, [page, size, refresh]);

  //   useEffect(() => {
  //     setFetching(true)

  //     getList({ page, size }).then(data => {
  //         console.log(data)
  //         setServerData(data)
  //         setFetching(false)
  //     }).catch(err => exceptionHandle(err))
  // }, [page, size, refresh])

  return (
    <div className="mt-10 mr-2 ml-2">
      {/* 로딩중 모달 */}
      {fetching ? <FetchingModal /> : <></>}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-4xl font-bold text-center text-gray-900 tracking-wide">
            Artisan Treasures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {serverData.dtoList.map((product) => (
              <Card
                key={product.pno}
                onClick={() => moveToRead(product.pno)}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-white group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`${host}/api/user/products/view/s_${product.uploadFileNames[0]}`}
                    alt={product.pname}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-center">
                      <CardTitle className="text-lg font-semibold tracking-wide text-white">
                        {product.pname}
                      </CardTitle>
                      <CardDescription className="font-medium text-rose-400">
                        ₩{product.pprice.toLocaleString()}
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
            ))}
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

export default ListComponent;
