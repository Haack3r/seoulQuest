import React, { useEffect } from 'react'
import TourReadComponent from '../../components/tours/TourReadComponent'
import { useParams } from 'react-router-dom'
import NUTourReadComponent from '../../components/tours/NUTourReadComponent'

const NUTourReadPage = () => {

  const {tno} = useParams()
  
  return (
    <div className='p-4 w-full bg-white'>
        <NUTourReadComponent tno={tno}></NUTourReadComponent>
    </div>
  )
}

export default NUTourReadPage