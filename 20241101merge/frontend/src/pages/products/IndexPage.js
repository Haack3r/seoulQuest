import React, { useCallback } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { Outlet, useNavigate } from 'react-router-dom'

const IndexPage = () => {

  return (
    <BasicLayout>

        <div className='flex flex-wrap w-full'>
            <Outlet />
        </div>
    </BasicLayout>
  )
}

export default IndexPage