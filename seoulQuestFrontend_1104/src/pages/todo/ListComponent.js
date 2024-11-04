import React, { useEffect, useState } from 'react'
import { getList } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../../components/common/PageComponent';

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
    // 사용자 정의 custom hook에서 반환되는 객체를 destructuring하여 변수에 저장하고 아래에서 자식으로 전달함
    // 그 자식은 객체로 전달받음(그것을 react에서 props라고 함)
    // 객체로 전달받은 것을 destructuring하여 사용
    const [serverData, setServerData] = useState(initState);
    // API서버를 통하여 전달받은 데이터
    // 목록뿐 아니라 페이징 처리에 필요한 모든 정보가 같이 전달

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
                {serverData.dtoList.map(todo =>
                    <div key={todo.tno} className='w-full min-w-[400px] p-2 m-2 rounded shadow-md'
                        onClick={() => moveToRead(todo.tno)}>
                        <div className='flex'>
                            <div className='font-extrabold text-2xl p-2 w-1/12'>{todo.tno}</div>
                            <div className='text-1xl m-1 p-2 w-8/12 font-extrabold'>{todo.title}</div>
                            <div className='text-1xl m-1 p-2 2-2/10 font-medium'>{todo.dueDate}</div>
                        </div>
                    </div>
                )}
            </div>
            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </div>
    )
}


export default ListComponent