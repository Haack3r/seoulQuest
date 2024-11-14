import React, { Children, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import jwtAxios from '../../util/jwtUtil';
import { SyncLoader } from 'react-spinners';
import { checkAdminRole } from '../../api/AdminApi';
import { getCookie } from '../../util/cookieUtil';

export const AdminAuth = () => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [role, setRole] = useState(null);

    useEffect(() => {
        const checkAdminAuth = async () => {
            // try {
            //     const token = localStorage.getItem('accessToken');
            //     if (!token) {
            //         throw new Error('토큰이 없습니다');
            //     }

            //     const response = await jwtAxios.get('/api/admin/check', {
            //         headers: { Authorization: `Bearer ${token}` }
            //     });

            //     if (!response.data?.roleName?.includes('ROLE_ADMIN')) {
            //         throw new Error('관리자가 아닙니다');
            //     }

            //     setLoading(false);
            // } catch (error) {
            //     console.error('Admin auth check failed:', error);
            //     localStorage.removeItem('accessToken');
            //     navigate('/member/login', {
            //         replace: true,
            //         state: {
            //             from: location.pathname,
            //             message: '관리자 권한이 필요합니다.'
            //         }
            //     });
            // }
            /*-------------------------------------------------------------------------*/
            // useEffect(() => {
            // try {
            //     const user = JSON.parse(localStorage.getItem("user")); // user 객체 가져오기
            //     if (user && user.role && Array.isArray(user.role)) {
            //         if (user.role[1]) setRole("ADMIN"); // role 배열에서 첫 번째 값을 가져옴
            //         else {
            //             setRole("USER");
            //             alert("어드민 권한이 없습니다")
            //             navigate("/")
            //         }
            //     }
            // } catch (error) {
            //     console.log("사용자 권한 에러", error)
            //     setRole(null)
            //     alert("권한 체크 실패")
            //     navigate("/")
            // }

            // }, []);

            //     try {
            //         // 1. 먼저 로컬 스토리지 체크
            //         const user = JSON.parse(localStorage.getItem("user"));
            //         console.log(user)
            //         if (!user || !user.role || !Array.isArray(user.role)) {
            //             throw new Error("유효하지 않은 사용자 정보");
            //         }

            //         if (!user.role.includes("ADMIN")) {
            //             throw new Error("관리자 권한이 없습니다");
            //         }

            //         // 2. 서버 측 권한 확인
            //         await checkAdminRole();

            //         setLoading(false);
            //     } catch (error) {
            //         console.error('권한 검증 실패:', error);
            //         alert(error.message || "관리자 권한이 필요합니다");
            //         navigate('/', { replace: true });
            //     }
            // };
            //     checkAdminAuth();
            // }, [navigate]);

            /*-------------------------------------------------------------------------*/

            //         try {
            //             // 1. 쿠키에서 멤버 정보 확인
            //             const memberInfo = getCookie("member");
            //             if (!memberInfo) {
            //                 throw new Error("로그인이 필요합니다");
            //             }

            //             // 2. ROLE_ADMIN 체크
            //             const { roleName } = memberInfo;
            //             if (!Array.isArray(roleName) || !roleName.includes("ADMIN")) {
            //                 throw new Error("관리자 권한이 없습니다");
            //             }

            //             // 3. 서버 측 권한 확인 - jwtAxios가 자동으로 토큰 처리
            //             await checkAdminRole();
            //             setLoading(false);

            //         } catch (error) {
            //             console.error('권한 검증 실패:', error);
            //             alert(error.message || "관리자 권한이 필요합니다");
            //             navigate('/member/login', { replace: true });
            //         }
            //     }
            //     checkAdminAuth()
            // }, [navigate])

            /*-------------------------------------------------------------------------*/

            // try {
            //     // 1. localStorage에서 user 정보 확인
            //     const user = JSON.parse(localStorage.getItem("user"));
            //     if (user && user.role && Array.isArray(user.role)) {
            //         if (user.role[1]) setRole("ADMIN"); // role 배열에서 첫 번째 값을 가져옴
            //         else setRole("USER");
            //     }

            //     // 3. 서버 측 권한 확인
            //     await checkAdminRole();
            //     setLoading(false);

            // } catch (error) {
            //     console.error('권한 검증 실패:', error);
            //     alert(error.message || "관리자 권한이 필요합니다");
            //     navigate('/', {
            //         replace: true,
            //         state: { message: "관리자 권한이 필요합니다" }
            //     });
            // }
            /*-------------------------------------------------------------------------*/

            try {
                await checkAdminRole()
                setLoading(false)
            } catch (error) {
                console.error('권한 검증 실패:', error);
                alert(error.message || "관리자 권한이 필요합니다");
                navigate('/', {
                    replace: true,
                    state: { message: "관리자 권한이 필요합니다" }
                });
            } finally {
                setLoading(false)
            }
        };

        checkAdminAuth();
    }, [navigate]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <SyncLoader color="#36d7b7" />
        </div>;
    }

    return <Outlet />;
}
