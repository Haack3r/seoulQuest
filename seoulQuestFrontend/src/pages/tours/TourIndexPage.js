import React, { useCallback } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { Outlet, useNavigate } from 'react-router-dom'
import { HomeFilled } from '@ant-design/icons';

const TourIndexPage = () => {
    const navigate = useNavigate()

    // useCallback : 함수를 재사용하기 위함
    // useMemo : 데이터를 재사용하기 위함
    // 렌더링시마다 호출하면 시간이 비효율적이라서
  
    const handleClickList = useCallback(() => { navigate({ pathname: 'list' }) })
    const handleClickAdd = useCallback(() => { navigate({ pathname: 'add' }) })
    
  return (
    <BasicLayout>
      <div className='w-full flex m-2 p-2'> 
        <div className='text-xl mt-20 ml-10 p-2 w-40 font-extrabold text-center cursor-pointer'
          onClick={handleClickList}><HomeFilled /> Tours</div>
          {/* <div className='text-xl m-1 p-2 w-20 font-extrabold text-center underline'
          onClick={handleClickAdd}>추가</div>*/}
      </div>

      <div className='flex flex-wrap w-full'>
          <Outlet />
      </div>
    </BasicLayout>
  )
}


export default TourIndexPage