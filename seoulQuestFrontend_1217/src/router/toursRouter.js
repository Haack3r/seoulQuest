import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';

// Animation wrapper for routes requiring transitions
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const MotionWrapper = ({ children }) => (
  <AnimatePresence mode="wait">
    <motion.div
      style={{ position: "relative", width: "100%" }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

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
        <MotionWrapper>
          <Suspense fallback={Loading}>
            <ToursList />
          </Suspense>
        </MotionWrapper>
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
