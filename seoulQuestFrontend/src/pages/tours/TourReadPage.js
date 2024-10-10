import React from 'react'
import TourReadComponent from '../../components/tours/TourReadComponent'
import { useParams } from 'react-router-dom'

const TourReadPage = () => {

    const {pno} = useParams()

  return (
    <div className='p-4 w-full bg-white'>
        <div className='text-3xl font-extrabold'>
            Tour Read Page
        </div>
        <TourReadComponent pno={pno}></TourReadComponent>
    </div>
  )
}

export default TourReadPage