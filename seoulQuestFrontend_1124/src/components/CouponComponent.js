import React, { useEffect, useState } from "react";
import { Button, Badge } from "antd";
import {
  getAvailableCoupons,
  addCouponToMyList,
  getMyCoupons,
} from "../api/couponApi";

const CouponComponent = () => {
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [myCoupons, setMyCoupons] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  useEffect(() => {
    fetchAvailableCoupons();
    fetchMyCoupons();
  }, []);

  const fetchAvailableCoupons = async () => {
    try {
        const userEmail = user?.email; // Fetch user email from local storage or user object
        console.log(userEmail)
        const coupons = await getAvailableCoupons(userEmail); // Pass email as parameter
        setAvailableCoupons(coupons);
    } catch (error) {
        console.error("Error fetching available coupons:", error);
    }
};


    const fetchMyCoupons = async () => {

    try {
        const coupons = await getMyCoupons(email);
        setMyCoupons(coupons.map(coupon => ({
            ...coupon,
            isUsed: coupon.useDate !== null, // Add isUsed property
        })));
    } catch (error) {
        console.error("Error fetching my coupons:", error);
    }
};

  

const handleAddCoupon = async (couponId) => {
    const coupon = myCoupons.find(coupon => coupon.couponId === couponId);
    if (coupon?.isUsed) {
        alert("This coupon has already been used!");
        return;
    }
    if (coupon) {
        alert("You already added this coupon!");
        return;
    }

    try {
        await addCouponToMyList(couponId);
        fetchMyCoupons(); // Refresh the list after adding
        alert("Coupon added to your list!");
    } catch (error) {
        if (error.response && error.response.status === 409) {
            alert("An error occurred while adding the coupon. Please try again.");
        } else {
            console.error("Error adding coupon to my list:", error);
        }
    }
};

  return (
    <div className="min-h-screen p-10 flex flex-col items-center bg-gray-100 mt-20 mb-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Coupons</h1>

      {/* New Offers Section */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">New Offer!</h2>
        {availableCoupons.length > 0 ? (
          <ul className="space-y-4">
            {availableCoupons.map((coupon) => {
              const isAlreadyAdded = myCoupons.some(
                (myCoupon) => myCoupon.couponId === coupon.couponId
              );

              return (
                <li
                  key={coupon.couponId}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {coupon.couponName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Expires on {coupon.expirationDate}
                    </p>
                    <Badge
                      count={`Discount: ₩${coupon.discount}`}
                      style={{ backgroundColor: "#52c41a" }}
                    />
                  </div>
                  <Button
                    type="primary"
                    onClick={() => handleAddCoupon(coupon.couponId)}
                    disabled={isAlreadyAdded}
                    style={{
                      backgroundColor: isAlreadyAdded ? "#d9d9d9" : "",
                      color: isAlreadyAdded ? "#8c8c8c" : "",
                      cursor: isAlreadyAdded ? "not-allowed" : "pointer",
                    }}
                  >
                    {isAlreadyAdded ? "Already Used" : "Add to My Coupons"}
                  </Button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No new offers available.</p>
        )}
      </div>

      {/* My Coupons Section */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">My Coupons</h2>
        {myCoupons.length > 0 ? (
          <ul className="space-y-4">
            {myCoupons.map((coupon) => (
              <li
                key={coupon.couponId}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {coupon.couponName}
                  </h3>
                  <Badge
                    count={`Discount: ₩${coupon.discount}`}
                    style={{ backgroundColor: "#faad14" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">You have no coupons yet.</p>
        )}
      </div>
    </div>
  );
};

export default CouponComponent;