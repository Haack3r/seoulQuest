import React, { useEffect, useState } from "react";
import { Button, Badge } from "antd";
import {
  getAvailableCoupons,
  addCouponToMyList,
  getMyCoupons,
} from "../api/couponApi";
import useCustomLogin from "../hooks/useCustomLogin";

const CouponComponent = () => {
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [myCoupons, setMyCoupons] = useState([]);
  const { loginState } = useCustomLogin();

  const email = loginState.email;

  useEffect(() => {
    fetchAvailableCoupons();
    fetchMyCoupons();
  }, []);

  const fetchAvailableCoupons = async () => {
    try {
      const userEmail = email; // Fetch user email from local storage or user object
      const coupons = await getAvailableCoupons(userEmail); // Pass email as parameter
      console.log("Email passed to getAvailableCoupons:", userEmail);
      setAvailableCoupons(coupons);
    } catch (error) {
      console.error("Error fetching available coupons:", error);
    }
  };

  const fetchMyCoupons = async () => {
    try {
      const coupons = await getMyCoupons(email);
      setMyCoupons(
        coupons.map((coupon) => ({
          ...coupon,
          isUsed: coupon.useDate !== null, // Add isUsed property
        }))
      );
    } catch (error) {
      console.error("Error fetching my coupons:", error);
    }
  };

  const handleAddCoupon = async (couponId) => {
    const coupon = myCoupons.find((coupon) => coupon.couponId === couponId);
    if (coupon?.isUsed) {
      alert("This coupon has already been used!");
      return;
    }
    if (coupon) {
      alert("You already added this coupon!");
      return;
    }

    try {
      await addCouponToMyList(couponId, email);
      fetchMyCoupons();
      alert("Coupon added to your list!");
    } catch (error) {
      console.error("Error adding coupon to my list:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-100 mt-16 mb-10">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-10">Coupons</h1>

      {/* New Offers Section */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-4 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">New Offers</h2>
        {availableCoupons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {availableCoupons.map((coupon) => {
              const isAlreadyAdded = myCoupons.some(
                (myCoupon) => myCoupon.couponId === coupon.couponId
              );

              return (
                <div
                  key={coupon.couponId}
                  className={`p-3 ${
                    isAlreadyAdded ? "bg-white" : "bg-gray-200"
                  } text-gray-900 rounded-md shadow-sm flex flex-col justify-between`}
                >
                  <div>
                    <h3 className="text-base font-bold">{coupon.couponName}</h3>
                    <p className="text-xs">Expires: {coupon.expirationDate}</p>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <Badge
                      count={`₩${coupon.discount}`}
                      style={{ backgroundColor: "#52c41a" }}
                    />
                    <Button
                      onClick={() => handleAddCoupon(coupon.couponId)}
                      disabled={isAlreadyAdded}
                      className={`${
                        isAlreadyAdded
                          ? "bg-gray-300 text-gray-600"
                          : "bg-yellow-500 text-white font-bold"
                      }`}
                    >
                      {isAlreadyAdded ? "Added To My Coupon" : "Add"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No new offers available.</p>
        )}
      </div>
    </div>
  );
};

export default CouponComponent;
