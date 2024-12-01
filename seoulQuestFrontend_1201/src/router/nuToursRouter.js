import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

const nuToursRouter = () => {
    
  const Loading = <div>Loading...</div>
  const NUToursList = lazy(() => import("../pages/tours/NUTourListPage"))
  const NUToursRead = lazy(() => import("../pages/tours/NUTourReadPage"))

  return [
    {
      path: "list",
      element: <Suspense fallback={Loading}><NUToursList /></Suspense>
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