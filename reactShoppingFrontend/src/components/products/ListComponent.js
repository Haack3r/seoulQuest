import React, { useEffect, useState } from 'react'
import useCustomMove from './../../hooks/useCustomMove';
import { getList } from '../../api/productsApi';
import FetchingModal from '../common/FetchingModal';
import { API_SERVER_HOST } from '../../api/todoApi';
import PageComponent from '../common/PageComponent';
// import useCustomLogin from '../../hooks/useCustomLogin';

const host = API_SERVER_HOST

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const ListComponent = () => {

    const { exceptionHandle } = useCustomLogin()
    const { page, size, refresh, moveToList, moveToRead } = useCustomMove()
    const [serverData, setServerData] = useState(initState)

    //for FetchingModal
    const [fetching, setFetching] = useState(false)


    useEffect(() => {
        setFetching(true)

        getList({ page, size }).then(data => {
            console.log(data)
            setServerData(data)
            setFetching(false)
        }).catch(err => exceptionHandle(err))
    }, [page, size, refresh])

    return (
        <div className='border-2 border-blue-100 mt-10 mr-2 ml-2'>

            {/* 로딩중 모달 */}
            {fetching ? <FetchingModal /> : <></>}

            {/* product list */}
            <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {serverData.dtoList.map(product =>
                    <div
                        key={product.pno}
                        className='bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden'
                        onClick={() => moveToRead(product.pno)}>
                        <div className='flex flex-col h-full'>
                            <div className='font-extrabold text-2xl p-2 w-full'>
                                {product.pno}
                            </div>
                            <div className='text-1xl m-1 p-2 w-full flex flex-col'>
                                <div className='w-full overflow-hidden'>
                                    <img alt='product'
                                        className='m-auto rounded-md w-60'
                                        src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`} />
                                </div>

                                <div className='bottom-0 font-extrabold bg-white'>
                                    <div className='text-center p-1 text-lg font-serif font-semibold text-gray-900 mb-2'>
                                        {product.pname}
                                    </div>
                                    <div className='text-center p-1 text-lg font-serif font-semibold text-gray-900 mb-2'>
                                        {product.price} Won
                                    </div>
                                    <div className="bg-gray-50 p-4">
                      <button className="w-full bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300 py-2 rounded">
                        🛒 Add to Cart
                      </button>
                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* page list */}
            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </div>
    )
}

export default ListComponent