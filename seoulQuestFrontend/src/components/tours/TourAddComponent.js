import React, { useRef, useState } from 'react'
import FetchingModal from '../common/FetchingModal'
import ResultModal from '../common/ResultModal'
import { postAdd } from '../../api/tourApi'
import useCustomMove from '../../hooks/useCustomMove'


const initState = {
    tname: '',
    tdesc: '',
    price: 0,
    files:[]
}

const TourAddComponent = () => {
    const [tour, setTour] = useState({ ...initState })
    const [fetching, setFetching] = useState(false)
    const [result, setResult] = useState(null)
    const uploadRef = useRef()
    const { moveToList, page, size } = useCustomMove()

    const handleChangeTour = (e) => {
        tour[e.target.name] = e.target.value
        setTour({...tour})
    }

    const handleClickAdd = (e) => {
        const files = uploadRef.current.files
        const formData = new FormData()

        for (let i = 0; i < files.length; i++){
            formData.append("files",files[i])
        }

        //other data
        formData.append("tname", tour.tname)
        formData.append("tdesc", tour.tdesc)
        formData.append("price", tour.price)

        console.log(formData)

        //ADD버튼 클릭시 모달창 띄움
        setFetching(true)

        //ADD버튼 클릭시 toursApi 의 postAdd()호출
        postAdd(formData).then(data => {
            setFetching(false)
            console.log(data.result)
            setResult(data.result)
        })
    }

     const closeModal = () => {
            setResult(null)
         // moveToList({page:1})
            moveToList({page:page, size:size})
        }

    return (
      <div className='border-2 border-sky-200 mt-10 m-2 p-4'>
          {fetching ? <FetchingModal /> : <></>}
          {result ? 
              <ResultModal  
                title={'Tour Add Result'}
                content={`${result}번 등록 완료`}
                    callbackFn={closeModal} /> : <></>}
            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>Tour Name</div>
                    <input className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'
                        name='tname'
                        type="text"
                        value={tour.tname}
                        onChange={handleChangeTour}
                    ></input>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>Desc</div>
                    <textarea className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y'
                        name="tdesc"
                        rows='4'
                        onChange={handleChangeTour}
                        value={tour.tdesc}>{tour.tdesc}
                    </textarea>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>Price</div>
                    <input className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'
                        name='price'
                        type={'number'}
                        value={tour.price}
                        onChange={handleChangeTour}
                        ></input>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>Files</div>
                    <input ref={uploadRef}
                        className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'
                        type={'file' } multiple={true} />
                </div>
            </div>
            <div className='flex justify-end'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <button type='button'
                        className='rounded p-4 w-36 bg-blue-500 text-xl text-white'
                        onClick={handleClickAdd}
                    >ADD</button>
                </div>
            </div>
    </div>
  )
}

export default TourAddComponent