<<<<<<< HEAD
import React from 'react'
=======
import React, { useEffect } from 'react'
>>>>>>> origin/hyein
import TourReadComponent from '../../components/tours/TourReadComponent'
import { useParams } from 'react-router-dom'

const TourReadPage = () => {

<<<<<<< HEAD
    const {pno} = useParams()

  return (
    <div className='p-4 w-full bg-white'>
        <div className='text-3xl font-extrabold'>
            Tour Read Page
        </div>
        <TourReadComponent pno={pno}></TourReadComponent>
=======
  const {tno} = useParams()
  
  return (
    <div className='p-4 w-full bg-white'>
        <div className='text-3xl font-extrabold'>
          Tour Reservation
        </div>
        <TourReadComponent tno={tno}></TourReadComponent>
>>>>>>> origin/hyein
    </div>
  )
}

export default TourReadPage