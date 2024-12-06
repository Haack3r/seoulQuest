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
  const { reservationItems } = useCustomReservation();
  const [bookInfo, setBookInfo] = useState({ ...initState });
  const [existBookInfo, setExistBookInfo] = useState({ ...initState });
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleEditModeToggle = () => {
    if (!isEditing) {
      setBookInfo({ ...existBookInfo, paymentMethod: bookInfo.paymentMethod });
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const appliedCoupon = bookInfo.coupons.find(
      (coupon) => coupon.couponName === selectedCoupon
    );
    calculateDiscountedPrice(appliedCoupon ? appliedCoupon.discount : 0);
  }, [selectedItems, selectedCoupon]);

  useEffect(() => {
    getOrderInfo().then((data) => {
      const existBookInfo = { ...data, torderItems: reservationItems };
      setBookInfo(existBookInfo);
      setExistBookInfo(existBookInfo);
    });
  }, [reservationItems, isEditing]);

  useEffect(() => {
    const selectedItemsPrice = calculateSelectedItemsPrice();
    setDiscountedPrice(selectedItemsPrice);
  }, [selectedItems]);

  useEffect(() => {
    const allItems = new Set(reservationItems.map((_, index) => index));
    setSelectedItems(allItems);
  }, [reservationItems]);

  const handleChange = (e) => {
    setBookInfo({ ...bookInfo, [e.target.name]: e.target.value });
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
      total += reservationItems[index].tprice * reservationItems[index].tqty;
    });
    return total;
  };

  const calculateDiscountedPrice = (discount) => {
    const selectedItemsPrice = calculateSelectedItemsPrice();
    let discountPrice = selectedItemsPrice - discount;
    setDiscountedPrice(Math.max(discountPrice, 100));
    setBookInfo({ ...bookInfo, totalPrice: discountPrice });
  };

  const handleCouponSelect = (e) => {
    const couponName = e.target.value;
    setSelectedCoupon(couponName);

    const selectedCoupon = bookInfo.coupons.find(
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
    setBookInfo({ ...bookInfo, paymentMethod: e.target.value });
  };

  const handleClickBuyNow = () => {
    if (!window.IMP) return alert("Failed to load payment SDK.");

    const { IMP } = window;
    IMP.init("imp82511880");

    const selectedBookItems = bookInfo.torderItems.filter((_, index) =>
      selectedItems.has(index)
    );

    const filteredBookInfo = {
      ...bookInfo,
      torderItems: selectedBookItems,
      usedCoupon: selectedCoupon,
      totalPrice: discountedPrice,
    };

    if (calculateSelectedItemsPrice() === 0) {
      alert("Please select at least one tour to book.");
      return;
    }

    if (filteredBookInfo.paymentMethod) {
      postBookInfo(filteredBookInfo).then((data) => {
        const orderInfoWithOrderId = {
          ...filteredBookInfo,
          orderId: data.orderId,
        };

        IMP.request_pay(
          {
            pg: "html5_inicis",
            pay_method: orderInfoWithOrderId.paymentMethod,
            merchant_uid: `order_${new Date().getTime()}`,
            name: orderInfoWithOrderId.torderItems
              .map((item) => item.tname)
              .join(", "),
            amount: orderInfoWithOrderId.totalPrice,
            buyer_email: orderInfoWithOrderId.email,
            buyer_name: `${orderInfoWithOrderId.firstname} ${orderInfoWithOrderId.lastname}`,
            buyer_tel: orderInfoWithOrderId.phoneNumber,
          },
          async (rsp) => {
            if (rsp.success) {
              const impUid = rsp.imp_uid;
              try {
                await postPayInfo(orderInfoWithOrderId, impUid);
                alert("Payment successful! Redirecting...");
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
            discountAmount={discountAmount}
            handleClickBuyNow={handleClickBuyNow}
          />
        </div>
      </div>
    </div>
  );
};

export default TourBookComponent;
