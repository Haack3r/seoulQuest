import React, { useEffect, useState } from 'react'
import { deleteOne, getOne, putOne } from './../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';
import ResultModal from '../../components/common/ResultModal';

const initState = {
    tno: 0,
    title: '',
    writer: '',
    dueDate: 'null',
    complete: false
}

const ModifyComponent = ({tno}) => {

    const [todo, setTodo] = useState({...initState})
    const [result, setResult] = useState(null)
    const {moveToList, moveToRead} = useCustomMove()
       
    useEffect(() => {
        getOne(tno).then(data => setTodo(data))
    }, [tno])

    const handleClickModify = () => {
        putOne(todo).then(data => {
            // console.log("modify result: " + data)
            setResult('Modified')
        })
    }

    const handleClickDelete = () => {
        deleteOne(tno).then(data => {
            // console.log("delete result: " + data)
            setResult('Deleted')
        })
    }

    const closeModal = () => {
        if(result === 'Deleted') moveToList()
        else moveToRead(tno)
    }

    const handleChangeTodo = (e) => {
        todo[e.target.name] = e.target.value
        setTodo({...todo})
    }

    const handleChangeTodoComplete = (e) => {
        const value = e.target.value
        todo.complete = (value === 'Y')
        setTodo({...todo})
    }
    
  return (
    <div className='border-2 border-sky-200 mt-10 m-2 p-4'>
        {result?
        <ResultModal title={'처리결과'} content={result} callbackFn={closeModal} /> : <></>}
        <div className='flex justify-center mt-10'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>번호</div>
                <div className='w-4/5 p-6 rounder-r border border-solid shadow-md bg-gray-100'>
                    {todo.tno}
                </div>
            </div>
        </div>
        <div className='flex justify-center mt-10'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>작성자</div>
                <div className='w-4/5 p-6 rounder-r border border-solid shadow-md bg-gray-100'>
                    {todo.writer}
                </div>
            </div>
        </div>
        <div className='flex justify-center mt-10'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>제목</div>
                <input className='w-4/5 p-6 rounder-r border border-solid shadow-md border-neutral-300'
                    name='title' type={'text'} value={todo.title} onChange={handleChangeTodo}>
                </input>
            </div>
        </div>
        <div className='flex justify-center mt-10'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>만기일</div>
                <input className='w-4/5 p-6 rounder-r border border-solid shadow-md border-neutral-300'
                    name='dueDate' type={'date'} value={todo.dueDate} onChange={handleChangeTodo}>
                </input>
            </div>
        </div>
        <div className='flex justify-center mt-10'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>완료여부</div>
                <select name='stauts' className='border-solid border-2 rounded m-1 p-2'
                    onChange={handleChangeTodoComplete}
                    value={todo.complete? 'Y' : 'N'}>
                        <option value={'Y'}>완료</option>
                        <option value={'N'}>미완료</option>
                </select>
            </div>
        </div>
        <div className='flex justify-end p-4'>
            <button type='button'
                className='rounded p-4 m-2 text-xl w-32 text-white bg-red-500'
                onClick={handleClickDelete}>
                삭제
            </button>
            <button type='button'
                className='rounded p-4 m-2 text-xl w-32 text-white bg-blue-500'
                onClick={handleClickModify}>
                수정
            </button>
        </div>
    </div>
  )
}

export default ModifyComponent