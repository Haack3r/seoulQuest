import React, { useEffect, useRef, useState } from 'react'
import { getOne, putOne, deleteOne } from '../../api/productsApi'
import FetchingModal from '../common/FetchingModal'
import { API_SERVER_HOST } from '../../api/todoApi'
import useCustomMove from '../../hooks/useCustomMove'
import ResultModal from '../common/ResultModal'

const host = API_SERVER_HOST

const initState = {
    pno: 0,
    pname: '',
    pdesc: '',
    pprice: 0,
    uploadFileNames: []
}

const ModifyComponent = ({ pno }) => {
    const [product, setProduct] = useState(initState)
    const [fetching, setFetching] = useState(false)
    const [result, setResult] = useState(null)
    const { moveToRead, moveToList, page, size } = useCustomMove()
    const uploadRef = useRef()

    useEffect(() => {
        setFetching(true)
        getOne(pno).then(data => {
            setProduct(data)
            setFetching(false)
        })
    }, [pno])

    // p286 이벤트 처리
    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({ ...product })
    }

    // p289 기존 이미지 삭제
    const deleteOldImages = (imageName) => {
        const resultFileNames = product.uploadFileNames.filter(
            fileName => fileName !== imageName)
        product.uploadFileNames = resultFileNames

        setProduct({ ...product })
    }

    // p290 이미지 추가 및 수정 submit
    const handleClickModify = () => {
        const files = uploadRef.current.files
        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        // other Data
        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.pprice)
        formData.append("delFlag", product.delFlag)

        for (let i = 0; i < product.uploadFileNames.length; i++) {
            formData.append("uploadFileNames", product.uploadFileNames[i]);
        }

        // fetching
        setFetching(true)
        // 수정 처리
        putOne(pno, formData).then(data => {
            setResult('Modified')
            setFetching(false)
        })

    }

    const handleClickDelete = () => {
        setFetching(true)
        deleteOne(pno).then(data => {
            setResult('Deleted')
            setFetching(false)
        })
    }

    const closeModal = () => {
        if (result === 'Modified') {
            moveToRead(pno)
        } else if (result === 'Deleted') {
            // moveToList({ page: 1 })
            moveToList({ page, size })
        }
        setResult(null)
    }

    return (
        <div className='border-2 border-sky-200 mt-10 m-2 p-4'>
            {fetching ? <FetchingModal /> : <></>}
            {result ? <ResultModal
                title={`${result}`}
                content={'정상적으로 처리되었습니다.'}
                callbackFn={closeModal}
            /> : <></>}
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
                    <div className='w-1/5 p-6 text-right font-bold'>DESC</div>
                    <textarea className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y'
                        name='pdesc'
                        rows='4'
                        onChange={handleChangeProduct}
                        value={product.pdesc}></textarea>
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
                    <div className='w-1/5 p-6 text-right font-bold'>Delete</div>
                    <select className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'
                        name='delFlag'
                        value={product.delFlag}
                        onChange={handleChangeProduct}>
                        <option value={false}>사용</option>
                        <option value={true}>삭제</option>
                    </select>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>Files</div>
                    <input className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'
                        ref={uploadRef}
                        multiple={true}
                        type={'file'}></input>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>Images</div>
                    <div className='w-4/5 justify-center flex flex-wrap items-start'>
                        {product.uploadFileNames.map((imgFile, i) =>
                            <div className='flex justify-center flex-col w-1/3 m-1 align-baseline' key={i}>
                                <button className='bg-blue-500 text-3xl text-white'
                                    onClick={() => deleteOldImages(imgFile)}>Delete</button>
                                <img src={`${host}/api/products/view/s_${imgFile}`} alt='img' />
                            </div>
                        )}</div>
                </div>
            </div>
            <div className='flex justify-end p-4'>
                <button type='button' className='inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500'
                    onClick={handleClickDelete}>Delete</button>
                <button type='button' className='inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500'
                    onClick={handleClickModify}>Modify</button>
                <button type='button' className='rounded p-4 m-2 text-xl w-32 text-white bg-blue-500'
                    onClick={() => moveToList({ page, size })}>List</button>
            </div>
        </div>
    );
}

export default ModifyComponent