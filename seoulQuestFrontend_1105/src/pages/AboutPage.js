import React from 'react'
import BasicLayout from '../layouts/BasicLayout'
import useCustomLogin from '../hooks/useCustomLogin'

const AboutPage = () => {
  // 로그인 사용자만 표시하도록
  // 비 로그인 시 로그인 페이지로 이동
  const { isLogin, moveToLoginReturn } = useCustomLogin()
  if (!isLogin) return moveToLoginReturn()
  // ------

  return (
    <BasicLayout>
      <div className='text-3xl'>About Page</div>
    </BasicLayout>

  )
}

export default AboutPage