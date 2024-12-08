import React, { useEffect, useState } from "react";
import useCustomCart from "../../../hooks/useCustomCart";
import { API_SERVER_HOST } from "../../../api/reviewApi";
import { getOrderInfo, postOrderInfo, postPayInfo } from "../../../api/productsApi";
import ShippingInformation from "./ShippingInformation";
import PaymentDetails from "./PaymentDetails";
import PaymentMethodAndCoupon from "./PaymentMethodAndCoupon";
import CartList from "./CartList";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../../hooks/useCustomLogin";

const host = API_SERVER_HOST;
const initState = {
  porderItems: [],
  coupons: [],
  usedCoupon: "",
  firstname: "",
  lastname: "",
  city: "",
  country: "",
  state: "",
  street: "",
  zipcode: "",
  phoneNumber: "",
  email: "",
  totalPrice: "",
  paymentMethod: "",
  impUid: "",
  orderId: 0,
};

const OrderComponent = () => {
  const {  refreshCart, cartItems } = useCustomCart();
  const [orderInfo, setOrderInfo] = useState({ ...initState });
  const [existOrderInfo, setExistOrderInfo] = useState({ ...initState });
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const { isLogin } = useCustomLogin();
  const navigate = useNavigate();

  // 공통 함수: 선택한 아이템 가격 계산
  const calculateSelectedItemsPrice = () =>
    [...selectedItems].reduce(
      (total, index) =>
        total + cartItems[index].pprice * cartItems[index].pqty,
      0
    );

  // 공통 함수: 할인된 가격 계산
  const calculateDiscountedPrice = (discount = 0) => {
    const selectedItemsPrice = calculateSelectedItemsPrice();
    const finalPrice = selectedItemsPrice + shippingFee - discount;
    setDiscountedPrice(finalPrice);
    setOrderInfo((prev) => ({ ...prev, totalPrice: finalPrice }));
  };

  // 공통 함수: 배송비 계산
  const calculateShippingFee = () => {
    if (selectedItems.size > 0) {
      const selectedShippingFees = [...selectedItems].map(
        (index) => cartItems[index].shippingFee
      );
      return Math.min(...selectedShippingFees);
    }
    return 0;
  };

  // 카트 아이템 중 계산할 아이템만 선택
  const handleToggleSelect = (index) => {
    setSelectedItems((prev) => {
      const updated = new Set(prev);
      updated.has(index) ? updated.delete(index) : updated.add(index);
      return updated;
    });
  };

  const handleEditModeToggle = () => {
    if (!isEditing) {
      setOrderInfo({ ...existOrderInfo, paymentMethod: orderInfo.paymentMethod });
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCouponSelect = (e) => {
    const couponName = e.target.value;
    setSelectedCoupon(couponName);

    const selectedCouponObj = orderInfo.coupons.find(
      (coupon) => coupon.couponName === couponName
    );
    const discount = selectedCouponObj ? selectedCouponObj.discount : 0;
    setDiscountAmount(discount);
    calculateDiscountedPrice(discount);
  };

  const handleClickPaymentMethod = (e) => {
    setOrderInfo((prev) => ({ ...prev, paymentMethod: e.target.value }));
  };

  const handleClickBuyNow = () => {
    const selectedOrderItems = orderInfo.porderItems.filter((_, index) =>
      selectedItems.has(index)
    );

    if (selectedOrderItems.length === 0) {
      alert("Please select at least one item to order.");
      return;
    }

    const filteredOrderInfo = {
      ...orderInfo,
      porderItems: selectedOrderItems,
      usedCoupon: selectedCoupon,
      totalPrice: discountedPrice > 0? discountedPrice : 0 ,
    };

    //쿠폰을 적용한 총 금액이 0보다 작을 경우, 결제창을 띄우지 않고 주문 결제 정보만 저장.
    if(filteredOrderInfo.totalPrice <= 0 && selectedOrderItems.length !== 0 ){
      console.log("filteredOrderInfo.totalPrice",filteredOrderInfo.totalPrice)
      postOrderInfo(filteredOrderInfo).then((data)=>{
        console.log("주문, 결제 완료" ,data)
      })
     
      alert("Payment completed successfully!");
      navigate("/");
      return
    }

    if (filteredOrderInfo.paymentMethod) {
      if (!window.IMP) return alert("Failed to load payment SDK.");

      const { IMP } = window;
      IMP.init("imp82511880");

      postOrderInfo(filteredOrderInfo).then((data) => {
        const orderInfoWithOrderId = { ...filteredOrderInfo, orderId: data.orderId };

        IMP.request_pay(
          {
            pg: "html5_inicis",
            pay_method: orderInfoWithOrderId.paymentMethod,
            merchant_uid: `order_${new Date().getTime()}`,
            name: selectedOrderItems.map((item) => item.pname).join(", "),
            amount: orderInfoWithOrderId.totalPrice,
            buyer_email: orderInfoWithOrderId.email,
            buyer_name: `${orderInfoWithOrderId.firstname} ${orderInfoWithOrderId.lastname}`,
            buyer_tel: orderInfoWithOrderId.phoneNumber,
            buyer_addr: `${orderInfoWithOrderId.city}, ${orderInfoWithOrderId.street}`,
            buyer_postcode: orderInfoWithOrderId.zipcode,
          },
          async (rsp) => {
            if (rsp.success) {
              try {
                await postPayInfo(orderInfoWithOrderId, rsp.imp_uid);
                alert("Payment completed successfully!");
                navigate("/");
              } catch {
                alert("Payment failed.");
                navigate("/cart");
              }
            } else {
              alert(`Payment failed: ${rsp.error_msg}`);
              navigate("/cart");
            }
          }
        );
      });
    } else {
      alert("Please select your payment method.");
    }
  };

  useEffect(() => {
    if (isLogin) {
        refreshCart();
    }
  }, [isLogin]);

  useEffect(() => {
    getOrderInfo().then((data) => {
      const updatedOrderInfo = { ...data, porderItems: cartItems };
      setOrderInfo(updatedOrderInfo);
      setExistOrderInfo(updatedOrderInfo);
    });
  }, [cartItems, isEditing]);

  useEffect(() => {
    setShippingFee(calculateShippingFee());
    calculateDiscountedPrice(discountAmount);
  }, [selectedItems, cartItems]);

  useEffect(() => {
    const allItems = new Set(cartItems.map((_, index) => index));
    setSelectedItems(allItems);
  }, [cartItems]);

  return (
    <div className="min-h-screen p-5 lg:p-10 flex flex-col items-center mt-10 bg-gray-100">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-8">
        Order Payment
      </h1>

      <div className="w-full max-w-6xl grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          <CartList
            porderItems={orderInfo.porderItems}
            selectedItems={selectedItems}
            handleToggleSelect={handleToggleSelect}
            host={host}
            shippingFee={shippingFee}
          />
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        <div>
          <PaymentDetails
            calculateSelectedItemsPrice={calculateSelectedItemsPrice}
            handleClickBuyNow={handleClickBuyNow}
            discountAmount={discountAmount} //할인 쿠폰 금액
            totalPrice={discountedPrice}  //최종 금액
            shippingFee={shippingFee}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
