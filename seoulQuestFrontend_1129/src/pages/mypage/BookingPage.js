import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import MyPageLayout from "../../layouts/MyPageLayout";
import BookingComponent from "../../components/member/BookingComponent";


const BookingPage = () => {
  return (
    <BasicLayout>
    <div className="p-6 bg-gray-100 flex justify-center items-center min-h-screen">
     <div className="grid grid-cols-3 gap-6 w-full max-w-6xl mt-20">
       <div className="col-span-1 min-h-screen max-h-screen bg-gray-100">
         <MyPageLayout/>
       </div>
       <div className="col-span-2">
         <BookingComponent/>
       </div>
     </div>
   </div>
 </BasicLayout>
  );
};

export default BookingPage;