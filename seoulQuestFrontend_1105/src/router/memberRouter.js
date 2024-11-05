import React, { lazy, Suspense } from 'react'
import myPageRouter from './myPageRouter'
import EditProfilePage from '../pages/member/EditProfilePage'

const memberRouter = () => {

    const Loading = <div>Loading...</div>
    const Login = lazy(() => import("../pages/member/LoginPage"))
    const Logout = lazy(() => import("../pages/member/LogoutPage"))
    const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"))
    const MemberModify = lazy(() => import("../pages/member/ModifyPage"))
    const SignUp = lazy(() => import("../pages/member/SignUpPage"))
    

    return [
        {
            path: "login",
            element: <Suspense fallback={Loading}><Login /></Suspense>
        },
        {
            path: "logout",
            element: <Suspense fallback={Loading}><Logout /></Suspense>
        },
        {
            path: "kakao",
            element: <Suspense fallback={Loading}><KakaoRedirect /></Suspense>
        },
        {
            path: "modify",
            element: <Suspense fallback={Loading}><MemberModify /></Suspense>
        },
        {
            path: "signup",
            element: <Suspense fallback={Loading}><SignUp /></Suspense>
        },
        
    ]
}

export default memberRouter