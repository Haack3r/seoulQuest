import React, { useEffect, useState } from 'react'
import { getList } from '../../api/reviewApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import { StarFilled, StarOutlined } from '@ant-design/icons';

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const ListComponent = () => {
    const { page, size, refresh, moveToList, moveToRead} = useCustomMove();
    const [serverData, setServerData] = useState(initState);

    useEffect(() => {
        getList({ page, size }).then(data => {
            console.log(data);
            setServerData(data);
        })
        .catch((error) => {
            console.error('Error fetching list:', error)
        })
    }, [page, size, refresh])

    return (
        <div className='border-2 border-blue-100 mt-10 mr-2 ml-2'>
            <div className='flex flex-wrap mx-auto justify-center p-6'>
                {serverData.dtoList.map(review =>
                    <div key={review.prid} className='w-full min-w-[400px] p-2 m-2 rounded shadow-md'
                        onClick={() => moveToRead(review.prid)}>
                        <div className='flex'>
                            <div className='font-extrabold text-2xl p-2 w-1/12'>{review.prid}</div>
                            <div className='text-1xl m-1 p-2 w-8/12 font-extrabold'>{review.title}</div>
                            <div className='text-1xl m-1 p-2 w-8/12 font-extrabold'>{review.nickName}</div>
                            <div className='text-1xl m-1 p-2 2-2/10 font-medium'>{review.dueDate}</div>
                            <div className='text-1xl m-1 p-2 2-2/10 font-medium'>{review.itemName}</div>
                            <div className="w-3/4 flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className="cursor-pointer mr-2"
                                >
                                    {review.rating >= star ? (
                                        <StarFilled className="text-yellow-400 text-2xl" />
                                    ) : (
                                        <StarOutlined className="text-gray-300 text-2xl" />
                                    )}
                                </span>
                            ))}
                        </div>
                        </div>
                    </div>
                )}
            </div>
            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </div>
    )
}


export default ListComponent