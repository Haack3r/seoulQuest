import React, { useEffect, useState } from "react";
import useCustomCart from "../../../hooks/useCustomCart";
import { API_SERVER_HOST } from "../../../api/reviewApi";
import { getOrderInfo, postOrderInfo, postPayInfo } from "../../../api/productsApi";
import ShippingInformation from "./ShippingInformation";
import PaymentDetails from "./PaymentDetails";
import PaymentMethodAndCoupon from "./PaymentMethodAndCoupon";
import CartList from "./CartList";
import { useNavigate } from "react-router-dom";

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
  const { cartItems } = useCustomCart();
  const [orderInfo, setOrderInfo] = useState({ ...initState });
  const [existOrderInfo, setExistOrderInfo] = useState({ ...initState });
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const navigate = useNavigate();

  const handleEditModeToggle = () => {
    if (!isEditing) {
      setOrderInfo({ ...existOrderInfo, paymentMethod: orderInfo.paymentMethod });
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const appliedCoupon = orderInfo.coupons.find(
      (coupon) => coupon.couponName === selectedCoupon
    );
    calculateDiscountedPrice(appliedCoupon ? appliedCoupon.discount : 0);
  }, [selectedItems, selectedCoupon]);

  useEffect(() => {
    getOrderInfo().then((data) => {
      const existOrderInfo = { ...data, porderItems: cartItems };
      setOrderInfo(existOrderInfo);
      setExistOrderInfo(existOrderInfo);
    });
  }, [cartItems, isEditing]);

  useEffect(() => {
    const selectedItemsPrice = calculateSelectedItemsPrice();
    setDiscountedPrice(selectedItemsPrice + shippingFee);
  }, [selectedItems]);

  useEffect(() => {
    if (selectedItems.size > 0) {
      const selectedShippingFees = [...selectedItems].map((index) => cartItems[index].shippingFee);
      const minShippingFee = Math.min(...selectedShippingFees);
      setShippingFee(minShippingFee);
    } else {
      setShippingFee(0);
    }
  }, [selectedItems, cartItems]);

  useEffect(() => {
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
    let total = 0;
    selectedItems.forEach((index) => {
      total += cartItems[index].pprice * cartItems[index].pqty;
    });
    return total;
  };

  const calculateDiscountedPrice = (discount = 0) => {
    const selectedItemsPrice = calculateSelectedItemsPrice();
    let discountPrice = selectedItemsPrice + shippingFee - discount;
    setDiscountedPrice(Math.max(discountPrice, 100));
    setOrderInfo({ ...orderInfo, totalPrice: discountPrice });
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

  const handleClickPaymentMethod = (e) => {
    setOrderInfo({ ...orderInfo, paymentMethod: e.target.value });
  };

  const handleClickBuyNow = () => {
    if (!window.IMP) return alert("Failed to load payment SDK.");

    const { IMP } = window;
    IMP.init("imp82511880");

    const selectedOrderItems = orderInfo.porderItems.filter((_, index) =>
      selectedItems.has(index)
    );

    const filteredOrderInfo = {
      ...orderInfo,
      porderItems: selectedOrderItems,
      usedCoupon: selectedCoupon,
      totalPrice: discountedPrice,
    };

    if (calculateSelectedItemsPrice() === 0) {
      alert("Please select at least one item to order.");
      return;
    }

    if (filteredOrderInfo.paymentMethod) {
      postOrderInfo(filteredOrderInfo).then((data) => {
        const orderInfoWithOrderId = {
          ...filteredOrderInfo,
          orderId: data.orderId,
        };

        IMP.request_pay(
          {
            pg: "html5_inicis",
            pay_method: orderInfoWithOrderId.paymentMethod,
            merchant_uid: `order_${new Date().getTime()}`,
            name: orderInfoWithOrderId.porderItems.map((item) => item.pname).join(", "),
            amount: orderInfoWithOrderId.totalPrice,
            buyer_email: orderInfoWithOrderId.email,
            buyer_name: `${orderInfoWithOrderId.firstname} ${orderInfoWithOrderId.lastname}`,
            buyer_tel: orderInfoWithOrderId.phoneNumber,
            buyer_addr: `${orderInfoWithOrderId.city}, ${orderInfoWithOrderId.street}`,
            buyer_postcode: orderInfoWithOrderId.zipcode,
          },
          async (rsp) => {
            if (rsp.success) {
              const impUid = rsp.imp_uid;
              try {
                await postPayInfo(orderInfoWithOrderId, impUid);
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

  return (
    <div className="min-h-screen p-5 lg:p-10 flex flex-col items-center mt-10 bg-gray-100">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-8">
        Order Payment
      </h1>

      <div className="w-full max-w-6xl grid lg:grid-cols-3 gap-6">
        {/* Left Section */}
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

        {/* Right Section */}
        <div>
          <PaymentDetails
            calculateSelectedItemsPrice={calculateSelectedItemsPrice}
            discountAmount={discountAmount}
            handleClickBuyNow={handleClickBuyNow}
            shippingFee={shippingFee}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
