import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import MyPageComponent from '../../components/member/MyPageComponent'

const MyPage = () => {

  return (
    <BasicLayout>
        <div className="p-4 w-full" style={{ backgroundColor: "#E0DCD0" }}>
            <MyPageComponent/>
        </div>
    </BasicLayout>
  )
}

export default MyPage