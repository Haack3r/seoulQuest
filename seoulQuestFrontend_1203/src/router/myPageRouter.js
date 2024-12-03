import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'

const myPageRouter = () => {

    const Loading = <div><SyncLoader /></div>
    const MyPage = lazy(() => import("../pages/mypage/MyPage"))
    const EditProfilePage = lazy(() => import("../pages/mypage/EditProfilePage"))
    const ReviewPage = lazy(() => import("../pages/mypage/ReviewPage"))
    const OrderPage = lazy(() => import("../pages/mypage/OrderPage"))
    const BookingPage = lazy(() => import("../pages/mypage/BookingPage"))
    return [
       
        {
            path: "myprofile",
            element: <Suspense fallback={Loading}><MyPage/></Suspense>,
        },
        {
            path: "",
            element: <Navigate replace to="/mypage/myprofile" />
          },
        {
            path: "editprofile",
            element: <Suspense fallback={Loading}><EditProfilePage/></Suspense>,
        },
        {
            path: "orders",
            element: <Suspense fallback={Loading}><OrderPage /></Suspense>
        },
        {
            path: "bookings",
            element: <Suspense fallback={Loading}><BookingPage /></Suspense>
        },
        {
            path: "review",
            element: <Suspense fallback={Loading}><ReviewPage /></Suspense>
        },
    ]
}

export default myPageRouter