import React, { useCallback } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { Outlet, useNavigate } from 'react-router-dom'
import { HomeFilled } from '@ant-design/icons';

const IndexPage = () => {

  const navigate = useNavigate()

  // useCallback : 함수를 재사용하기 위함
  // useMemo : 데이터를 재사용하기 위함
  // 렌더링시마다 호출하면 시간이 비효율적이라서

  const handleClickList = useCallback(() => { navigate({ pathname: 'list' }) })
  // const handleClickAdd = useCallback(() => { navigate({ pathname: 'add' }) })

  return (
    <BasicLayout>
       

        <div className='flex flex-wrap w-full'>
            <Outlet />
        </div>
    </BasicLayout>
  )
}

export default IndexPage