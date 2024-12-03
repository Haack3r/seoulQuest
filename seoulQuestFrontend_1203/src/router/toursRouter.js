import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const toursRouter = () => {
  const Loading = <div>Loading...</div>;
  const ToursList = lazy(() => import("../pages/tours/TourListPage"));
  const ToursRead = lazy(() => import("../pages/tours/TourReadPage"));
  const ToursAdd = lazy(() => import("../pages/tours/TourAddPage"));
  const ToursModify = lazy(() => import("../pages/tours/TourModifyPage"));
  const TourBook = lazy(()=> import("../pages/tours/TourBookPage"));

  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ToursList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="list" />,
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <ToursAdd />
        </Suspense>
      ),
    },
    {
      path: "read/:tno",
      element: (
        <Suspense fallback={Loading}>
          <ToursRead />
        </Suspense>
      ),
    },
    {
      path: "modify/:tno",
      element: (
        <Suspense fallback={Loading}>
          <ToursModify />
        </Suspense>
      ),
    },
    {
      path: "book",
      element: <Suspense fallback={Loading}><TourBook /></Suspense>
    },
  ];
};

export default toursRouter;
