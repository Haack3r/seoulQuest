import React from 'react'
import { Pagination } from 'antd';

const PageComponent = ({ serverData, movePage }) => {
    // listComponent에서 자식으로 사용할건데 props로 전달되면 그것을 여기서 사용함
    // console.log('Page Component: serverData', serverData, movePage)
  return (
    <div className='m-6 flex justify-center'>
    
        {serverData.prev ?
        <div>
            <div className='m-2 p-2 w-16 text-center font-bold text-gray-900' 
            onClick={() => movePage({page: serverData.prevPage})}>Prev</div>
        </div> : <></>}

        {serverData.pageNumList.map(pageNum =>
            <div key={pageNum}
                className={`m-2 p-2 w-12 text-center rounded shadow-md text-white
                ${serverData.current === pageNum? 'bg-gray-500':'bg-gray-900'}`}
                onClick={() => movePage({page:pageNum})}>
            {pageNum}
            </div>
        )}

        {serverData.next?
        <div className='m-2 p-2 w-16 text-center font-bold text-gray-900'
            onClick={() => movePage({page: serverData.nextPage})}>
        Next
        </div> : <></>}
    </div>
  )
}

export default PageComponent