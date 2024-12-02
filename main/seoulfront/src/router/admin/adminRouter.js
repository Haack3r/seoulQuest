import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import { AdminAuth } from './adminAuth'

const adminRouter = () => {

    const Loading = <div className="flex justify-center items-center"><SyncLoader /></div>

    const AdminDashBoard = lazy(() => import("../../pages/admin/AdminDashBoard"))
    const AdminOrderPage = lazy(() => import("../../pages/admin/AdminOrder"))
    const AdminProductPage = lazy(() => import("../../pages/admin/AdminProduct"))
    const AdminIndexPage = lazy(() => import("../../pages/admin/AdminIndexPage"))
    const AdminTourPage = lazy(() => import("../../pages/admin/AdminTour"))
    const AdminInventoryPage = lazy(() => import("../../pages/admin/AdminInventory"))
    const AdminReservationPage = lazy(() => import("../../pages/admin/AdminReservation"))
    const AdminExchangePage = lazy(() => import("../../pages/admin/AdminExchange"))
    const AdminDeliveryPage = lazy(() => import("../../pages/admin/AdminDelivery"))
    const AdminDeliveryCostPage = lazy(() => import("../../pages/admin/AdminDeliveryCost"))
    const AdminCustomerPage = lazy(() => import("../../pages/admin/AdminCustomer"))

    return [
        {
            path: "",
            element: <AdminAuth />,
            children: [
                {
                    element: <AdminIndexPage />,
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
                            element: <Suspense fallback={Loading}><AdminProductPage /></Suspense>
                        },
                        {
                            path: "tour",
                            element: <Suspense fallback={Loading}><AdminTourPage /></Suspense>
                        },
                        {
                            path: "inventory",
                            element: <Suspense fallback={Loading}><AdminInventoryPage /></Suspense>
                        },
                        {
                            path: "reservation",
                            element: <Suspense fallback={Loading}><AdminReservationPage /></Suspense>
                        },
                        {
                            path: "exchange",
                            element: <Suspense fallback={Loading}><AdminExchangePage /></Suspense>
                        },
                        {
                            path: "delivery",
                            element: <Suspense fallback={Loading}><AdminDeliveryPage /></Suspense>
                        },
                        {
                            path: "cost",
                            element: <Suspense fallback={Loading}><AdminDeliveryCostPage /></Suspense>
                        },
                        {
                            path: "customer",
                            element: <Suspense fallback={Loading}><AdminCustomerPage /></Suspense>
                        },
                    ]
                }
            ]
        }
    ]
}

export default adminRouter