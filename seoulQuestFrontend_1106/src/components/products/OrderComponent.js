import React, { useEffect, useState } from "react";
import useCustomCart from "../../hooks/useCustomCart";
import { API_SERVER_HOST } from "../../api/todoApi";
import { Badge } from "antd"; 
import { getUserInfo } from "../../api/myPageApi";

const host = API_SERVER_HOST;

const initState = { 
    cartItems:[],
    coupon:[],
    firstname: '',
    lastname: '',
    city: '',
    country: '',
    state: '',
    street: '',
    zipcode: '',
    phoneNumber: '',
};

const OrderComponent = () => {

    const {cartItems} = useCustomCart();
    const [orderInfo, setOrderInfo] = useState({...initState});
    const [selectedCoupon, setSelectedCoupon] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState(6000);

    useEffect(() => {
        console.log(cartItems)
        getUserInfo((data)=>{
            console.log(data)
            setOrderInfo((prevOrderInfo) => ({
                ...prevOrderInfo,
                ...data,
                cartItems,
            }));
        })
    }, [cartItems]);
    
    const handleClickRemove = (index) => {
        setOrderInfo((prevOrderInfo) => ({
            ...prevOrderInfo,
            cartItems: prevOrderInfo.cartItems.filter((_, i) => i !== index),
        }));
    };

    const handleCouponSelect = (e) => {
        const coupon = e.target.value;
        setSelectedCoupon(coupon);
        calculateDiscountedPrice(coupon);
    };

    const calculateDiscountedPrice = (coupon) => {
        const originalPrice = 6000;
        let discountPrice = originalPrice;

        switch (coupon) {
            case "discount10":
                discountPrice = originalPrice * 0.9; // 10% discount
                break;
            case "discount20":
                discountPrice = originalPrice * 0.8; // 20% discount
                break;
            case "freeshipping":
                discountPrice = originalPrice - 3000; // Free shipping
                break;
            default:
                discountPrice = originalPrice;
        }

        setDiscountedPrice(Math.max(discountPrice, 0)); // Ensure non-negative total
    };

    return (
        
        <div className="min-h-screen p-10 flex flex-col items-center mt-20 mb-20 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Order Payment</h1>

            <div className="w-full max-w-6xl flex">
                {/* Left - Order and Shipping Information */}
                <div className="w-2/3 pr-10">
                    {/* Product Information */}
                    <div className="px-6 py-4 bg-white rounded-xl shadow-md mb-6">

                    {orderInfo.cartItems.map((item,index) => (
                <div key={index} className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        onClick={()=>handleClickRemove(index)}
                        checked= 'true'
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

                    {/* Price and Quantity with Badge */}
                    <div className="flex flex-col items-end mt-5 ml-auto mr-6">
                        <Badge
                            count={`₩${item.pprice.toLocaleString()}`}
                            style={{ backgroundColor: '#52c41a' }}
                        >
                            <p className="text-gray-700 font-semibold mr-7 mb-5">Price</p>
                        </Badge>
                        <Badge
                            count={item.pqty}
                            style={{ backgroundColor: '#faad14' }}
                        >
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
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Form</h3>
                    <div className="px-6 py-4 bg-white rounded-xl shadow-md">
                        <div className="grid grid-cols-2 gap-20">
                            {/* Shipping Address */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Shipping Information</h3>
                                <div className="space-y-4">
                                    <label className="block text-gray-600">Customer Information</label>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full p-3 border rounded-md"
                                        value={orderInfo.firstname}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full p-3 border rounded-md"
                                        value={orderInfo.lastname}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Contact Number"
                                        className="w-full p-3 border rounded-md"
                                        value={orderInfo.phoneNumber}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Recipient's Contact"
                                        className="w-full p-3 border rounded-md"
                                    />
                                  
                                    <div>
                                        <label className="block text-gray-600 mb-2">Address</label>
                                        <div className="flex space-x-2">
                                            <input type="text" placeholder="Postal Code" className="p-3 border rounded-md w-2/3" />
                                            
                                        </div>
                                        <input type="text" placeholder="Country" className="w-full p-3 border rounded-md mt-2" />
                                        <input type="text" placeholder="City" className="w-full p-3 border rounded-md mt-2" />
                                        <input type="text" placeholder="State" className="w-full p-3 border rounded-md mt-2" />
                                        <input type="text" placeholder="street" className="w-full p-3 border rounded-md mt-2" />
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Instructions / Payment Method */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Delivery Instructions / Payment Method</h3>
                                <div className="space-y-4">
                                    <label className="block text-gray-600">
                                        Delivery Message
                                        <select className="w-full mt-2 p-3 border rounded-md">
                                            <option>Leave at the door</option>
                                            <option>Hand deliver, please</option>
                                            <option>Leave at the security desk</option>
                                        </select>
                                    </label>
                                    <label className="block text-gray-600">
                                        Select Payment Method
                                        <div className="mt-2">
                                            <label className="mr-4">
                                                <input type="radio" name="payment" className="mr-2" />
                                                Credit Card
                                            </label>
                                            <label>
                                                <input type="radio" name="payment" className="mr-2" />
                                                Bank Transfer
                                            </label>
                                        </div>
                                    </label>
                                    <p className="text-sm text-gray-500">
                                        Credit card payments are serviced via API, with a minimum payment of ₩10,000.
                                        For bank transfer, purchase history is automatically updated and utilized.
                                    </p>

                                    {/* Coupon Selection */}
                                    <label className="block text-gray-600">
                                        Coupon
                                        <select
                                            value={selectedCoupon}
                                            onChange={handleCouponSelect}
                                            className="w-full mt-2 p-3 border rounded-md"
                                        >
                                            <option value="">Select a coupon</option>
                                            <option value="discount10">10% Discount Coupon</option>
                                            <option value="discount20">20% Discount Coupon</option>
                                            <option value="freeshipping">Free Shipping Coupon</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right - Payment Details (Sticky) */}
                <div className="w-1/3">
                    <div className="sticky top-20 p-6 bg-white rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Details</h3>
                        <div className="flex justify-between mb-4">
                            <p>Product Price</p>
                            <p>₩3,000</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p>Shipping Fee</p>
                            <p>₩3,000</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p>Discount Amount</p>
                            <p>₩{(6000 - discountedPrice).toLocaleString()}</p>
                        </div>
                        <hr className="border-t border-gray-400 my-4" />
                        <div className="flex justify-between text-lg font-semibold text-gray-900">
                            <p>Total Payment</p>
                            <p>₩{discountedPrice.toLocaleString()}</p>
                        </div>
                        <button className="w-full max-w-6xl bg-gray-500 text-white py-3 mt-10 rounded-md hover:bg-gray-600 transition">
                            BUY NOW
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

// Common Input Component
const Input = ({ placeholder }) => (
    <input
        type="text"
        placeholder={placeholder}
        className="w-full p-3 border rounded-md"
    />
);

export default OrderComponent;
