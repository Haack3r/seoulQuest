import React, { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { Outlet, useNavigate } from 'react-router-dom'
import { checkRole } from '../../api/AdminApi'
import { SyncLoader } from 'react-spinners'

const AdminIndexPage = () => {
    const navigate = useNavigate()
    // const [authState, setAuthState] = useState({
    //     isLoading: true,
    //     isAuthorized: false,
    //     error: null
    // })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await checkRole()
                setIsLoading(false)
            } catch (error) {
                console.log('권한 체크 오류', error)
                alert('관리자 권한이 없습니다')
                navigate('/')
            }
        }

        checkAdmin()
    }, [navigate])

    if (isLoading) return <div><SyncLoader /></div>

    // const AdminCheck = async () => {
    //     try {
    //         const res = await checkRole()

    //         if (!res) throw new Error('서버 권한 검증 실패')

    //         setAuthState({
    //             isLoading: false,
    //             isAuthorized: true,
    //             error: null
    //         })
    //     } catch (error) {
    //         console.log("권한 검증 실패", error)
    //         window.alert(error.message || '권한이 없습니다')
    //         setAuthState({
    //             isLoading: false,
    //             isAuthorized: false,
    //             error: error.message
    //         })
    //         navigate('/')
    //     }

    //     useEffect(() => {
    //         AdminCheck()
    //     }, [])

    // if (authState.isLoading) return <div><SyncLoader /></div>

    // React.useEffect(() => {
    //     try {
    //         const user = JSON.parse(localStorage.getItem("user")); // user 객체 가져오기
    //         if (user && user.role && Array.isArray(user.role)) {
    //             const admin = user.role.includes("ADMIN")
    //             const member = user.role.includes("USER")
    //             console.log("사용자 권한", user.role)

    //             if (admin && member) {
    //                 setRole("ADMIN")
    //                 navigate("/admin")
    //             } else {
    //                 setRole("USER")
    //                 alert("권한이 없습니다.")
    //                 navigate("/")
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         alert("권한이 없습니다.")
    //         navigate("/")
    //     }
    // }, [navigate])

    // return authState.isLoading ? (
    //     <AdminLayout>
    //         <div className='flex flex-wrap w-full'>
    //             <Outlet /> {/* 중첩라우팅 children */}
    //         </div>
    //     </AdminLayout>
    // ) : null

    return (
        <AdminLayout>
            <div className='flex flex-wrap w-full'>
                <Outlet /> {/* 중첩라우팅 children */}
            </div>
        </AdminLayout>
    )
}
// }
export default AdminIndexPage