import React, { useEffect, useState } from 'react'
import useCustomMove from './../../hooks/useCustomMove';
<<<<<<< HEAD
import { getList } from '../../api/productsApi';
=======

>>>>>>> origin/hyein
import FetchingModal from '../common/FetchingModal';
import { API_SERVER_HOST } from '../../api/todoApi';
import PageComponent from '../common/PageComponent';
import useCustomLogin from '../../hooks/useCustomLogin';
import Button from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
<<<<<<< HEAD
=======
import { getList } from '../../api/tourApi';
>>>>>>> origin/hyein


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

const TourListComponent = () => {
  
<<<<<<< HEAD
  const { exceptionHandle } = useCustomLogin()
=======
  //const { exceptionHandle } = useCustomLogin()
>>>>>>> origin/hyein
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove()
  const [serverData, setServerData] = useState(initState)

  //for FetchingModal
  const [fetching, setFetching] = useState(false)

<<<<<<< HEAD

  useEffect(() => {
      setFetching(true)

      getList({ page, size }).then(data => {
          console.log(data)
          setServerData(data)
          setFetching(false)
      }).catch(err => exceptionHandle(err))
  }, [page, size, refresh])
=======
  useEffect(() => {
      setFetching(true)

    getList({ page, size }).then(data => {
      console.log(data)
      setServerData(data)
      setFetching(false)
    });//.catch(err => exceptionHandle(err))
  }, [page, size, refresh]) //page, size, refresh 중 하나가 바뀔때마다 실행
>>>>>>> origin/hyein

  return (
    <div className='border-2 border-blue-100 mt-10 mr-2 ml-2'>
            {/* 로딩중 모달 */}
            {fetching ? <FetchingModal /> : <></>}
            <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-4xl font-bold text-center text-gray-900 tracking-wide">Curated Cultural Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
<<<<<<< HEAD
            {serverData.dtoList.map(product => (
              <Card key={product.pno}
              className='bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden'
              onClick={() => moveToRead(product.pno)}>
                <div className="relative overflow-hidden">
                  <img src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`} alt={product.pname} className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-110" />
=======
            {serverData.dtoList.map( tour => (
              <Card key={tour.tno}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-white group"
              // className='bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden'
              onClick={() => moveToRead(tour.tno)}>
                <div className="relative overflow-hidden">
                  <img src={`${host}/api/tours/view/s_${tour.uploadFileNames[0]}`} alt={tour.pname} className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-110" />
>>>>>>> origin/hyein
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100">Learn More</Button>
                  </div>
                </div>
                <CardHeader className="text-center">
<<<<<<< HEAD
                  <CardTitle className="text-xl font-semibold tracking-wide text-gray-900">{product.pname}</CardTitle>
                  <CardDescription className="font-medium text-rose-600">{product.price} per person</CardDescription>
=======
                  <CardTitle className="text-xl font-semibold tracking-wide text-gray-900">{tour.tname}</CardTitle>
                  <CardDescription className="font-medium text-rose-600">₩{tour.tprice} per person</CardDescription>
>>>>>>> origin/hyein
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide">Reserve Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
            
            

            {/* page list */}
            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </div>
  )
}

export default TourListComponent