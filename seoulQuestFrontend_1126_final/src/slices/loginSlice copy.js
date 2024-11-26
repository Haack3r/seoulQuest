import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginPost } from '../api/memberApi'
import { getCookie, removeCookie, setCookie } from '../util/cookieUtil'

const initState = { email: '' }
const loadMemberCookie = () => {
    const memberInfo = getCookie("member")

    // 닉네임 처리
    if (memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }
    return memberInfo
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param)
})

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            console.log("login...");
            // email, pw 로 구성 됨
            const payload = action.payload
            setCookie("member", JSON.stringify(payload), 1)
            // 상태 업데이트
            return payload
        },
        logout: (state, action) => {
            console.log("logout...")
            removeCookie("member")
            return { ...initState }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPostAsync.fulfilled, (state, action) => {
                // 완료
                console.log('fulfilled')
                console.log(action.payload) // action.payload : action 안에 실제 전송되는 Data
                const payload = action.payload
                if (!payload.error){
                    setCookie("member", JSON.stringify(payload), 1) // 쿠키 1일 보관
                }
                return payload
            })
            .addCase(loginPostAsync.pending, (state, action) => {
                // 처리중
                console.log('pending')
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                // 에러
                console.log('rejected')
            })
    }
})
export const { login, logout } = loginSlice.actions

export default loginSlice.reducer