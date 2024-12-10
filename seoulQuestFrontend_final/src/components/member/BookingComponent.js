import React, { useEffect, useState } from "react";
import { getTourAndPaymentInfo } from "../../api/myPageApi";

const BookingComponent = () => {

  const [reservations, setReservations] = useState([])
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    getTourAndPaymentInfo().then((data)=>{
      console.log(data);
      setReservations(data.map((item) => ({ ...item })));
    })
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b pb-4 mb-2">
        <h1 className="text-xl font-bold text-gray-800">Booking Details</h1>
      </div>
    
      {/* Order List */}
      <div className="space-y-4">
        {reservations.map((tour,index) => (
          <div key={index}
            className="flex flex-col "
          >
            <div className=" p-5 mr-3 ml-3">
            
            {tour.paymentItems.map((item,index)=>(
                  <div key={index} className="flex-1 gap-4 border-b">
                  <p className="text-left font-bold text-gray-600">{item.tname}</p>
                  <p className="text-right text-sm text-gray-800 font-medium">Date of the Tour: {item.tdate}</p>
                  <p className="text-right text-sm text-gray-800 font-medium">Number of Participants: {item.tqty}</p>
                  <p className="text-right text-sm text-gray-800 font-medium">₩{item.tprice}</p>
                    </div>
              ))}
            </div>
            {/* Top Section: Payment Date and Total */}
            {/* Payment Information Section */}
              {/* Payment Information Section */}
<div className="grid grid-cols-2 gap-4 p-5 border-b">
  {/* Empty Left Column */}
  <div></div>

  {/* Right Column with Payment Details */}
  <div className="space-y-2">
    {/* Payment Date */}
    <div className="flex justify-between">
      <span className="text-xs text-gray-500">Payment Date:</span>
      <span className="text-xs text-gray-800 font-medium">{tour.paymentDate}</span>
    </div>

    {/* Payment Method */}
    <div className="flex justify-between">
      <p className="text-xs text-gray-500">Payment Method:</p>
      <p className="text-xs text-gray-800 font-medium">{tour.paymentMethod}</p>
    </div>

    {/* Used Coupon */}
    <div className="flex justify-between">
      <p className="text-xs text-gray-500">Used Coupon:</p>
      <p className="text-xs text-gray-800 font-medium">
        {tour.usedCoupon ? tour.usedCoupon : 'x'}
      </p>
    </div>

    {/* Payment Total */}
    <div className="flex justify-between">
      <p className="text-xs text-gray-500">Payment Total:</p>
      <p className="text-xs text-gray-800 font-medium underline">₩{tour.totalPrice}</p>
    </div>
  </div>
</div>



            
          </div>
        ))} 
      </div>

    </div>
  )
}

export default BookingComponent