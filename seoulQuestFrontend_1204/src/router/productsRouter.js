import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Loading = <div>Loading...</div>;
const ProductsList = lazy(() => import("../pages/products/ListPage"));
const ProductsAdd = lazy(() => import("../pages/products/AddPage"));
const ProductRead = lazy(() => import("../pages/products/ReadPage"));
const ProductModify = lazy(() => import("../pages/products/ModifyPage"));
const ProductOrder = lazy(() => import("../pages/products/OrderPage"));

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const MotionWrapper = ({ children }) => (
  <AnimatePresence mode="wait">
    <motion.div
      style={{ position: "relative", width: "100%" }} // Prevent layout interference
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

const productsRouter = () => [
  {
    path: "list",
    element: (
      <MotionWrapper>
        <Suspense fallback={Loading}>
          <ProductsList />
        </Suspense>
      </MotionWrapper>
    ),
  },
  {
    path: "",
    element: <Navigate replace to="/user/products/list" />,
  },
  {
    path: "add",
    element: <Suspense fallback={Loading}><ProductsAdd /></Suspense>,
  },
  {
    path: "read/:pno", // Exclude MotionWrapper here
    element: <Suspense fallback={Loading}><ProductRead /></Suspense>,
  },
  {
    path: "modify/:pno",
    element: <Suspense fallback={Loading}><ProductModify /></Suspense>,
  },
  {
    path: "order",
    element: <Suspense fallback={Loading}><ProductOrder /></Suspense>,
  },
];

export default productsRouter;
