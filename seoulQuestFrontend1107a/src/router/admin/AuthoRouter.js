// import { useEffect } from "react"
// import { useAuthorize } from "../../hooks/admin/useAuthorize"
// import { Navigate, Outlet, useNavigate } from "react-router-dom"
// import { SyncLoader } from "react-spinners"
// import AdminLayout from "../../layouts/AdminLayout"

// const AuthoRouter = () => {
//     const navigate = useNavigate()
//     const { isAuthorized, isLoading, error } = useAuthorize()

//     useEffect(() => {
//         if (error) {
//             navigate("/")
//         }
//     }, [error, navigate])

//     if (isLoading) return <div><SyncLoader /></div>

//     return isAuthorized ? (
//         <AdminLayout>
//             <div className="flex flex-wrap w-full">
//                 <Outlet />
//             </div>
//         </AdminLayout>
//     ) : null
// }

// export default AuthoRouter