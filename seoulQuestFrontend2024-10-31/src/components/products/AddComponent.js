import React, { useRef, useState } from 'react'
import { postAdd } from '../../api/productsApi'
import FetchingModal from '../common/FetchingModal'
import ResultModal from './../common/ResultModal';
import useCustomMove from './../../hooks/useCustomMove';

const initState = {
    pname: '',
    pdesc: '',
    pprice: 0,
    files: []
}

const AddComponent = () => {

    const [product, setProduct] = useState({...initState})
    const uploadRef = useRef()

    const [fetching, setFetching] = useState(false)     // 로딩 모달창 관리
    const [result, setResult] = useState(null)          // 결과 모달창 관리
    const {moveToList} = useCustomMove()                // 결과 모달창이 닫히면 목록 페이지로 이동

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({...product})
    }

    const handleClickAdd = (e) => {
        
        const files = uploadRef.current.files

        const formData = new FormData()

        for(let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        // other data
        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("pprice", product.pprice)

        console.log(formData)

        // ADD 버튼 클릭 시 모달창 띄움
        setFetching(true)

        // ADD 버튼 클릭 시 productsApi 의 postAdd() 호출
        postAdd(formData).then(data => {
            setFetching(false)
            setResult(data.result)
        })
    }

    // ResultModal 종료
    const closeModal = () => {
        setResult(null)
        moveToList({page:1})
    }

  return (
    <div className='border-2 border-sky-200 mt-10 m-2 p-4'>
        {fetching? <FetchingModal /> : <></>}
        {result?
            <ResultModal 
            title={'Product Add Result'}
            content={`${result}번 등록 완료`}
            callbackFn={closeModal}/> : <></>}
        <div className='flex justify-center'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>Product Name</div>
                <input className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'
                    name='pname'
                    type={'text'}
                    value={product.pname}
                    onChange={handleChangeProduct}></input>
            </div>           
        </div>
        <div className='flex justify-center'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>Desc</div>
                <textarea className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y'
                    name='pdesc'
                    rows='4'
                    onChange={handleChangeProduct}
                    value={product.pdesc}>{product.pdesc}</textarea>
            </div>           
        </div>
        <div className='flex justify-center'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>Price</div>
                <input className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'
                    name='price'
                    type={'number'}
                    value={product.pprice}
                    onChange={handleChangeProduct}></input>
            </div>           
        </div>
        <div className='flex justify-center'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <div className='w-1/5 p-6 text-right font-bold'>Files</div>
                <input ref={uploadRef} 
                    className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'
                    type={'file'} multiple={true}></input>
            </div>           
        </div>
        <div className='flex justify-end'>
            <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <button type='button' 
                    className='rounded p-4 w-36 bg-blue-500 text-xl text-white'
                    onClick={handleClickAdd}>ADD</button>
            </div>           
        </div>
    </div>
  )
}

export default AddComponent