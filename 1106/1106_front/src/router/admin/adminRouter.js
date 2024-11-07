import { Alert } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'

const adminRouter = () => {

    const Loading = <div><SyncLoader /></div>
    const AdminDashBoard = lazy(() => import("../../pages/admin/AdminDashBoard"))
    const AdminOrderPage = lazy(() => import("../../pages/admin/AdminOrderPage"))
    const AdminProductComponents = lazy(() => import("../../components/admin/AdminProductComponents"))
    const AdminIndexPage = lazy(() => import("../../pages/admin/AdminIndexPage"))

    return [
        {
            // index: true,
            element: (
                <Suspense fallback={Loading}><AdminIndexPage /></Suspense>
            ),
            errorElement: <Alert severity="error">권한이 없습니다.</Alert>,
            children: [
                {
                    index: true,
                    element: <Navigate replace to="dashboard" />
                    // 자동연결? 리다이렉트 처리 ex) 관리자 페이지 접속시 자동으로 dashboard로 이동
                },
                {
                    path: "dashboard",
                    element: <Suspense fallback={Loading}><AdminDashBoard /></Suspense>
                },
                {
                    path: "order",
                    element: <Suspense fallback={Loading}><AdminOrderPage /></Suspense>
                },
                {
                    path: "product",
                    element: <Suspense fallback={Loading}><AdminProductComponents /></Suspense>
                },
            ]
        }
    ]
}

export default adminRouter