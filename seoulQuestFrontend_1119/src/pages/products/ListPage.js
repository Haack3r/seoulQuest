import React from 'react'
import ListComponent from '../../components/products/ListComponent'
import ListImage from '../../layouts/ListImage'
import ProductImage from '../../layouts/ProductImage'
import ProcessSteps from '../../layouts/ProcessSteps'
import AboutProductPage from './AboutProductPage'

const ListPage = () => {
    
  return (
    <div className='p-4 w-full' style={{ backgroundColor: "#E0DCD0" }}>
          <ProductImage />
          <ProcessSteps />
          {/* <AboutProductPage /> */}
        <ListComponent />
    </div>
  )
}

export default ListPage