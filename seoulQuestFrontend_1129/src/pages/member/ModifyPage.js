import React from 'react'
import ModifyComponent from "../../components/member/ModifyComponents"
import BasicLayout from "../../layouts/BasicLayout"

const ModifyPage = () => {
  return (
      <BasicLayout>
          <div className='text-3xl'>Member Modify page</div>
          <div className='bg-white w-full mt-4 p-2'>
              <ModifyComponent></ModifyComponent>
          </div>
    </BasicLayout>
  )
}

export default ModifyPage