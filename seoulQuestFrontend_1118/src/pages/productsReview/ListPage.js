import React from 'react'
import ListComponent from '../../components/productsReview/ListComponent'

const ListPage = () => {
  return (
    <div className='p-4 w-full bg-white'>
        <div className='text-3xl font-extrabold'>
            Product Review List Page Component
        </div>
        <ListComponent />
    </div>
  )
}

export default ListPage