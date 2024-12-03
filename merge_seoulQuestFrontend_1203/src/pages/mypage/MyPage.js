import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import MyPageComponent from "../../components/member/MyPageComponent";
import MyPageLayout from "../../layouts/MyPageLayout";

const MyPage = () => {
  return (
    <BasicLayout>
      <div className="bg-gray-100 flex justify-center items-start min-h-screen mt-14">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 mt-20">
          {/* Sidebar for Large Screens */}
          <div className="hidden lg:block w-1/3">
            <MyPageLayout />
          </div>

          {/* Horizontal Menu for Small Screens */}
          <div className="lg:hidden absolute top-16 left-0 w-full ">
            <MyPageLayout />
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 p-6">
            <MyPageComponent />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default MyPage;
