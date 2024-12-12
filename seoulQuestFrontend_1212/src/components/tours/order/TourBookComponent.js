import React, { useEffect, useState } from "react";
import { API_SERVER_HOST } from "../../../api/reviewApi";
import { getOrderInfo } from "../../../api/productsApi";
import useCustomReservation from "../../../hooks/useCustomReservation";
import { postBookInfo, postPayInfo } from "../../../api/tourApi";
import BookingInformation from "./BookingInformation";
import PaymentMethodCoupons from "./PaymentMethodAndCoupon";
import ReservationList from "./ReservationList";
import TourPaymentDetails from "./TourPaymentDetails";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../../hooks/useCustomLogin";

const host = API_SERVER_HOST;

const initState = {
  torderItems: [],
  coupons: [],
  usedCoupon: "",
  firstname: "",
  lastname: "",
  country: "",
  phoneNumber: "",
  email: "",
  totalPrice: "",
  paymentMethod: "",
  impUid: "",
  orderId: 0,
};

const TourBookComponent = () => {
  const { refreshReservation, reservationItems } = useCustomReservation();
  const [bookInfo, setBookInfo] = useState({ ...initState });
  const [existBookInfo, setExistBookInfo] = useState({ ...initState });
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const { isLogin } = useCustomLogin();
  const navigate = useNavigate();

  const calculateSelectedItemsPrice = () => 
    [...selectedItems].reduce(
      (total, index) =>
        total + reservationItems[index].tprice * reservationItems[index].tqty,
      0
    );

  const calculateDiscountedPrice = (discount = 0 ) => {
    const selectedItemsPrice = calculateSelectedItemsPrice();
    const finalPrice = selectedItemsPrice - discount;
    // setDiscountedPrice(Math.max(discountPrice, 100));
    setDiscountedPrice(finalPrice);
    setBookInfo({ ...bookInfo, totalPrice: finalPrice });
  };

  const handleToggleSelect = (index) => {
    setSelectedItems((prev) => {
      const updated = new Set(prev);
      updated.has(index) ? updated.delete(index) : updated.add(index);
      return updated;
    });
  };

  const handleEditModeToggle = () => {
    if (!isEditing) {
      setBookInfo({ ...existBookInfo, paymentMethod: bookInfo.paymentMethod });
      console.log(bookInfo)
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setBookInfo({ ...bookInfo, [e.target.name]: e.target.value });
  };

  const handleCouponSelect = (e) => {
    const couponName = e.target.value;
    setSelectedCoupon(couponName);

    const selectedCouponObj = bookInfo.coupons.find(
      (coupon) => coupon.couponName === couponName
    );
    const discount = selectedCouponObj ? selectedCouponObj.discount : 0;
    setDiscountAmount(discount);
    calculateDiscountedPrice(discount);
  };

  const handleClickPaymentMethod = (e) => {
    setBookInfo({ ...bookInfo, paymentMethod: e.target.value });
  };

  const handleClickBuyNow = () => {
    const selectedBookItems = bookInfo.torderItems.filter((_, index) =>
      selectedItems.has(index)
    );

    if (selectedBookItems.length === 0) {
      alert("Please select at least one tour to book.");
      return;
    }

    const filteredBookInfo = {
      ...bookInfo,
      torderItems: selectedBookItems,
      usedCoupon: selectedCoupon,
      totalPrice: discountedPrice > 0? discountedPrice : 0 ,
    };

      //쿠폰을 적용한 총 금액이 0보다 작을 경우, 결제창을 띄우지 않고 주문 결제 정보만 저장.
      if(filteredBookInfo.totalPrice <= 0 && selectedBookItems.length !== 0 ){
      console.log("filteredBookInfo.totalPrice",filteredBookInfo.totalPrice)
      postBookInfo(filteredBookInfo).then((data)=>{
        console.log("주문, 결제 완료" ,data)
      })
      
      alert("Payment completed successfully!");
      navigate("/");
      return
    }
    
    if (filteredBookInfo.paymentMethod) {
      if (!window.IMP) return alert("Failed to load payment SDK.");

      const { IMP } = window;
      IMP.init("imp82511880");

      postBookInfo(filteredBookInfo).then((data) => {
        const orderInfoWithOrderId = {
          ...filteredBookInfo,
          orderId: data.orderId };

        IMP.request_pay(
          {
            pg: "html5_inicis",
            pay_method: orderInfoWithOrderId.paymentMethod,
            merchant_uid: `order_${new Date().getTime()}`,
            name: orderInfoWithOrderId.torderItems.map((item) => item.tname).join(", "),
            amount: orderInfoWithOrderId.totalPrice,
            buyer_email: orderInfoWithOrderId.email,
            buyer_name: `${orderInfoWithOrderId.firstname} ${orderInfoWithOrderId.lastname}`,
            buyer_tel: orderInfoWithOrderId.phoneNumber,
          },
          async (rsp) => {
            if (rsp.success) {
              try {
                await postPayInfo(orderInfoWithOrderId, rsp.imp_uid);
                alert("Payment successful! Redirecting to main...");
                navigate("/");
              } catch {
                alert("Payment failed. Redirecting to cart...");
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
      refreshReservation();
    }
  }, [isLogin]);

  useEffect(() => {
    getOrderInfo().then((data) => {
      const existBookInfo = { ...data, 
        torderItems: reservationItems, 
        paymentMethod: bookInfo.paymentMethod, };
      setBookInfo(existBookInfo);
      setExistBookInfo(existBookInfo);
    });
  }, [reservationItems, isEditing]);

  useEffect(() => {
    const allItems = new Set(reservationItems.map((_, index) => index));
    setSelectedItems(allItems);
  }, [reservationItems]);

  // useEffect(() => {
  //   const appliedCoupon = bookInfo.coupons.find(
  //     (coupon) => coupon.couponName === selectedCoupon
  //   );
  //   calculateDiscountedPrice(appliedCoupon ? appliedCoupon.discount : 0);
  // }, [selectedItems, selectedCoupon]);

  useEffect(() => {
    const selectedItemsPrice = calculateSelectedItemsPrice();
    setDiscountedPrice(selectedItemsPrice);
  }, [selectedItems]);

  return (
    <div className="min-h-screen p-5 lg:p-10 flex flex-col items-center mt-10 bg-gray-100">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-8">
        Booking Payment
      </h1>

      <div className="w-full max-w-6xl grid lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <ReservationList
            bookInfo={bookInfo}
            selectedItems={selectedItems}
            handleToggleSelect={handleToggleSelect}
            host={host}
          />
          <div className="mt-8">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-700 mb-4">
              Booking Form
            </h3>
            <div className="px-4 lg:px-8 py-4 bg-white rounded-xl shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BookingInformation
                  bookInfo={bookInfo}
                  isEditing={isEditing}
                  handleChange={handleChange}
                  handleEditModeToggle={handleEditModeToggle}
                />
                <PaymentMethodCoupons
                  selectedCoupon={selectedCoupon}
                  bookInfo={bookInfo}
                  handleClickPaymentMethod={handleClickPaymentMethod}
                  handleCouponSelect={handleCouponSelect}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full">
          <TourPaymentDetails
            calculateSelectedItemsPrice={calculateSelectedItemsPrice}
            handleClickBuyNow={handleClickBuyNow}
            discountAmount={discountAmount} //할인 쿠폰 금액
            totalPrice={discountedPrice} //최종 결제 금액
          />
        </div>
      </div>
    </div>
  );
};

export default TourBookComponent;
