import React, { useState } from 'react'
import { API_SERVER_HOST } from '../../api/todoApi';
import { UserOutlined ,DeleteOutlined} from "@ant-design/icons";

const host = API_SERVER_HOST

const ReservationItemComponent = ({rino, tname, tprice, tdate, tno, tqty, imageFile, changeReservation, email, maxCapacity ,availableCapacity}) => {
    console.log("여기는 Reservation Items")

    const handleCLickQty = (amount) => {
        changeReservation({ email, rino, tno, tdate,tqty: tqty + amount})
    }

  return (
    <div key = {rino} >  
        {/* Select options */}
        <div className="space-y-2">
        <div className="text-gray-900 text-lg font-bold flex justify-between mt-8">
            <div>{tname}</div>
            <button 
                className="flex items-center space-x-2 p-2 bg-gray-100 text-red-600 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-200"
                onClick={() => handleCLickQty(-1 * tqty)}
            >
                <DeleteOutlined className="text-lg" />
                <span className="text-sm font-semibold">Delete</span>
            </button>
        </div>
        <div className='m-1 p-1'>
            <img className=' rounded-lg shadow-lg' src={`${host}/api/tours/view/s_${imageFile}`}/>
        </div>

        {/* Date Selection */}
        <div className="flex items-center justify-between p-3 border border-stone-400 rounded-lg cursor-pointer">
            <span className="text-xm text-stone-900 font-semibold">📅 {tdate}</span>
        </div>

            {/* Quantity Selection */}
            <div className="space-y-4">
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center text-gray-700 mb-2">
                        <UserOutlined className="mr-2" /> 
                        <span>Max Participants:</span> 
                        <span className="ml-1">{maxCapacity}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <UserOutlined className="mr-2" /> 
                        <span>Available Participants: 나중에 수정!</span>
                        {/* 실제 이용가능한 인원, 나중에 실제 결제 정보 받아서 수정하기  */}
                        {/* <span className="ml-1">{availableCapacity}</span> */}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Quantity </label>
                    <p className="text-xs text-gray-500 mb-2">You can select up to 5 for this package</p>
                
                    
                    <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-3">
                        <span className="text-gray-700 font-semibold">Adult (aged 18+)</span>
                        <div className="flex items-center space-x-3">
                            <button onClick={()=> handleCLickQty(-1)} className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">-</button>
                            <span className="text-gray-700">{tqty}</span>
                            <button onClick={()=> handleCLickQty(1)} className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <div className='justify-center p-2 text-xl border-b-2'>
                {/* <div className='jsutify-end w-full'>
                </div>
                <div>Reservation Item No: {rino}</div>
                <div>Tno: {tno}</div>
                <div>Name: {tname}</div>
                <div>Price: {tprice}</div>
                <div>Date: {tdate}</div>
                <div className='flex'>
                    <div className='w-2/3'>
                    Qty: {tqty}
                    </div>
                    <div>
                    <button className='m-1 p-1 text-2xl bg-orange-500 w-8 rounded-lg' 
                    onClick={()=> handleCLickQty(1)}>
                            +
                        </button>
                        <button className='m-1 p-1 text-2xl bg-orange-500 w-8 rounded-lg' 
                        onClick={()=> handleCLickQty(-1)}>
                            -
                        </button>
                    </div>
                </div>
                <div> */}
                    
                    <div className='font-extrabold text-right mt-1 pt-2'>
                        ₩{tqty * tprice} 
                    </div>
                </div>
            </div>
            // </div>
    // </li>
  );
}

export default ReservationItemComponent