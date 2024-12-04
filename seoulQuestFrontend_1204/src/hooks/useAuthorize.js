import { useEffect, useState } from "react"
import { checkRole } from "../../api/AdminApi"
import { checkAdminRole } from "../../util/jwtUtil"

export const useAuthorize = () => {
    const [authState, setAuthState] = useState({
        isLoading: true,
        isAuthorized: false,
        error: null,
    })

    const AdminCheck = async () => {
        try {
            // 클라이언트 측 권한 체크
            // if (!checkAdminRole()) {
            //     throw new Error('관리자 권한이 없습니다')
            // }

            // 서버 측 권한 검증
            const res = await checkRole()

            if (!res) {
                throw new Error('서버 권한 검증 실패')
            }

            setAuthState({
                isLoading: false,
                isAuthorized: true,
                error: null
            })
        } catch (error) {
            console.error('권한 검증 실패:', error)
            window.alert(error.message || '권한이 없습니다')
            setAuthState({
                isLoading: false,
                isAuthorized: false,
                error: error.message
            })
        }
    }

    useEffect(() => {
        AdminCheck()
    }, [])

    return { ...authState, refreshAuth: AdminCheck }
}