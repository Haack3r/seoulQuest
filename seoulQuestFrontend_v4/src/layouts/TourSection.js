import React, { useEffect, useState } from "react";
import useCustomMove from "../hooks/useCustomMove";

import FetchingModal from "../components/common/FetchingModal";
import { API_SERVER_HOST } from "../api/todoApi";
// import useCustomLogin from '../hooks/useCustomLogin';
import Button from "../components/ui/Button";
import {Card,CardContent,CardDescription,CardHeader,CardTitle,} from "../components/ui/Card";
import { getListTourForMain } from "../api/nuTourApi";
import {useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

  //   const { exceptionHandle } = useCustomLogin()
  const { page, size, refresh, moveToList, moveToReadTourFromMain } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  //for FetchingModal
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    getListTourForMain({ page, size }).then((data) => {
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
          <div className="flex w-full items-stretch mb-12 justify-between">
            <h2 className="text-4xl font-bold text-center text-gray-900 tracking-wide">
              Curated Cultural Experiences
            </h2>
            {/* tourlist 페이지로 가는 버튼 추가 */}
            <Button className="text-2xl text-center text-gray-900 hover:bg-gray-100 "
                    onClick={() => navigate({pathname: `/tours/list`})}>
                      View More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serverData.dtoList.map((tour) => (
              <Card
                key={tour.tno}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-white group"
                onClick={() => moveToReadTourFromMain(tour.tno)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`${host}/api/products/view/s_${tour.uploadFileNames[0]}`}
                    alt={tour.tname}
                    className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-semibold tracking-wide text-gray-900">
                    {tour.tname}
                  </CardTitle>
                  <CardDescription className="font-medium text-rose-600">
                    ₩{tour.tprice} per person
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gray-900 hover:bg-gray-200 text-white hover:text-gray-900 hover:font-bold font-medium tracking-wide"
                    onClick={() => moveToReadTourFromMain(tour.tno)}        
                  >
                    Learn More
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
