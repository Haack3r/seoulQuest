import { lazy, Suspense } from "react";
import { SyncLoader } from "react-spinners";
import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";
import memberRouter from "./memberRouter";
import toursRouter from "./toursRouter";
import nuProductsRouter from "./nuProductsRouter";
import nuToursRouter from "./nuToursRouter";


const { createBrowserRouter } = require("react-router-dom")

const Loading = <div><SyncLoader /></div>
// MainPage 로딩 지연
const Main = lazy(() => import("../pages/MainPage"))
const About = lazy(() => import("../pages/AboutPage"))
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))
const ProductsIndex = lazy(() => import("../pages/products/IndexPage"))
const NUProductsIndex = lazy(() => import("../pages/products/NUIndexPage"))
const ToursIndex = lazy(() => import("../pages/tours/TourIndexPage"))
const NUToursIndex = lazy(() => import("../pages/tours/NUTourIndexPage"))
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
        path: "user/products",
        element: <Suspense fallback={Loading}><ProductsIndex /></Suspense>,
        // 중첩 라우팅
        children: productsRouter()
    },
    {
        path: "products",
        element: <Suspense fallback={Loading}><NUProductsIndex /></Suspense>,
        // 중첩 라우팅
        children: nuProductsRouter()
    },
    {
        path: "user/tours",
        element: <Suspense fallback={Loading}><ToursIndex /></Suspense>,
        // 중첩 라우팅
        children: toursRouter()
    },
    {
        path: "tours",
        element: <Suspense fallback={Loading}><NUToursIndex /></Suspense>,
        // 중첩 라우팅
        children: nuToursRouter()
    },
    {
        path: "member",
        children: memberRouter()
    },
])

export default root;