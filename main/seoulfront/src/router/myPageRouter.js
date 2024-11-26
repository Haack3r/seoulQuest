import React, { lazy, Suspense } from 'react'

const myPageRouter = () => {

    const Loading = <div>Loading...</div>
    const MyPage = lazy(() => import("../pages/mypage/MyPage"))
    const EditProfilePage = lazy(() => import("../pages/mypage/EditProfilePage"))
    const ProductReviewList = lazy(() => import("../pages/review/ProductReviewPage"))
    // const TourReviewList = lazy(() => import("../pages/review/TourReviewPage"))
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
        {
            path: "review/products",
            element: <Suspense fallback={Loading}><ProductReviewList /></Suspense>
        },
        // {
        //     path: "review/tours",
        //     element: <Suspense fallback={Loading}><TourReviewList /></Suspense>
        //   },
    ]
}

export default myPageRouter
