import React from "react";

const PaymentMethodAndCoupon = ({
  selectedCoupon,
  handleCouponSelect,
  handleClickPaymentMethod,
  orderInfo,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-10 mt-5">
        Payment Method / Coupon
      </h3>
      <hr className="border-t border-gray-400 my-1 mb-5" />
      <div className="space-y-5">
        {/* Payment Method */}
        <fieldset className="text-gray-600">
          <legend className="block mb-2 font-semibold">Select Payment Method</legend>
          <div className="mt-2">
            <label className="mr-4">
              <input
                type="radio"
                name="payment"
                className="mr-2"
                value="card"
                onClick={handleClickPaymentMethod}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                className="mr-2"
                value="trans"
                onClick={handleClickPaymentMethod}
              />
              Bank Transfer
            </label>
          </div>
        </fieldset>
        <p className="text-sm text-gray-500">
          Please select your preferred payment method.
        </p>
        <hr className="border-t border-gray-400 my-4" />
        {/* Coupon Selection */}
        <label htmlFor="coupon-select" className="block text-gray-600 font-semibold">
          Coupon
        </label>
        <select
          id="coupon-select"
          value={selectedCoupon}
          onChange={handleCouponSelect}
          className="w-full mt-2 p-3 border rounded-md text-xs"
        >
          <option value="">Select a coupon</option>
          {orderInfo.coupons && orderInfo.coupons.length > 0 ? (
            orderInfo.coupons.map((coupon) => (
              <option key={coupon.couponName} value={coupon.couponName}>
                {coupon.couponName} discount ₩{coupon.discount}
              </option>
            ))
          ) : (
            <option value="emptyCoupon" disabled>
              No coupons available.
            </option>
          )}
        </select>
        <p className="text-xs text-gray-500 mt-2">
          * Please note that the minimum payment amount must be at least{" "}
          <span className="font-semibold">100 KRW</span> after applying the coupon.
        </p>
        <hr className="border-t border-gray-400 my-5" />
      </div>
      {/* Delivery Terms */}
      <div className="space-y-4 text-sm bg-gray-100 text-gray-500 my-8 rounded-lg p-5">
        <h4 className="font-semibold text-gray-700">Delivery Terms</h4>
        <p>
          Your order will be shipped within <span className="font-semibold">5 days</span>{" "}
          (excluding weekends and public holidays).
        </p>
        <p>
          If the item is out of stock or if there is an expected delay in shipping, we will
          notify you via <span className="font-semibold">Email</span>.
        </p>
        <hr className="border-t border-gray-400 my-4" />
        <h4 className="font-semibold text-gray-700">Need Assistance?</h4>
        <p>
          If you have any further questions, please contact{" "}
          <span className="font-semibold">Customer Service</span>.
        </p>
      </div>
    </div>
  );
};

export default PaymentMethodAndCoupon;
