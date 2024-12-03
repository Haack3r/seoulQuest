import React, { useEffect, useState } from "react";
import { getOrderAndPaymentInfo } from "../../api/myPageApi";

const OrderComponent = () => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    getOrderAndPaymentInfo().then((data)=>{
      console.log(data);
      setOrders(data.map((item) => ({ ...item })));
    })
  }, [])
  

  // Open modal
  const openModal = (order) => {
    setSelectedOrder(order);
  };

  // Close modal
  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h1 className="text-xl font-bold text-gray-800">Order Details</h1>
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {orders.map((order,index) => (
          <div key={index}
            className="p-4 bg-gray-100 rounded-lg shadow-sm flex flex-col gap-4"
          >
            {/* Top Section: Payment Date and Total */}
            <div className="flex flex-wrap justify-between items-center">
              {/* Payment Date */}
              <div className="flex-1">
                <p className="text-sm text-gray-500">Payment Date</p>
                <p className="text-base text-gray-800 font-medium">{order.paymentDate}</p>
              </div>
                {/* Middle Section: Payment Details */}
            <div className="flex-1 text-right">
              <p className="text-sm text-gray-500">Payment Details</p>
             
              {order.paymentItems.map((item,index)=>(
                  <div key={index} className="flex gap-4">
                  <p className="text-base text-gray-800 font-medium">{item.pname}</p>
                  <p className="text-base text-gray-800 font-medium">{item.pqty}</p>
                  <p className="text-base text-gray-800 font-medium">{item.pprice}</p>
                </div>
              ))}
             
            </div>
              {/* Payment Total */}
              <div className="flex-1 text-right">
                <p className="text-sm text-gray-500">Payment Total</p>
                <p className="text-base text-gray-800 font-medium">2000</p>
              </div>
              {/* Payment method */}
              <div className="flex-1 text-right">
                <p className="text-sm text-gray-500">Payment method</p>
                <p className="text-base text-gray-800 font-medium">card</p>
              </div>
                 {/* Coupon */}
                 <div className="flex-1 text-right">
                <p className="text-sm text-gray-500">Used Coupon</p>
                <p className="text-base text-gray-800 font-medium">{order.usedCoupon? order.usedCoupon:'x'}</p>
              </div>
            </div>
            
            {/* Bottom Section: View Shipping Info */}
            <div className="text-right">
              <button
                onClick={() => openModal(order)}
                className="text-blue-600 font-semibold underline hover:text-blue-700 text-sm"
              >
                View Shipping Info
              </button>
            </div>
          </div>
        ))} 
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Shipping Information
            </h2>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Recipient Name</p>
              <p className="text-base text-gray-800 font-medium">
                {selectedOrder.fullName}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Recipient Contact</p>
              <p className="text-base text-gray-800 font-medium">
                {selectedOrder.phoneNumber}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Shipping Address</p>
              <p className="text-base text-gray-800 font-medium">
                {selectedOrder.country}, {selectedOrder.state}, {selectedOrder.city},
                 {selectedOrder.street}, {selectedOrder.zipCode}
              </p>
            </div>
            
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-stone-400 text-white py-2 rounded-md hover:bg-stone-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderComponent;
