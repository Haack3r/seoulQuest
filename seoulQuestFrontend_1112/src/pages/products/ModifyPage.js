import React from 'react'
import ModifyComponent from '../../components/products/ModifyComponent'
import { useParams } from 'react-router-dom'

const ModifyPage = () => {

  const { pno } = useParams()

  return (
    <div className='p-4 w-full bg-white'>
      <div className='text-3xl font-extrabold'>
        Products Modify Page

      </div>
      <ModifyComponent pno={pno} />
    </div>
  )
}

export default ModifyPage