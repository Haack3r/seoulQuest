import { lazy, Suspense } from "react";
import { SyncLoader } from "react-spinners";
import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";
import memberRouter from "./memberRouter";
import toursRouter from "./toursRouter";
const { createBrowserRouter } = require("react-router-dom")

const Loading = <div><SyncLoader /></div>
// MainPage 로딩 지연
const Main = lazy(() => import("../pages/MainPage"))
const About = lazy(() => import("../pages/AboutPage"))
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))
const ProductsIndex = lazy(() => import("../pages/products/IndexPage"))
const ToursIndex = lazy(() => import("../pages/tours/TourIndexPage"))
const Cart = lazy(() => import("../pages/Cart"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "about",
        element: <Suspense fallback={Loading}><About /></Suspense>
    },
    {
        path: "cart",
        element: <Suspense fallback={Loading}><Cart /></Suspense>
    },
    {
        path: "todo",
        element: <Suspense fallback={Loading}><TodoIndex /></Suspense>,
        // 중첩 라우팅
        children: todoRouter()
    },
    {
        path: "products",
        element: <Suspense fallback={Loading}><ProductsIndex /></Suspense>,
        // 중첩 라우팅
        children: productsRouter()
    },
    {
        path: "tours",
        element: <Suspense fallback={Loading}><ToursIndex /></Suspense>,
        // 중첩 라우팅
        children: toursRouter()
    },
    {
        path: "member",
        children: memberRouter()
    },
])

export default root;