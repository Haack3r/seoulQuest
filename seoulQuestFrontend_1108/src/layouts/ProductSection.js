import React, { useEffect, useState } from 'react'
import useCustomMove from '../hooks/useCustomMove';

import FetchingModal from '../components/common/FetchingModal';
import { API_SERVER_HOST } from '../api/todoApi';
// import useCustomLogin from '../hooks/useCustomLogin';
import Button from '../components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { useNavigate } from 'react-router-dom';
import { getListForMain } from '../api/nuProductApi';

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
const ProductSection = () => {
    const navigate = useNavigate()
    // const { exceptionHandle } = useCustomLogin()
    const { page, size, refresh, moveToList, moveToReadProductFromMain } = useCustomMove()
    const [serverData, setServerData] = useState(initState)
  
    //for FetchingModal
    const [fetching, setFetching] = useState(false)
  
  
    useEffect(() => {
        setFetching(true)
  
        getListForMain({ page, size }).then(data => {
            console.log(data)
            setServerData(data)
            setFetching(false)
        })//.catch(err => exceptionHandle(err))
    }, [page, size, refresh])
  return (
    <div className='mt-10 mr-2 ml-2'>
    {/* 로딩중 모달 */}
    {fetching ? <FetchingModal /> : <></>}
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-stretch mb-12 justify-between">
          <h2 className="text-4xl font-bold text-center text-gray-900 tracking-wide">
            Artisan Treasures
          </h2>
          <Button className="text-2xl text-center text-gray-900 hover:bg-gray-100 "
                    onClick={() => navigate({pathname: `/products/list`})}>
                      View More
          </Button>
        </div>  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
    {serverData.dtoList.map(product => (
      <Card key={product.pno}
      onClick={() => moveToReadProductFromMain(product.pno)}
       className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-white group">
        <div className="relative overflow-hidden">
          <img src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`} alt={product.pname} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="text-center">
              <CardTitle className="text-lg font-semibold tracking-wide text-white">{product.pname}</CardTitle>
              <CardDescription className="font-medium text-rose-400">₩{product.price}</CardDescription>
              <Button variant="outline" className="mt-2 text-white hover:text-gray-900 hover:bg-white font-medium tracking-wide border-white">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </Card>
    ))}
  </div>
</div>
</section>
</div>
  )
}

export default ProductSection