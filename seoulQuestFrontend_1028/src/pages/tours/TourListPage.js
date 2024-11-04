import React from 'react'
import TourListComponent from '../../components/tours/TourListComponent'
import TourImage from '../../layouts/TourImage'

const TourListPage = () => {
  return (
    <div className='p-4 w-full bg-white'>
        <TourImage />
        <TourListComponent />
    </div>
  )
}

export default TourListPage