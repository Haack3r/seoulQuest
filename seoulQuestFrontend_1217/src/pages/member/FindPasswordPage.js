import React from 'react'

import BasicLayout from '../../layouts/BasicLayout'
import FindPasswordComponent from '../../components/member/FindPasswordComponent'

const FindPasswordPage = () => {
  return (
    <BasicLayout>
        <div className="p-4 w-full bg-gray-100" >
           <FindPasswordComponent/>
        </div>
    </BasicLayout>
  )
}

export default FindPasswordPage