import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
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

const nuToursRouter = () => {
    
  const Loading = <div>Loading...</div>
  const NUToursList = lazy(() => import("../pages/tours/NUTourListPage"))
  const NUToursRead = lazy(() => import("../pages/tours/NUTourReadPage"))

  return [
    {
      path: "list",
      element: (
        <MotionWrapper>
          <Suspense fallback={Loading}>
            <NUToursList />
          </Suspense>
        </MotionWrapper>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/tours/list" />
    },
    {
      path: "read/:tno",
      element: <Suspense fallback={Loading}><NUToursRead /></Suspense>
    },
  ]
}

export default nuToursRouter