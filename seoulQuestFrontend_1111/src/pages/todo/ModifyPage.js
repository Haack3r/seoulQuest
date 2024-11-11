import React from 'react'
import { useParams } from 'react-router-dom'
import ModifyComponent from './ModifyComponent'

const ModifyPage = () => {
    const {tno} = useParams()
   
  return (
    <div className='p-4 w-full bg-white'>
      <div className='text-3xl font-extrabold'>
        Todo Modify Page
      </div>
      <ModifyComponent tno={tno} />        
    </div>
  )
}

export default ModifyPage