import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

const toursRouter = () => {
    
  const Loading = <div>Loading...</div>
  const ToursList = lazy(() => import("../pages/tours/TourListPage"))
  const ToursRead = lazy(() => import("../pages/tours/TourReadPage"))
<<<<<<< HEAD
=======
  const ToursAdd = lazy(() => import("../pages/tours/TourAddPage"))
  const ToursModify = lazy(()=> import("../pages/tours/TourModifyPage"))
>>>>>>> origin/hyein

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
<<<<<<< HEAD
      path: "read/:pno",
      element: <Suspense fallback={Loading}><ToursRead /></Suspense>
    },
    // {
    //   path: "read/:pno",
    //   element: <Suspense fallback={Loading}><ProductRead /></Suspense>
    // }
=======
      path: "add",
      element: <Suspense fallback={Loading}><ToursAdd /></Suspense>
    },
    {
      path: "read/:tno",
      element: <Suspense fallback={Loading}><ToursRead /></Suspense>
    },
    {
      path: "modify/:tno",
      element: <Suspense fallback={Loading}><ToursModify/></Suspense>
    }

>>>>>>> origin/hyein
  ]
}

export default toursRouter