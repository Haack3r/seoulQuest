import React, { useEffect, useState } from "react";
import useCustomCart from "../../hooks/useCustomCart";
import { API_SERVER_HOST } from "../../api/todoApi";
import { Badge } from "antd"; 
import { getOrderInfo } from "../../api/productsApi";
import useCustomLogin from "../../hooks/useCustomLogin";

const host = API_SERVER_HOST;

const initState = { 
    orderItems: [],
    coupons: [],
    firstname: '',
    lastname: '',
    city: '',
    country: '',
    state: '',
    street: '',
    zipcode: '',
    phoneNumber: '',
    email: '',
};

const OrderComponent = () => {
    const { cartItems, refreshCart } = useCustomCart();
    const [orderInfo, setOrderInfo] = useState({ ...initState });
    const [selectedCoupon, setSelectedCoupon] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState(6000);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        getOrderInfo().then((data) => {
            console.log(data);
            console.log(cartItems);
            setOrderInfo({ ...data, orderItems: cartItems });
        });
    }, [cartItems]);

    useEffect(() => {
        const selectedItemsPrice = calculateSelectedItemsPrice();
        const shippingFee = 3000;
        setDiscountedPrice(selectedItemsPrice + shippingFee);
    }, [selectedItems]);

    useEffect(() => {
        const allItems = new Set(cartItems.map((_, index) => index));
        setSelectedItems(allItems);
    }, [cartItems]);

    const handleChange = (e) => {
        setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
        console.log(orderInfo);
    };

    const handleToggleSelect = (index) => {
        setSelectedItems((prevSelected) => {
            const updatedSelected = new Set(prevSelected);
            if (updatedSelected.has(index)) {
                updatedSelected.delete(index);
            } else {
                updatedSelected.add(index);
            }
            return updatedSelected;
        });
    };

    const calculateSelectedItemsPrice = () => {
        let total = 0;
        selectedItems.forEach((index) => {
            total += cartItems[index].pprice * cartItems[index].pqty;
        });
        return total;
    };

    const calculateDiscountedPrice = (discount = 0) => {
        const selectedItemsPrice = calculateSelectedItemsPrice();
        const shippingFee = 3000;
        let discountPrice = selectedItemsPrice + shippingFee - discount;

        setDiscountedPrice(Math.max(discountPrice, 0));
    };

    const handleCouponSelect = (e) => {
        const couponName = e.target.value;
        setSelectedCoupon(couponName);

        // 선택된 쿠폰 객체를 찾습니다.
        const selectedCoupon = orderInfo.coupons.find(
            (coupon) => coupon.couponName === couponName
        );

        // 쿠폰이 존재하는 경우, 할인 금액을 적용합니다.
        if (selectedCoupon) {
            calculateDiscountedPrice(selectedCoupon.discount);
        } else {
            calculateDiscountedPrice(); // 선택된 쿠폰이 없을 경우 할인 없이 계산
        }
    };

    return (
        <div className="min-h-screen p-10 flex flex-col items-center mt-20 mb-20 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Order Payment</h1>

            <div className="w-full max-w-6xl flex">
                {/* Left - Order and Shipping Information */}
                <div className="w-2/3 pr-10">
                    {/* Product Information */}
                    <div className="px-6 py-4 bg-white rounded-xl shadow-md mb-6">
                        {orderInfo.orderItems.map((item, index) => (
                            <div key={index} className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    onChange={() => handleToggleSelect(index)}
                                    checked={selectedItems.has(index)}
                                    className="mr-4"
                                />
                                <img
                                    src={`${host}/api/products/view/s_${item.pfiles}`}
                                    alt="Product Image"
                                    className="w-16 h-16 mr-4 rounded"
                                />
                                <div className="flex-grow-1">
                                    <p className="font-semibold text-gray-700">{item.pname}</p>
                                    <p className="text-gray-500">Standard packaging included</p>
                                </div>
                                <div className="flex flex-col items-end mt-5 ml-auto mr-6">
                                    <Badge count={`₩${item.pprice.toLocaleString()}`} style={{ backgroundColor: '#52c41a' }}>
                                        <p className="text-gray-700 font-semibold mr-7 mb-5">Price</p>
                                    </Badge>
                                    <Badge count={item.pqty} style={{ backgroundColor: '#faad14' }}>
                                        <p className="text-gray-700 font-semibold mr-3 mb-5">Qty</p>
                                    </Badge>
                                </div>
                            </div>
                        ))}

                        <hr className="border-t border-gray-400 my-6" />
                        <div className="flex justify-between items-center text-lg font-semibold">
                            <p>Shipping Fee:</p>
                            <p>₩3,000</p>
                        </div>
                    </div>

                    {/* Order Form Section */}
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-20">Order Form</h3>
                    <div className="px-8 py-4 bg-white rounded-xl shadow-md">
                        <div className="grid grid-cols-2 gap-10">

                            {/* Shipping Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-4 mt-5">Shipping Information</h3>
                                <div className="flex items-start space-y-2 flex-col mb-4">
                                    <label className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name="editMode" 
                                            checked={!isEditing} 
                                            onChange={() => setIsEditing(false)} 
                                        />
                                        <span className="ml-2 text-xs">Existing Shipping Information</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name="editMode" 
                                            checked={isEditing} 
                                            onChange={() => setIsEditing(true)} 
                                        />
                                        <span className="ml-2 text-xs">New Shipping Information</span>
                                    </label>
                                </div>
                                <hr className="border-t border-gray-400 my-4" />
                                <div className="space-y-4">
                                    <label className="block text-gray-600 font-semibold">Recipient Information</label>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className={`w-full p-3 border rounded-md ${!isEditing ? 'bg-gray-100' : ''}`}
                                        value={orderInfo.firstname}
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        name="firstname"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className={`w-full p-3 border rounded-md ${!isEditing ? 'bg-gray-100' : ''}`}
                                        value={orderInfo.lastname}
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        name="lastname"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Contact Number"
                                        className={`w-full p-3 border rounded-md ${!isEditing ? 'bg-gray-100' : ''}`}
                                        value={orderInfo.phoneNumber}
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        name="phoneNumber"
                                    />
                                    <p className="text-xs ml-1">Please enter your phone number with dashes(-).</p>
                                </div>
                                <hr className="border-t border-gray-400 my-4" />
                                <div className="space-y-4">
                                    <label className="block text-gray-600 mb-2 font-semibold">Address</label>
                                    <div className="flex space-x-2">
                                        <input 
                                            type="text" 
                                            placeholder="Zip Code" 
                                            className={`p-3 border rounded-md w-2/3 ${!isEditing ? 'bg-gray-100' : ''}`} 
                                            value={orderInfo.zipcode}
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            name="zipcode"
                                        />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Street" 
                                        className={`w-full p-3 border rounded-md mt-2 ${!isEditing ? 'bg-gray-100' : ''}`} 
                                        value={orderInfo.street}
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        name="street"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="City" 
                                        className={`w-full p-3 border rounded-md mt-2 ${!isEditing ? 'bg-gray-100' : ''}`} 
                                        value={orderInfo.city}
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        name="city"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="State" 
                                        className={`w-full p-3 border rounded-md mt-2 ${!isEditing ? 'bg-gray-100' : ''}`} 
                                        value={orderInfo.state}
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        name="state"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Country" 
                                        className={`w-full p-3 border rounded-md mt-2 ${!isEditing ? 'bg-gray-100' : ''}`} 
                                        value={orderInfo.country}
                                        disabled={!isEditing}
                                        onChange={handleChange}
                                        name="country"
                                    />
                                   
                                </div>
                            </div>



                            {/* Delivery Instructions / Payment Method */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-10 mt-5">Delivery Instructions / Payment Method</h3>
                                <hr className="border-t border-gray-400 my-4" />
                                <div className="space-y-4">
                                    <fieldset className="text-gray-600 ">
                                        <legend className="block mb-2 font-semibold">Select Payment Method</legend>
                                        <div className="mt-2">
                                            <label className="mr-4">
                                                <input type="radio" name="payment" value="creditCard" className="mr-2" />
                                                Credit Card
                                            </label>
                                            <label>
                                                <input type="radio" name="payment" value="bankTransfer" className="mr-2" />
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
                                            <option value="emptyCoupon">No coupons available.</option>
                                        )}
                                    </select>
                                    <hr className="border-t border-gray-400 my-5" />

                                    
                                </div>
                                    <div className="space-y-4 text-sm bg-gray-100 text-gray-500 my-20 rounded-lg p-5">
                                        <h4 className="font-semibold text-gray-700">Delivery Terms</h4>
                                        <p>
                                            Your order will be shipped within <span className="font-semibold">5 days</span> 
                                            (excluding weekends and public holidays).
                                        </p>
                                        <p>
                                            If the item is out of stock or if there is an expected delay in shipping, we will 
                                            notify you via <span className="font-semibold">Email</span>.
                                        </p>
                                        <hr className="border-t border-gray-400 my-4" />
                                        <h4 className="font-semibold text-gray-700">Need Assistance?</h4>
                                        <p>
                                            If you have any further questions, please contact <span className="font-semibold">Customer Service</span>.
                                        </p>
                                    </div>
                            </div>

                            
                        </div>
                    </div>
                </div>

               
                {/* Right - Payment Details */}
                <div className="w-1/3">
                    <div className="sticky top-20 p-6 bg-white rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Details</h3>
                        <div className="flex justify-between mb-4">
                            <p>Product Price</p>
                            <p>₩{calculateSelectedItemsPrice().toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p>Shipping Fee</p>
                            <p>₩3,000</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p>Discount Amount</p>
                            <p>₩{(calculateSelectedItemsPrice() + 3000 - discountedPrice).toLocaleString()}</p>
                        </div>
                        <hr className="border-t border-gray-400 my-4" />
                        <div className="flex justify-between text-lg font-semibold text-gray-900">
                            <p>Total Payment</p>
                            <p>₩{discountedPrice.toLocaleString()}</p>
                        </div>
                        <button className="w-full max-w-6xl bg-gray-500 text-white py-3 mt-10 rounded-md hover:bg-gray-600 transition font-semibold">
                            BUY NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderComponent;