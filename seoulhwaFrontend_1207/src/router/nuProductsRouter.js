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

const nuProductsRouter = () => {

  const Loading = <div>Loading...</div>
  const NUProductsList = lazy(() => import("../pages/products/NUListPage"))
  const NUProductRead = lazy(() => import("../pages/products/NUReadPage"))


  return [
    {
      path: "list",
      element: (
        <MotionWrapper>
          <Suspense fallback={Loading}>
            <NUProductsList />
          </Suspense>
        </MotionWrapper>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/products/list" />
    },
    {
      path: "read/:pno",
      element: <Suspense fallback={Loading}><NUProductRead /></Suspense>
    }
  ]
}

export default nuProductsRouter