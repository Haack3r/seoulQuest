import React, { useEffect, useState } from "react";
import useCustomCart from "../../../hooks/useCustomCart";
import { API_SERVER_HOST } from "../../../api/todoApi";
import { Badge } from "antd"; 
import { getOrderInfo, postOrderInfo, postPayInfo,  } from "../../../api/productsApi";

const host = API_SERVER_HOST;

const initState = { 
    orderItems: [],
    coupons: [],
    usedCoupon: '',
    firstname: '',
    lastname: '',
    city: '',
    country: '',
    state: '',
    street: '',
    zipcode: '',
    phoneNumber: '',
    email: '',
    totalPrice: '',
    paymentMethod: '',
    impUid: '',
    orderId: 0,
};

//shippingfee는 임시로 0원으로 해둠.
const OrderComponent = () => {
    const shippingFee = 0;
    const { cartItems} = useCustomCart();
    const [orderInfo, setOrderInfo] = useState({ ...initState });
    const [existOrderInfo, setExistOrderInfo] = useState({ ...initState });
    const [selectedCoupon, setSelectedCoupon] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [isEditing, setIsEditing] = useState(false);
    

    const handleEditModeToggle = () => {
        if (!isEditing) {
            // 기존 정보로 복원하되, paymentMethod만 저장된 값으로 가져옴
            setOrderInfo({...existOrderInfo, paymentMethod: orderInfo.paymentMethod});
        }
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        
        // 현재 선택된 쿠폰을 찾아서 할인 금액을 재계산
        const appliedCoupon = orderInfo.coupons.find(
            (coupon) => coupon.couponName === selectedCoupon
        );
        console.log(appliedCoupon)
        calculateDiscountedPrice(appliedCoupon ? appliedCoupon.discount : 0);
    }, [selectedItems, selectedCoupon]); // selectedItems와 selectedCoupon이 변경될 때마다 재계산
    

    useEffect(() => {
        getOrderInfo().then((data) => {
            const existOrderInfo = { ...data, orderItems: cartItems };
            setOrderInfo(existOrderInfo);
            setExistOrderInfo(existOrderInfo);
            console.log(orderInfo)
            console.log(existOrderInfo)
        });
    }, [cartItems,isEditing]);

    useEffect(() => {
        // 선택된 아이템의 가격 계산하여 업데이트
        const selectedItemsPrice = calculateSelectedItemsPrice();
        // const shippingFee = 3000;
        // const shippingFee = 0;
        setDiscountedPrice(selectedItemsPrice + shippingFee);
    }, [selectedItems]);

    useEffect(() => {
        // 모든 항목을 초기 선택 상태로 설정
        const allItems = new Set(cartItems.map((_, index) => index));
        setSelectedItems(allItems);
    }, [cartItems]);
    

    const handleChange = (e) => {
        setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
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
        // selectedItems에 있는 항목들만 가격을 합산
        let total = 0;
    
        selectedItems.forEach((index) => {
    
            total += cartItems[index].pprice * cartItems[index].pqty;
        });
        return total;
    };

    const calculateDiscountedPrice = (discount) => {
        console.log(discount)
        const selectedItemsPrice = calculateSelectedItemsPrice();
        // const shippingFee = 3000;
        // const shippingFee = 0;
        let discountPrice = selectedItemsPrice + shippingFee - discount;
        console.log(discountPrice)
        setDiscountedPrice(Math.max(discountPrice, 100));
        setOrderInfo({...orderInfo, totalPrice: discountPrice})
    };

    const handleCouponSelect = (e) => {
        const couponName = e.target.value;
        setSelectedCoupon(couponName);

        const selectedCoupon = orderInfo.coupons.find(
            (coupon) => coupon.couponName === couponName
        );

        if (selectedCoupon) {
            setDiscountAmount(selectedCoupon.discount);
            calculateDiscountedPrice(selectedCoupon.discount);
        } else {
            setDiscountAmount(0);
            calculateDiscountedPrice();
        }
    };

    const handleClickPaymentMethod = (e) =>{
        setOrderInfo({ ...orderInfo, paymentMethod: e.target.value });
        console.log(orderInfo)
    }
    
    const handleClickBuyNow = () => {
        // IMP 전역 객체가 존재하는지 확인
    if (!window.IMP) return alert("아임포트 SDK를 불러오지 못했습니다.");

    // 아임포트 초기화 (아임포트 가맹점 식별코드를 입력)
    const { IMP } = window;
    IMP.init("imp82511880"); // 아임포트 가맹점 식별코드 입력

    
        console.log(selectedCoupon)
        // 선택된 아이템만 필터링하여 새로운 orderItems 배열 생성
        const selectedOrderItems = orderInfo.orderItems.filter((_, index) =>
            selectedItems.has(index)
        );
    
        // 필터링된 orderItems만을 포함한 orderInfo 생성
        const filteredOrderInfo = {
            ...orderInfo,
            orderItems: selectedOrderItems,
            usedCoupon: selectedCoupon,
            totalPrice: discountedPrice,
        };

        // Product Price가 0일 때 경고 메시지 표시
        if (calculateSelectedItemsPrice() === 0) {
            alert("There are no items to order. Please select at least one item to order.");
            return; 
        }

        if(filteredOrderInfo.paymentMethod){
            console.log(filteredOrderInfo); // 필터링된 orderInfo 확인
        
            //주문시 주문 정보 서버로 전달
            postOrderInfo(filteredOrderInfo).then((data)=>{
                console.log(data)
                const orderInfoWithOrderId = {
                    ...filteredOrderInfo,
                    orderId: data.orderId,
                };

                console.log(orderInfoWithOrderId)
                // 아임포트 결제 요청
                IMP.request_pay({
                    pg: "html5_inicis", 
                    pay_method: orderInfoWithOrderId.paymentMethod, 
                    merchant_uid: `order_${new Date().getTime()}`, // 주문 번호
                    name: orderInfoWithOrderId.orderItems.map(item => item.pname).join(', '),
                    amount: orderInfoWithOrderId.totalPrice, // 총 결제 금액
                    buyer_email: orderInfoWithOrderId.email,
                    buyer_name: `${orderInfoWithOrderId.firstname} ${orderInfoWithOrderId.lastname}`,
                    buyer_tel: orderInfoWithOrderId.phoneNumber,
                    buyer_addr: `${orderInfoWithOrderId.city}, ${orderInfoWithOrderId.street}`,
                    buyer_postcode: orderInfoWithOrderId.zipcode,
                }, async (rsp) => {
                    if (rsp.success) {
                        // 결제가 성공하면 imp_uid를 포함하여 서버로 결제 정보 전송
                        console.log(rsp)
                        console.log("orderDTO:", orderInfoWithOrderId)
                        const payInfo = {orderDTO: orderInfoWithOrderId};
                        const impUid = rsp.imp_uid;
                        
                        try {
                            const response = await postPayInfo(payInfo, impUid);
                            console.log(response);
                            const answer = alert("Payment has been successfully completed!");
                            if(answer){
                                //상품 주문 확인페이지로 이동
                            }
                        } catch (error) {
                            console.error(error);
                            alert("Failed to complete the payment.");
                        }
                    } else {
                        // 결제가 실패하면 에러 메시지 출력
                        alert(`Payment failed: ${rsp.error_msg}`);
                    }
                });
            }) 


        }else{
           alert("Please select your payment method.")
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
                            {/* <p>₩3,000</p> */}
                            <p>₩0</p>
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
                                            onChange={handleEditModeToggle}
                                        />
                                        <span className="ml-2 text-xs">Existing Shipping Information</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name="editMode" 
                                            checked={isEditing} 
                                            onChange={handleEditModeToggle}
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
                                                <input type="radio" name="payment" className="mr-2"
                                                    value="card"  
                                                    onClick={handleClickPaymentMethod}  
                                                />
                                                Credit Card
                                            </label>
                                            <label>
                                                <input type="radio" name="payment" className="mr-2" 
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
                                            <option value="emptyCoupon" disabled>No coupons available.</option>
                                        )}
                                    </select>
                                    <p className="text-xs text-gray-500 mt-2">
                                        * Please note that the minimum payment amount must be at least <span className="font-semibold">100 KRW</span> after applying the coupon.
                                    </p>
                                    <hr className="border-t border-gray-400 my-5" />

                                    
                                </div>
                                    <div className="space-y-4 text-sm bg-gray-100 text-gray-500 my-8 rounded-lg p-5">
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
                            {/* <p>₩3,000</p> */}
                            <p>₩0</p>
                        </div>
                        <div className="flex justify-between mb-4 text-blue-400">
                            <p>Discount Amount</p>
                            <p>- ₩{discountAmount.toLocaleString()}</p>
                        </div>
                        <hr className="border-t border-gray-400 my-4" />
                        <div className="flex justify-between text-lg font-semibold text-gray-900">
                            <p>Total Payment</p>
                            {/* <p>₩{Math.max((calculateSelectedItemsPrice() + 3000 - discountAmount),0).toLocaleString()}</p> */}
                            <p>₩{Math.max((calculateSelectedItemsPrice() + 0 - discountAmount),100).toLocaleString()}</p>
                        </div>

                        {/* 상품 추가 안내 메시지 */}
                        {calculateSelectedItemsPrice() === 0 && (
                            <p className="text-sm text-red-500 mt-2">
                                Please add at least one product to your order.
                            </p>
                        )}

                        {/* 100원 이상만 결제 가능하다는 안내 메시지 */}
                        {(calculateSelectedItemsPrice() + 0 - discountAmount) < 100 && (
                            <p className="text-sm text-gray-500 mt-2">
                                The minimum payment amount is 100 KRW.
                            </p>
                        )}
                        

                        <button className="w-full max-w-6xl bg-gray-500 text-white py-3 mt-10 rounded-md hover:bg-gray-600 transition font-semibold"
                            onClick={handleClickBuyNow}
                        >
                            BUY NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderComponent;