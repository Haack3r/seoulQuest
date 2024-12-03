import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import CartComponent from '../components/menus/CartComponent';
import ReservationComponent from '../components/menus/ReservationComponent';

const Cart = () => {
  return (
    <BasicLayout>
      <div className="bg-gray-100 pt-10 pb-10">
        {/* Title Section */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mt-16 mb-10">
          My Cart
        </h1>

        <div className="flex justify-center items-start min-h-screen w-full p-4 space-x-4 mt-10">
          {/* CartComponent and ReservationComponent Centered */}
          <div className="w-1/2 max-w-md">
            <CartComponent />
          </div>
          <div className="w-1/2 max-w-md">
            <ReservationComponent />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Cart;
