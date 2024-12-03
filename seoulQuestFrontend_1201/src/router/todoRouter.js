import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'

const Loading = <div><SyncLoader /></div>
const TodoList = lazy(() => import("../pages/todo/ListPage"))
const TodoRead = lazy(() => import("../pages/todo/ReadPage"))
const TodoAdd = lazy(() => import("../pages/todo/AddPage"))
const TodoModify = lazy(() => import("../pages/todo/ModifyPage"))
const todoRouter = () => {
  return [
    {
      path: "list",
      element: <Suspense fallback={Loading}><TodoList /></Suspense>
    },
    {
      path: "",
      element: <Navigate replace to="list" />
      // redirect
    },
    {
      path: "read/:tno",
      element: <Suspense fallback={Loading}><TodoRead /></Suspense>
    },
    {
      path: "add",
      element: <Suspense fallback={Loading}><TodoAdd /></Suspense>
    },
    {
      path: "modify/:tno",
      element: <Suspense fallback={Loading}><TodoModify /></Suspense>
    }
  ]
}

export default todoRouter