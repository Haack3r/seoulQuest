import React from 'react'
import EditProfileComponent from '../../components/member/EditProfileComponent'
import BasicLayout from '../../layouts/BasicLayout'
import MyPageLayout from '../../layouts/MyPageLayout'

const EditProfilePage = () => {
  return (
    <BasicLayout>
        <div className="p-6 w-full bg-gray-100 flex justify-center items-start">
        <div className="flex flex-row gap-6 w-full max-w-6xl mt-20">
          <div className="w-1/3">
            <MyPageLayout />
          </div>
          <div className="w-2/3">
            <EditProfileComponent/>
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}

export default EditProfilePage