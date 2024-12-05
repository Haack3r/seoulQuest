import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SyncLoader } from 'react-spinners';

// Animation variants for the page transition
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// MotionWrapper Component
const MotionWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const myPageRouter = () => {
  const Loading = <div><SyncLoader /></div>;
  const MyPage = lazy(() => import("../pages/mypage/MyPage"));
  const EditProfilePage = lazy(() => import("../pages/mypage/EditProfilePage"));
  const ReviewPage = lazy(() => import("../pages/mypage/ReviewPage"));
  const OrderPage = lazy(() => import("../pages/mypage/OrderPage"));
  const BookingPage = lazy(() => import("../pages/mypage/BookingPage"));

  return [
    {
      path: "myprofile",
      element: (
        <MotionWrapper>
          <Suspense fallback={Loading}>
            <MyPage />
          </Suspense>
        </MotionWrapper>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/mypage/myprofile" />,
    },
    {
      path: "editprofile",
      element: (
        <MotionWrapper>
        <Suspense fallback={Loading}>
          <EditProfilePage />
        </Suspense>
        </MotionWrapper>
      ),
    },
    {
      path: "orders",
      element: (
        <MotionWrapper>
        <Suspense fallback={Loading}>
          <OrderPage />
        </Suspense>
        </MotionWrapper>
      ),
    },
    {
      path: "bookings",
      element: (
        <MotionWrapper>
        <Suspense fallback={Loading}>
          <BookingPage />
        </Suspense>
        </MotionWrapper>
      ),
    },
    {
      path: "review",
      element: (
        <MotionWrapper>
        <Suspense fallback={Loading}>
          <ReviewPage />
        </Suspense>
        </MotionWrapper>
      ),
    },
  ];
};

export default myPageRouter;
