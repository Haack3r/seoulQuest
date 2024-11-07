import React from "react";
import SignUpComponent from "../../components/member/SignUpComponent";
import BasicMenu from "../../components/menus/BasicMenu";

const SignUpPage = () => {
  return (
    <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full" >
      <BasicMenu />
      <SignUpComponent />
    </div>
  );
};

export default SignUpPage;
