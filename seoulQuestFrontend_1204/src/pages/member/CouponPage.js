import React from "react";
import CouponComponent from "../../components/CouponComponent";
import BasicLayout from '../../layouts/BasicLayout'

const CouponPage = () => {
  return (
    <BasicLayout>
      <div className="p-4 w-full bg-gray-100">
        <CouponComponent />
      </div>
    </BasicLayout>
  );
};

export default CouponPage;
