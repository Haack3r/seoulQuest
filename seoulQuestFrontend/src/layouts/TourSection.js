import React, { useEffect, useState } from "react";
import useCustomMove from "../hooks/useCustomMove";
import { getListForMain } from "../api/productsApi";
import FetchingModal from "../components/common/FetchingModal";
import { API_SERVER_HOST } from "../api/todoApi";
// import useCustomLogin from '../hooks/useCustomLogin';
import Button from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";

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
const TourSection = () => {
  //   const { exceptionHandle } = useCustomLogin()
  const { page, size, refresh, moveToList, moveToReadProductFromMain } =
    useCustomMove();
  const [serverData, setServerData] = useState(initState);

  //for FetchingModal
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    getListForMain({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
      setFetching(false);
    }); //.catch(err => exceptionHandle(err))
  }, [page, size, refresh]);
  return (
    <div className="mt-10 mr-2 ml-2">
      {/* 로딩중 모달 */}
      {fetching ? <FetchingModal /> : <></>}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-4xl font-bold text-center text-gray-900 tracking-wide">
            Curated Cultural Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serverData.dtoList.map((product) => (
              <Card
                key={product.pno}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
                onClick={() => moveToReadProductFromMain(product.pno)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                    alt={product.pname}
                    className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100">
                      Learn More
                    </Button>
                  </div>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-semibold tracking-wide text-gray-900">
                    {product.pname}
                  </CardTitle>
                  <CardDescription className="font-medium text-rose-600">
                    {product.price} per person
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide">
                    Reserve Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TourSection;
