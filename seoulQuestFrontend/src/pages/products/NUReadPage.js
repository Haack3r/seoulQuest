import React from 'react'
import { useParams } from 'react-router-dom'
import NUReadComponent from '../../components/products/NUReadComponent'

const NUReadPage = () => {

    const {pno} = useParams()

  return (
    <div className='p-4 w-full bg-white'>
        <div className='text-3xl font-extrabold'>
            Product Read Page
        </div>
        <NUReadComponent pno={pno}></NUReadComponent>
    </div>
  )
}

export default NUReadPage