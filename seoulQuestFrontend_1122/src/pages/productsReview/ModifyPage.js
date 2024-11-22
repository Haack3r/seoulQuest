import React from 'react'
import { useParams } from 'react-router-dom'
import ModifyComponent from '../../components/productsReview/ModifyComponent'


const ModifyPage = () => {
    const {prid} = useParams()
   
  return (
    <div className='p-4 w-full bg-white'>
      <div className='text-3xl font-extrabold'>
        product review Modify Page
      </div>
      <ModifyComponent prid={prid} />        
    </div>
  )
}

export default ModifyPage