import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'

const Loading = <div><SyncLoader /></div>
const TourReviewList = lazy(() => import("../pages/toursReview/ListPage"))
const TourReviewAdd = lazy(() => import("../pages/toursReview/AddPage"))
const TourReviewRead = lazy(() => import("../pages/toursReview/ReadPage"))
const TourReviewModify = lazy(() => import("../pages/toursReview/ModifyPage"))

const tourReviewRouter = () => {
  return [
    {
      path: "list",
      element: <Suspense fallback={Loading}><TourReviewList /></Suspense>
    },
    {
      path: "",
      element: <Navigate replace to="list" />
      // redirect
    },
    {
      path: "add",
      element: <Suspense fallback={Loading}><TourReviewAdd /></Suspense>
    },
    {
      path: "read/:pno",
      element: <Suspense fallback={Loading}><TourReviewRead /></Suspense>
    },
    {
      path: "modify/:pno",
      element: <Suspense fallback={Loading}><TourReviewModify /></Suspense>
    }
  ]
}

export default tourReviewRouter