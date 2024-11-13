import React, { lazy, Suspense } from "react";

const myPageRouter = () => {
  const Loading = <div>Loading...</div>;
  const EditProfile = lazy(() => import("../pages/member/EditProfilePage"));
  // const WishList = lazy(() => import("../pages/member/WishListPage"))
  // const Orders = lazy(() => import("../pages/member/OrdersPage"))
  // const Delivery = lazy(() => import("../pages/member/DeliveryPage"))
  // const Coupons = lazy(() => import("../pages/member/CouponsPage"))
  // const Reservation = lazy(() => import("../pages/member/ReservationPage"))
  const MyPage = lazy(() => import("../pages/member/MyPage"));
  const EditProfilePage = lazy(() => import("../pages/member/EditProfilePage"));
  const Coupon = lazy(() => import("../pages/member/CouponPage"));

  return [
    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <MyPage />
        </Suspense>
      ),
    },
    ,
    {
      path: "editProfile",
      element: (
        <Suspense fallback={Loading}>
          <EditProfilePage />
        </Suspense>
      ),
    },
    {
      path: "coupon",
      element: (
        <Suspense fallback={Loading}>
          <Coupon />
        </Suspense>
      ),
    },
  ];
};

export default myPageRouter;
