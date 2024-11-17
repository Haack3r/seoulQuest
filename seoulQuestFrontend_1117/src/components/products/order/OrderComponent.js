import React, { useEffect, useState } from "react";
import useCustomCart from "../../../hooks/useCustomCart";
import { API_SERVER_HOST } from "../../../api/todoApi";
import { getOrderInfo, postOrderInfo, postPayInfo,  } from "../../../api/productsApi";
import ShippingInformation from "./ShippingInformation";
import PaymentDetails from "./PaymentDetails";
import PaymentMethodAndCoupon from "./PaymentMethodAndCoupon";
import CartList from "./CartList";

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
    IMP.init("imp82511880"); 
    
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
                    {/* Cart List */}
                    <CartList
                        orderItems={orderInfo.orderItems}
                        selectedItems={selectedItems}
                        handleToggleSelect={handleToggleSelect}
                        host={host}
                    />

                    {/* Order Form Section */}
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-20">Order Form</h3>
                    <div className="px-8 py-4 bg-white rounded-xl shadow-md">
                        <div className="grid grid-cols-2 gap-10">
                            <ShippingInformation
                                    orderInfo={orderInfo}
                                    isEditing={isEditing}
                                    handleChange={handleChange}
                                    handleEditModeToggle={handleEditModeToggle}
                                />
                            <PaymentMethodAndCoupon
                                    selectedCoupon={selectedCoupon}
                                    handleCouponSelect={handleCouponSelect}
                                    handleClickPaymentMethod={handleClickPaymentMethod}
                                    orderInfo={orderInfo}
                                />
                        </div>
                    </div>
                </div>

               
                {/* Right - Payment Details */}
                <div className="w-1/3">
                    <PaymentDetails
                        calculateSelectedItemsPrice={calculateSelectedItemsPrice}
                        discountAmount={discountAmount}
                        handleClickBuyNow={handleClickBuyNow}
                    />
                </div>

            </div>
        </div>
    );
};

export default OrderComponent;