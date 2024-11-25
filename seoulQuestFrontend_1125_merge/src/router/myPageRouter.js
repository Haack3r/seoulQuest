import React, { lazy, Suspense } from 'react'

const myPageRouter = () => {

    const Loading = <div>Loading...</div>
    const MyPage = lazy(() => import("../pages/mypage/MyPage"))
    const EditProfilePage = lazy(() => import("../pages/mypage/EditProfilePage"))
    const ReviewProductPage = lazy(() => import("../pages/review/ProductReviewPage"))
    const ReviewTourPage = lazy(() => import("../pages/review/TourReviewPage"))
    // const OrderPage = lazy(() => import("../pages/review/OrderPage"))
    // const BookingPage = lazy(() => import("../pages/review/BookingPage"))
    return [
       
        {
            path: "",
            element: <Suspense fallback={Loading}><MyPage/></Suspense>,
        },
        ,
        {
            path: "editProfile",
            element: <Suspense fallback={Loading}><EditProfilePage/></Suspense>,
        },
        // {
        //     path: "orders",
        //     element: <Suspense fallback={Loading}><OrderPage /></Suspense>
        // },
        // {
        //     path: "bookings",
        //     element: <Suspense fallback={Loading}><BookingPage /></Suspense>
        // },
        {
            path: "review/products",
            element: <Suspense fallback={Loading}><ReviewProductPage /></Suspense>
        },
        {
            path: "review/tours",
            element: <Suspense fallback={Loading}><ReviewTourPage /></Suspense>
        },
    ]
}

export default myPageRouter
