import React, { useEffect, useState } from "react";
import useCustomMove from "./../../hooks/useCustomMove";

import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import Button from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { getList } from "../../api/tourApi";

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

const TourListComponent = () => {
  const { exceptionHandle } = useCustomLogin();
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [role, setRole] = useState(null);

  //for FetchingModal
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // user 객체 가져오기
    if (user && user.role && Array.isArray(user.role)) {
      if (user.role[1]) setRole("ADMIN"); // role 배열에서 첫 번째 값을 가져옴
      else setRole("USER");
    }
    setFetching(true);
    getList({ page, size })
      .then((data) => {
        console.log("API Response:", data); // Check the structure of data
        if (!data || !data.dtoList) {
          throw new Error("Invalid data structure");
        }
        setServerData(data);
        setFetching(false);
        console.log("role", role);
      })
      .catch((err) => {
        console.error(err); // Log any errors
        exceptionHandle(err);
      });
  }, [page, size, refresh]);
  return (
    <div className="border-2 border-blue-100 mr-2 ml-2">
      롤{role}
      {/* 로딩중 모달 */}
      {fetching ? <FetchingModal /> : <></>}
      {/* {role.length > 1 ? <FetchingModal /> : <>사랑</>} */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-4xl font-bold text-center text-gray-900 tracking-wide">
            Curated Cultural Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {serverData.dtoList.map((tour) => (
              <Card
                key={tour.tno}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-white group"
                onClick={() => moveToRead(tour.tno)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`${host}/api/user/tours/view/s_${tour.uploadFileNames[0]}`}
                    alt={tour.pname}
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
                  <Button className="w-full bg-gray-900 hover:bg-gray-200 text-white hover:text-gray-900 hover:font-bold font-medium tracking-wide">
                    Reserve Now
                  </Button>
                </CardContent>
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

export default TourListComponent;
