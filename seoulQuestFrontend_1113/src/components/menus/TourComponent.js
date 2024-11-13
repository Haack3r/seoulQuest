// import React, { useEffect, useMemo } from "react";
// import useCustomLogin from "../../hooks/useCustomLogin";
// import useCustomTour from "../../hooks/useCustomTour";
// import { SolutionOutlined, LikeOutlined } from "@ant-design/icons";
// import FavTourComponent from "../favProductAndTour/FavTourComponent";
// import { useDispatch, useSelector } from "react-redux";
// import { getTourItemsAsync } from "../../slices/tourSlice";

// const TourComponent = ({ maxCapacity }) => {
//     console.log("TourComponet");
//     const dispatch = useDispatch();
//     const { isLogin, loginState } = useCustomLogin();
//     const tourItems = useSelector((state) => state.tourSlice || []); // Ensure it’s an empty array by default

//     useEffect(() => {
//         dispatch(getTourItemsAsync());
//     }, [dispatch]);
//     const total = useMemo(() => {
//         let total = 0;
//         if (!tourItems || tourItems.length === 0 || tourItems.error === "ERROR_ACCESS_TOKEN") {
//             return total;
//         }
//         for (const titem of tourItems) {
//             total += titem.tprice * titem.tqty;
//         }
//         return total;
//     }, [tourItems]);

  

//     return (
//         <div className="flex flex-col items-center w-full px-4">
//             {isLogin ? (
//                 <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
//                     {/* Header */}
//                     <div className="mb-6 border-b pb-4 flex items-center space-x-2">
//                         <LikeOutlined className="text-gray-500 text-2xl" />
//                         <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Favorite Tour</h2>
//                     </div>

//                     {/* Reservation Items */}
//                     <div className="mb-6 space-y-4">
//                         {tourItems.length > 0 ? (
//                             tourItems.map((titem) => (
//                                 <FavTourComponent
//                                     maxCapacity={maxCapacity}
//                                     email={loginState.email}
//                                     {...titem}
//                                     key={titem.fino}
//                                 />
//                             ))
//                         ) : (
//                             <p className="text-center text-gray-500">No favorite tour yet.</p>
//                         )}
//                     </div>

//                     {/* Total Price Display */}
//                     <div className="mt-4 text-right text-lg font-bold text-gray-900">
//                         Total: ₩{total.toLocaleString()}
//                     </div>
//                 </div>
//             ) : (
//                 <p className="text-center text-gray-500 mt-6">Please log in to see your reservation.</p>
//             )}
//         </div>
//     );
// };

// export default TourComponent;
