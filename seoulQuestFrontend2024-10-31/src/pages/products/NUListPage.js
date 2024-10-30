import React from 'react'
import NUListComponent from '../../components/products/NUListComponent'
import MainImage from './../../layouts/MainImage';
import ProcessSteps from '../../layouts/ProcessSteps';

const NUListPage = () => {
    
  return (
    <div className='p-4 w-full bg-white'>
        {/* <MainImage />
        <ProcessSteps /> */}
        <NUListComponent />
    </div>
  )
}

export default NUListPage