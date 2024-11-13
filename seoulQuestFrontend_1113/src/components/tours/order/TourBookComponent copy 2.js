import React, { useEffect, useState } from "react";
import { API_SERVER_HOST } from "../../../api/todoApi";
import useCustomReservation from "../../../hooks/useCustomReservation";
import {getBookInfo} from "../../../api/tourApi";
// import {getOrderInfo} from "../../../api/productsApi";

import PaymentMethodAndCoupon from "../../products/order/PaymentMethodAndCoupon";
import TourPaymentDetails from "./TourPaymentDetails";
import ReservationList from "./ReservationList";
import BookingInformation from "./BookingInformation";

const host = API_SERVER_HOST;
const initState = { 
    bookItems: [],
    coupons: [],
    usedCoupon: '',
    firstname: '',
    lastname: '',
    email: "",
    country: "",
    phoneNumber: '',
    totalPrice: '',
    paymentMethod: '',
    impUid: '',
    bookId: 0,
};

const TourBookComponent = () => {

    const {reservationItems} = useCustomReservation();
    const [bookInfo, setBookInfo] = useState({ ...initState });
    const [existBookInfo, setExistBookInfo] = useState({ ...initState });
    const [selectedCoupon, setSelectedCoupon] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [isEditing, setIsEditing] = useState(false);

    const handleEditModeToggle = () => {
        if (!isEditing) {
            // 기존 정보로 복원하되, paymentMethod만 저장된 값으로 가져옴
            setBookInfo({...existBookInfo, paymentMethod: bookInfo.paymentMethod});
        }
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        // 현재 선택된 쿠폰을 찾아서 할인 금액을 재계산
        const appliedCoupon = bookInfo.coupons.find(
            (coupon) => coupon.couponName === selectedCoupon
        );
        console.log(appliedCoupon)
        calculateDiscountedPrice(appliedCoupon ? appliedCoupon.discount : 0);
    }, [selectedItems, selectedCoupon]);

    useEffect(() => {
        console.log(reservationItems)
        getBookInfo().then((data)=>{
            console.log(data)
            const existBookInfo = {...data, bookItems: reservationItems};
            setBookInfo(existBookInfo);
            setExistBookInfo(existBookInfo);
            console.log(bookInfo)
        })
      }, [reservationItems,isEditing])

      useEffect(() => {
        // 선택된 아이템의 가격 계산하여 업데이트
        const selectedItemsPrice = calculateSelectedItemsPrice();
        setDiscountedPrice(selectedItemsPrice);
    }, [selectedItems]);

    useEffect(() => {
        // 모든 항목을 초기 선택 상태로 설정
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
        // selectedItems에 있는 항목들만 가격을 합산
        let total = 0;
    
        selectedItems.forEach((index) => {
    
            total += reservationItems[index].pprice * reservationItems[index].pqty;
        });
        return total;
    };

    const calculateDiscountedPrice = (discount) => {
        console.log(discount)
        const selectedItemsPrice = calculateSelectedItemsPrice();
        
        let discountPrice = selectedItemsPrice - discount;
        console.log(discountPrice)
        setDiscountedPrice(Math.max(discountPrice, 100));
        setBookInfo({...bookInfo, totalPrice: discountPrice})
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

    const handleClickPaymentMethod = (e) =>{
        setBookInfo({ ...bookInfo, paymentMethod: e.target.value });
        console.log(bookInfo)
    }
    
    const handleClickBuyNow = () => {
        // IMP 전역 객체가 존재하는지 확인
    if (!window.IMP) return alert("아임포트 SDK를 불러오지 못했습니다.");

    // 아임포트 초기화 (아임포트 가맹점 식별코드를 입력)
    const { IMP } = window;
    IMP.init("imp82511880"); 
    
        console.log(selectedCoupon)
        // 선택된 아이템만 필터링하여 새로운 bookItems 배열 생성
        const selectedBookItems = bookInfo.reservationItems.filter((_, index) =>
            selectedItems.has(index)
        );
    
        // 필터링된 bookItems만을 포함한 bookInfo 생성
        const filteredBookInfo = {
            ...bookInfo,
            bookItems: selectedBookItems,
            usedCoupon: selectedCoupon,
            totalPrice: discountedPrice,
        };

        // Tour Price가 0일 때 경고 메시지 표시
        if (calculateSelectedItemsPrice() === 0) {
            alert("There are no items to order. Please select at least one item to order.");
            return; 
        }

        if(filteredBookInfo.paymentMethod){
            console.log(filteredBookInfo); // 필터링된 bookInfo 확인
        
    //         //주문시 주문 정보 서버로 전달
    //         postBookInfo(filteredBookInfo).then((data)=>{
    //             console.log(data)
    //             const bookInfoWithBookId = {
    //                 ...filteredBookInfo,
    //                 bookId: data.bookId,
    //             };

    //             console.log(bookInfoWithBookId)
    //             // 아임포트 결제 요청
    //             IMP.request_pay({
    //                 pg: "html5_inicis", 
    //                 pay_method: bookInfoWithBookId.paymentMethod, 
    //                 merchant_uid: `book_${new Date().getTime()}`, // 주문 번호
    //                 name: bookInfoWithBookId.bookItems.map(item => item.tname).join(', '),
    //                 amount: bookInfoWithBookId.totalPrice, // 총 결제 금액
    //                 buyer_email: bookInfoWithBookId.email,
    //                 buyer_name: `${bookInfoWithBookId.firstname} ${bookInfoWithBookId.lastname}`,
    //                 buyer_tel: bookInfoWithBookId.phoneNumber,
    //                 buyer_addr: `${bookInfoWithBookId.country}`,
    //                 buyer_postcode: bookInfoWithBookId.zipcode,
    //             }, async (rsp) => {
    //                 if (rsp.success) {
    //                     // 결제가 성공하면 imp_uid를 포함하여 서버로 결제 정보 전송
    //                     const payInfo = {orderDTO: bookInfoWithOrderId};
    //                     const impUid = rsp.imp_uid;
    //                     try {
    //                         const response = await postPayInfo(payInfo, impUid);
    //                         console.log(response);
    //                         const answer = alert("Payment has been successfully completed!");
    //                         if(answer){
    //                             //상품 주문 확인페이지로 이동
    //                         }
    //                     } catch (error) {
    //                         console.error(error);
    //                         alert("Failed to complete the payment.");
    //                     }
    //                 } else {
    //                     // 결제가 실패하면 에러 메시지 출력
    //                     alert(`Payment failed: ${rsp.error_msg}`);
    //                 }
    //             });
    //         }) 
    //     }else{
    //        alert("Please select your payment method.")
        }
    };


  return (
    <div className="min-h-screen p-10 flex flex-col items-center mt-20 mb-20 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Booking Payment</h1>

            <div className="w-full max-w-6xl flex">
                {/* Left - customer Information */}
                <div className="w-2/3 pr-10">
                    {/* reservation Information */}
                    <ReservationList
                        reservationItems={bookInfo.bookItems}
                        selectedItems={selectedItems}
                        handleToggleSelect={handleToggleSelect}
                        host={host}
                    />

                    {/* Order Form Section */}
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-20">Booking Information Form</h3>
                    <div className="px-8 py-4 bg-white rounded-xl shadow-md">
                        <p className="text-green-600 text-sm mb-4">
                            Please Enter Your Booking Information
                        </p>
                        <div className="grid grid-cols-2 gap-10">
                            <BookingInformation
                                    bookInfo={bookInfo}
                                    isEditing={isEditing}
                                    handleChange={handleChange}
                                    handleEditModeToggle={handleEditModeToggle}
                                />
                            <PaymentMethodAndCoupon
                                    selectedCoupon={selectedCoupon}
                                    handleCouponSelect={handleCouponSelect}
                                    handleClickPaymentMethod={handleClickPaymentMethod}
                                    bookInfo={bookInfo}
                                />
                        </div>
                    </div>
                </div>

               
                {/* Right - Payment Details */}
                <div className="w-1/3">
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
