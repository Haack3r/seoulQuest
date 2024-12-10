import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import FindEmailComponent from '../../components/member/FindEmailComponent'

const FindEmailPage = () => {
  return (
    <BasicLayout>
        <div className="p-4 w-full bg-gray-100" >
           <FindEmailComponent/>
        </div>
    </BasicLayout>
  )
}

export default FindEmailPage