import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

const nuProductsRouter = () => {

  const Loading = <div>Loading...</div>
  const NUProductsList = lazy(() => import("../pages/products/NUListPage"))
  const NUProductRead = lazy(() => import("../pages/products/NUReadPage"))


  return [
    {
      path: "list",
      element: <Suspense fallback={Loading}><NUProductsList /></Suspense>
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