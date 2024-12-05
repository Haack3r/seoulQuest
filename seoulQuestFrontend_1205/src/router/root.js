import { lazy, Suspense } from "react";
import { SyncLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import productsRouter from "./productsRouter";
import memberRouter from "./memberRouter";
import toursRouter from "./toursRouter";
import nuProductsRouter from "./nuProductsRouter";
import nuToursRouter from "./nuToursRouter";
import myPageRouter from "./myPageRouter";
import { Alert } from "@mui/material";
import adminRouter from "./admin/adminRouter";
import { createBrowserRouter, useLocation, RouterProvider } from "react-router-dom";

const Loading = <div><SyncLoader /></div>;

// MainPage 로딩 지연
const Main = lazy(() => import("../pages/MainPage"));
const About = lazy(() => import("../pages/AboutSCQ"));
const ProductsIndex = lazy(() => import("../pages/products/IndexPage"));
const NUProductsIndex = lazy(() => import("../pages/products/NUIndexPage"));
const ToursIndex = lazy(() => import("../pages/tours/TourIndexPage"));
const NUToursIndex = lazy(() => import("../pages/tours/NUTourIndexPage"));
const Cart = lazy(() => import("../pages/Cart"));
const Favorite = lazy(() => import("../pages/Favorite"));
const Coupon = lazy(() => import("../pages/member/CouponPage"));
const Contact = lazy(() => import("../pages/ContactPage"));

// Animation variants for transitions
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const MotionWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
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
};

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <MotionWrapper>
        <Suspense fallback={Loading}>
          <Main />
        </Suspense>
      </MotionWrapper>
    ),
  },
  {
    path: "about",
    element: (
      <MotionWrapper>
        <Suspense fallback={Loading}>
          <About />
        </Suspense>
      </MotionWrapper>
    ),
  },
  {
    path: "contact",
    element: (
      <MotionWrapper>
        <Suspense fallback={Loading}>
          <Contact />
        </Suspense>
      </MotionWrapper>
    ),
  },
  {
    path: "cart",
    element: (
      <MotionWrapper>
        <Suspense fallback={Loading}>
          <Cart />
        </Suspense>
      </MotionWrapper>
    ),
  },
  {
    path: "favorite",
    element: (
      <MotionWrapper>
        <Suspense fallback={Loading}>
          <Favorite />
        </Suspense>
      </MotionWrapper>
    ),
  },
  {
    path: "user/products",
    element: (
        <Suspense fallback={Loading}>
          <ProductsIndex />
        </Suspense>
    ),
    children: productsRouter(),
    },
  {
    path: "products",
    element: (
      
        <Suspense fallback={Loading}>
          <NUProductsIndex />
        </Suspense>
      
    ),
    children: nuProductsRouter(),     
  },
  {
    path: "user/tours",
    element: (
        <Suspense fallback={Loading}>
          <ToursIndex />
        </Suspense>
    ),
    children: toursRouter(), 

  },
  {
    path: "tours",
    element: (
        <Suspense fallback={Loading}>
          <NUToursIndex />
        </Suspense>
    ),
    children: nuToursRouter(), 
  },
  {
    path: "member",
    children: memberRouter(), 
  },
  {
    path: "mypage",
    children: myPageRouter(), 
  },
  {
    path: "admin",
    children: adminRouter(), 
    errorElement: <Alert severity="error">오류가 발생했습니다.</Alert>,
  },
  {
    path: "coupon",
    element: (
      <MotionWrapper>
        <Suspense fallback={Loading}>
          <Coupon />
        </Suspense>
      </MotionWrapper>
    ),
  },
]);

export default root;

