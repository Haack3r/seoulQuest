import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'

const Loading = <div><SyncLoader /></div>
const ProductReviewList = lazy(() => import("../pages/productsReview/ListPage"))
const ProductReviewAdd = lazy(() => import("../pages/productsReview/AddPage"))
const ProductReviewRead = lazy(() => import("../pages/productsReview/ReadPage"))
const ProductReviewModify = lazy(() => import("../pages/productsReview/ModifyPage"))

const productReviewRouter = () => {
  return [
    {
      path: "list",
      element: <Suspense fallback={Loading}><ProductReviewList /></Suspense>
    },
    {
      path: "",
      element: <Navigate replace to="list" />
      // redirect
    },
    {
      path: "add",
      element: <Suspense fallback={Loading}><ProductReviewAdd /></Suspense>
    },
    {
      path: "read/:pno",
      element: <Suspense fallback={Loading}><ProductReviewRead /></Suspense>
    },
    {
      path: "modify/:pno",
      element: <Suspense fallback={Loading}><ProductReviewModify /></Suspense>
    }
  ]
}

export default productReviewRouter