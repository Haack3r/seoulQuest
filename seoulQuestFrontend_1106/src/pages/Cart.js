import React from 'react'
import BasicLayout from '../layouts/BasicLayout'
import CartComponent from '../components/menus/CartComponent'
import ReservationComponent from '../components/menus/ReservationComponent'

const Cart = () => {
  return (
    <BasicLayout>
        <div className='flex justify-center items-center h-screen w-full p- space-x-4 bg-gray-100'>
          {/* CartComponent와 ReservationComponent를 중앙 정렬 */}
          <div className='w-1/2 max-w-md'>
            <CartComponent />
          </div>
          <div className='w-1/2 max-w-md'>
            <ReservationComponent />
          </div>
        </div>
    </BasicLayout>
  )
}

export default Cart
