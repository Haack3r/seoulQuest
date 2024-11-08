import React, { useEffect } from 'react'
import TourReadComponent from '../../components/tours/TourReadComponent'
import { useParams } from 'react-router-dom'

const TourReadPage = () => {

  const {tno} = useParams()
  
  return (
    <div className='p-4 w-full bg-white'>
      <TourReadComponent tno={tno}></TourReadComponent>
    </div>
  )
}

export default TourReadPage