import React, { useEffect, useState } from 'react';
import { UserOutlined, ShoppingCartOutlined, HeartOutlined, CarOutlined, QuestionCircleOutlined, TagsOutlined, CalendarOutlined } from '@ant-design/icons';
import {getUserInfo } from "../../api/myPageApi";
import useCustomLogin from '../../hooks/useCustomLogin';
import { useNavigate } from 'react-router-dom';

const initState = {
    email : "",
    fullname : "", 
    nickName : "",
  };

const MyPageComponent = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({...initState})


    useEffect(() => {
        getUserInfo().then((data)=>{
        console.log(data)
        setUserInfo(data)
        })
    }, [])
    

    return (
      <div className="flex justify-center items-center min-h-screen mt-20 mb-10">
        <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-2xl">

          {/* 헤더 */}
          <header className="flex justify-between items-center mb-8 border-b pb-4 border-gray-300">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-stone-500 to-gray-600">
                  Hello, {userInfo.nickName}! 
              </h1>
          </header>

          {/* 프로필 카드 */}
          <section className="relative mb-10 p-8 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-xl overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none" 
                   style={{
                     backgroundImage: "url('https://cdn.pixabay.com/photo/2017/10/11/02/13/hanok-2839691_1280.jpg')",
                     backgroundSize: "cover",
                     opacity: 0.5
                   }}>
              </div>
              <div className="relative z-10 text-center">
                  <div className="flex justify-center mb-6">
                      <UserOutlined className="text-6xl text-stone-500 border-2 border-gray-300 rounded-full p-2 bg-white shadow-md" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-wide"> {userInfo.fullname} </h2>
                  <p className="text-gray-800 mb-6"> {userInfo.email}</p>
                  <button className="text-indigo-50 bg-gray-800 hover:bg-gray-900 py-2 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                        onClick={()=>navigate('/mypage/editProfile')}
                        >
                      Edit Profile
                  </button>
              </div>
          </section>

          {/* 카드 섹션 */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
 
            {/* 관심 상품 카드 */}
              <div className="p-6 text-center bg-gray-100 hover:bg-gray-200 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  <HeartOutlined className="text-4xl text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Wishlist</h3>
                  <p className="text-gray-500 mb-4">See items you have saved</p>
                  <button className="text-white bg-gray-700 hover:bg-gray-800 py-2 px-4 rounded-full shadow-md">
                      View Wishlist
                  </button>
              </div>

              {/* 주문 내역 카드 */}
              <div className="p-6 text-center bg-gray-100 hover:bg-gray-200 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  <ShoppingCartOutlined className="text-4xl text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Orders</h3>
                  <p className="text-gray-500 mb-4">View your recent orders</p>
                  <button className="text-white bg-gray-700 hover:bg-gray-800 py-2 px-4 rounded-full shadow-md">
                      View Orders
                  </button>
              </div>

              
              {/* 배송 카드 */}
              <div className="p-6 text-center bg-gray-100 hover:bg-gray-200 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CarOutlined className="text-4xl text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Delivery</h3>
                  <p className="text-gray-500 mb-4">Track your shipments</p>
                  <button className="text-white bg-gray-700 hover:bg-gray-800 py-2 px-4 rounded-full shadow-md">
                      View Delivery
                  </button>
              </div>

              {/* 쿠폰 카드 */}
              <div className="p-6 text-center bg-gray-100 hover:bg-gray-200 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  <TagsOutlined className="text-4xl text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Coupons</h3>
                  <p className="text-gray-500 mb-4">Check available discounts</p>
                  <button className="text-white bg-gray-700 hover:bg-gray-800 py-2 px-4 rounded-full shadow-md">
                      View Coupons
                  </button>
              </div>

              {/* 예약 카드 */}
              <div className="p-6 text-center bg-gray-100 hover:bg-gray-200 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CalendarOutlined className="text-4xl text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Reservations</h3>
                  <p className="text-gray-500 mb-4">Manage your bookings</p>
                  <button className="text-white bg-gray-700 hover:bg-gray-800 py-2 px-4 rounded-full shadow-md">
                      View Reservations
                  </button>
              </div>


              {/* Q&A 카드 */}
              <div className="p-6 text-center bg-gray-100 hover:bg-gray-200 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  <QuestionCircleOutlined className="text-4xl text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Q&A</h3>
                  <p className="text-gray-500 mb-4">Find answers to your questions</p>
                  <button className="text-white bg-gray-700 hover:bg-gray-800 py-2 px-4 rounded-full shadow-md">
                      View Q&A
                  </button>
              </div>
          </section>
          </div>
    </div>
    );
}

export default MyPageComponent;
