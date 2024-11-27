import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import MyPageComponent from "../../components/member/MyPageComponent";
import MyPageLayout from "../../layouts/MyPageLayout";

const MyPage = () => {
  return (
    <BasicLayout>
      <div className="p-6 w-full bg-gray-100 flex justify-center items-start">
        <div className="flex flex-row gap-6 w-full max-w-6xl mt-20">
          <div className="w-1/3">
            <MyPageLayout />
          </div>
          <div className="w-2/3">
            <MyPageComponent />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default MyPage;
