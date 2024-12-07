import React from "react";

const PaymentDetails = ({
  calculateSelectedItemsPrice,
  discountAmount,
  handleClickBuyNow,
  shippingFee
}) => {
 
  const totalPayment = Math.max(
    calculateSelectedItemsPrice() + shippingFee - discountAmount,100
  );

  console.log("totalPayment",totalPayment)

  return (
    <div className="sticky top-20 p-6 bg-white rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Details</h3>
      <div className="flex justify-between mb-4">
        <p>Product Price</p>
        <p>₩{calculateSelectedItemsPrice().toLocaleString()}</p>
      </div>
      <div className="flex justify-between mb-4">
        <p>Shipping Fee</p>
        <p>₩{shippingFee.toLocaleString()}</p>
      </div>
      <div className="flex justify-between mb-4 text-blue-400">
        <p>Discount Amount</p>
        <p>- ₩{discountAmount.toLocaleString()}</p>
      </div>
      <hr className="border-t border-gray-400 my-4" />
      <div className="flex justify-between text-lg font-semibold text-gray-900">
        <p>Total Payment</p>
        <p>₩{totalPayment.toLocaleString()}</p>
      </div>

      {/* 상품 추가 안내 메시지 */}
      {calculateSelectedItemsPrice() === 0 && (
        <p className="text-sm text-red-500 mt-2">
          Please add at least one product to your order.
        </p>
      )}

      {/* 100원 이상만 결제 가능하다는 안내 메시지 */}
      {totalPayment === 100 && (
        <p className="text-sm text-gray-500 mt-2">
          The minimum payment amount is 100 KRW.
        </p>
      )}

      <button
        className="w-full max-w-6xl bg-gray-500 text-white py-3 mt-10 rounded-md hover:bg-gray-600 transition font-semibold"
        onClick={handleClickBuyNow}
      >
        BUY NOW
      </button>
    </div>
  );
};

export default PaymentDetails;
