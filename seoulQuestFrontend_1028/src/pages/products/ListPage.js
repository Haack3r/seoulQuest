import React from 'react'
import ListComponent from '../../components/products/ListComponent'
import ListImage from '../../layouts/ListImage'
import ProductImage from '../../layouts/ProductImage'

const ListPage = () => {
    
  return (
    <div className='p-4 w-full bg-white'>
        <ProductImage />
        <ListComponent />
    </div>
  )
}

export default ListPage