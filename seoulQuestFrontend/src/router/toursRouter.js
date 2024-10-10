import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

const toursRouter = () => {
    
  const Loading = <div>Loading...</div>
  const ToursList = lazy(() => import("../pages/tours/TourListPage"))
  const ToursRead = lazy(() => import("../pages/tours/TourReadPage"))

  return [
    {
      path: "list",
      element: <Suspense fallback={Loading}><ToursList /></Suspense>
    },
    {
      path: "",
      element: <Navigate replace to="/tours/list" />
    },
    {
      path: "read/:pno",
      element: <Suspense fallback={Loading}><ToursRead /></Suspense>
    },
    // {
    //   path: "read/:pno",
    //   element: <Suspense fallback={Loading}><ProductRead /></Suspense>
    // }
  ]
}

export default toursRouter