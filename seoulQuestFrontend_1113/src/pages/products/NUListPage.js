import React from 'react'
import NUListComponent from '../../components/products/NUListComponent'
import MainImage from './../../layouts/MainImage';
import ProcessSteps from '../../layouts/ProcessSteps';
import ProductImage from '../../layouts/ProductImage';
import AboutProductPage from './AboutProductPage';

const NUListPage = () => {
    
  return (
    <div className="p-4 w-full" style={{ backgroundColor: "#E0DCD0" }}>
        <ProductImage />
          <ProcessSteps />
          <AboutProductPage />
        <NUListComponent />
    </div>
  )
}

export default NUListPage