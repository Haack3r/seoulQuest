import React from 'react'
import EditProfileComponent from '../../components/member/EditProfileComponent'
import BasicLayout from '../../layouts/BasicLayout'

const EditProfilePage = () => {
    console.log("여기로 오나")
  return (
    <BasicLayout>
        <div className="p-4 w-full" style={{ backgroundColor: "#E0DCD0" }}>
           <EditProfileComponent/>
        </div>
    </BasicLayout>
  )
}

export default EditProfilePage