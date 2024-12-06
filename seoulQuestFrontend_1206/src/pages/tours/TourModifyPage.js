import React from 'react'
import TourModifyComponent from '../../components/tours/TourModifyComponent'
import { useParams } from 'react-router-dom'

const TourModifyPage = () => {

    const {tno} = useParams()
    return (
        <div className='p-4 w-full bg-white'>
            <div className='text-3xl font-extrabold'>
                TourModifyPage
            </div>
            <TourModifyComponent tno={tno} />
        </div>
  )
}

export default TourModifyPage