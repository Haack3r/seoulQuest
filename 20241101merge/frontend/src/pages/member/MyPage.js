import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import MyPageComponent from '../../components/member/MyPageComponent'

const MyPage = () => {

  return (
    <BasicLayout>
        <div className='flex flex-wrap w-full'>
            <MyPageComponent/>
        </div>
    </BasicLayout>
  )
}

export default MyPage