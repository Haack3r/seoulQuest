import React from 'react'
import ReadComponent from '../../components/products/ReadComponent'
import { useParams } from 'react-router-dom'

const ReadPage = () => {

    const {pno} = useParams()

  return (
    <div className='p-4 w-full bg-white mt-20'>
        {/* <div className='m-10 text-3xl font-extrabold'>
            Souvenirs
        </div> */}
        <ReadComponent pno={pno}></ReadComponent>
    </div>
  )
}

export default ReadPage