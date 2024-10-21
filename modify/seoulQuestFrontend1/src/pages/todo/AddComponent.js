import React, { useState } from 'react'
import { postAdd } from '../../api/todoApi'
import ResultModal from '../../components/common/ResultModal'
import useCustomMove from '../../hooks/useCustomMove'

const initState = {
    title: '',
    writer: '',
    dueDate: ''
}

const AddComponent = () => {

    const [todo, setTodo] = useState({...initState})
    const [result, setResult ] = useState(null) // 결과 상태
    const {moveToList} = useCustomMove()

    const handleChangeTodo = (e) => {
        todo[e.target.name] = e.target.value
        setTodo({...todo})
        // 리액트는 기존 데이터의 값을 변경하면 안되므로 기존 변수의 값이 변경되는 것은 배열의 push를 사용하지만
        // 리액트는 기존 변수의 값이 변경되지 않는 순수함수(pure function)의 철학이 있으므로
        // todo 변수의 배열에 값을 추가할때는 ...(spread operator) 활용
    }
    
    const handleClickAdd = () => {
        // console.log(todo)
        postAdd(todo)
        .then(result => {
            console.log(result)
            setResult(result.tno)   //결과 데이터 반영
            setTodo({...initState}) //초기화
        }).catch(e => {
            console.error(e)
        })
    }

    const closeModal = () => {
        setResult(null)
        moveToList()
    }

  return (
    <div className='border-2 border-sky-200 mt-10 m-2 p-4'>
        {/* 모달 처리 */}
        {result?
        <ResultModal title = {`Add Result`} content={`New ${result} Added`} callbackFn={closeModal} /> : <></>}
        <div className='flex justify-center'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>제목</div>
                <input className='w-4/5 p-6 rounder-r border border-solid border-neutral-500 shadow-md'
                    name='title' type={'text'} value={todo.title} onChange={handleChangeTodo}>
                </input>
            </div>
        </div>
        <div className='flex justify-center'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>작성자</div>
                <input className='w-4/5 p-6 rounder-r border border-solid border-neutral-500 shadow-md'
                    name='writer' type={'text'} value={todo.writer} onChange={handleChangeTodo}>
                </input>
            </div>
        </div>
        <div className='flex justify-center'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>만기일</div>
                <input className='w-4/5 p-6 rounder-r border border-solid border-neutral-500 shadow-md'
                    name='dueDate' type={'date'} value={todo.dueDate} onChange={handleChangeTodo}>
                </input>
            </div>
        </div>
        <div className='flex justify-center'>
            <div className='relative mb-4 flex p-4 flex-wrap items-stretch'>
                <button type='button'
                className='rounded p-4 w-36 bg-blue-500 text-xl text-white'
                onClick={handleClickAdd}>ADD</button>
            </div>
        </div>

    </div>
  )
}

export default AddComponent