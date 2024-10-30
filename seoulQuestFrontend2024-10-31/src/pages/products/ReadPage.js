import React from 'react'
import ReadComponent from '../../components/products/ReadComponent'
import { useParams } from 'react-router-dom'
import { ClimbingBoxLoader } from 'react-spinners'

const ReadPage = () => {
    
    const {pno} = useParams()
    console.log("조회 : " ,pno) 
  return (
    <div className='p-4 w-full bg-white mt-20'>
        <ReadComponent pno={pno}></ReadComponent>
    </div>
  )
}

export default ReadPage