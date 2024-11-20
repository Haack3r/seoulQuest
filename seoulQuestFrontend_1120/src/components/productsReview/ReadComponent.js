import React, { useEffect, useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove'
import { getOne } from '../../api/reviewApi';

const initState = {
    tno: 0,
    title: '',
    writer: '',
    dueDate: '',
    complete: false
}
const ReadComponent = ({ tno }) => {
    const [review, setReview] = useState(initState)
    const {moveToList, moveToModify} = useCustomMove()

    useEffect(() => {
      getOne(tno).then(data => {
            console.log(data)
            setReview(data)
      })
    }, [tno])


    
  return (
    <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
        {makeDiv('Tno', review.tno)}
        {makeDiv('Writer', review.writer)}
        {makeDiv('Title', review.title)}
        {makeDiv('만기일', review.dueDate)}
        {makeDiv('완료여부', review.complete? 'Completed' : 'Not Yet')}
        <div className='flex justify-end p-4'>
            <button type='button' className='rounded p-4 m-2 text-xl w-32 text-white bg-blue-500'
            onClick={() => moveToList()}>List</button>
            <button type='button' className='rounded p-4 m-2 text-xl w-32 text-white bg-red-500'
            onClick={() => moveToModify(tno)}>Modify</button>
        </div>
    </div>
  )
}
const makeDiv = (title, value) => 
<div className='flex justify-center'>
    <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
        <div className='w-1/5 p-6 text-right font-bold'>{title}</div>
        <div className='w-1/5 p-6 rounded-r border border-solid shadow-md'>{value}</div>
    </div>
</div>


export default ReadComponent