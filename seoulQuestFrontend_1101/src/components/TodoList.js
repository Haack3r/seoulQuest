import axios from 'axios'
import React from 'react'


const TodoList = () => {
  const API_SERVER_HOST = "http://localhost:8080"
  const prefix = `${API_SERVER_HOST}/api/todo`
  const f = () => {
    console.log("버튼이 눌렸어요")
    const getList = async (pageParam) => {
      const {page, size} = pageParam
      const res = await axios.get(`${prefix}/list`, {params : {page, size}})
      console.log(res)
    }
    getList({pageParam: {page: 1, size: 12}}) //todoApi의 arrow 함수 호출
  } 
  return (
    <div>
        <button onClick={f}>데이터 전체조회</button>
    </div>
  )
}

export default TodoList