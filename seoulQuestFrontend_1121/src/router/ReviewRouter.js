import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'

const Loading = <div><SyncLoader /></div>
const ProductReviewList = lazy(() => import("../pages/productsReview/ListPage"))
const ProductReviewAdd = lazy(() => import("../pages/productsReview/AddPage"))
const ProductReviewRead = lazy(() => import("../pages/productsReview/ReadPage"))
const ProductReviewModify = lazy(() => import("../pages/productsReview/ModifyPage"))
const TourReviewList = lazy(() => import("../pages/toursReview/ListPage"))
const TourReviewAdd = lazy(() => import("../pages/toursReview/AddPage"))
const TourReviewRead = lazy(() => import("../pages/toursReview/ReadPage"))
const TourReviewModify = lazy(() => import("../pages/toursReview/ModifyPage"))

const ReviewRouter = () => {
  return [
    {
      path: "product/list",
      element: <Suspense fallback={Loading}><ProductReviewList /></Suspense>
    },
    {
      path: "",
      element: <Navigate replace to="/review/product/list" />
    },
    {
      path: "product/add",
      element: <Suspense fallback={Loading}><ProductReviewAdd /></Suspense>
    },
    {
      path: "product/read/:prid",
      element: <Suspense fallback={Loading}><ProductReviewRead /></Suspense>
    },
    {
      path: "product/modify/:prid",
      element: <Suspense fallback={Loading}><ProductReviewModify /></Suspense>
    },
    {
      path: "tour/list",
      element: <Suspense fallback={Loading}><TourReviewList /></Suspense>
    },
    {
      path: "tour/add",
      element: <Suspense fallback={Loading}><TourReviewAdd /></Suspense>
    },
    {
      path: "tour/read/:pno",
      element: <Suspense fallback={Loading}><TourReviewRead /></Suspense>
    },
    {
      path: "tour/modify/:pno",
      element: <Suspense fallback={Loading}><TourReviewModify /></Suspense>
    }
  ]
}

export default ReviewRouter