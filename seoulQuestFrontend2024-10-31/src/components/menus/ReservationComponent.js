import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useMemo, useState } from "react";
import useCustomReservation from "../../hooks/useCustomReservation";
import ReservationItemComponent from "../cartAndReservation/ReservationItemComponent";
import TourDetails from "../tours/TourDetails";
import { UserOutlined } from "@ant-design/icons";

const ReservationComponent = () => {
    const { isLogin, loginState } = useCustomLogin();
    const { refreshReservation, reservationItems, changeReservation } = useCustomReservation();

    const [selectedDate, setSelectedDate] = useState("30 Nov 2024");
    const [quantity, setQuantity] = useState(1);

    const total = useMemo(() => {
        let total = 0;
        if (reservationItems.length === 0 || reservationItems.error === "ERROR_ACCESS_TOKEN") {
            return total;
        } else {
            for (const titem of reservationItems) {
                total += titem.tprice * titem.tqty;
            }
            return total;
        }
    }, [reservationItems]);

    useEffect(() => {
        if (isLogin) {
            refreshReservation(); 
        }
    }, [isLogin]);

    return (
        <div className="flex flex-col items-center w-full mt-10 px-4">
            {isLogin ? (
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg border border-gray-300">
                    {/* Header */}
                    <div className="mb-6 flex justify-between items-center border-b pb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Tour Options</h2>
                        <p className="text-sm text-blue-500 cursor-pointer hover:underline">Clear all</p>
                    </div>

                    {/* Select options */}
                    <div className="mb-6 space-y-6">
                        {/* Date Selection */}
                        <div className="flex items-center justify-between p-3 border border-orange-200 bg-orange-50 rounded-lg cursor-pointer">
                            <span className="text-lg text-orange-600 font-medium">📅 {selectedDate}</span>
                        </div>

                        {/* Quantity Selection */}
                        <div className="space-y-4">
                            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                                <div className="flex items-center text-gray-700 mb-2">
                                    <UserOutlined className="mr-2" /> 
                                    <span>Max Participants:</span> 
                                    {/* <span className="ml-1">{tour.max_capacity}</span> */}
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <UserOutlined className="mr-2" /> 
                                    <span>Available Participants:</span>
                                    {/* <span className="ml-1">{dateInfo.available_capacity}</span> */}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Quantity</label>
                                <p className="text-xs text-gray-500 mb-2">You can select up to 5 for this package</p>
                                <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-3">
                                    <span className="text-gray-700 font-semibold">Adult (aged 18+)</span>
                                    <div className="flex items-center space-x-3">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">-</button>
                                        <span className="text-gray-700">{quantity}</span>
                                        <button onClick={() => setQuantity(Math.min(5, quantity + 1))} className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Total and Actions */}
                    <div className="flex justify-between items-center mt-6">
                        <p className="text-2xl font-bold text-gray-800">US$ {total.toFixed(2)}</p>
                        <div className="flex space-x-3">
                            <button className=" text-white font-semibold py-2 px-6 rounded-lg bg-red-600 hover:bg-red-700 transition duration-300">Book now</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-6">Please log in to see your reservation.</p>
            )}
            <div className="w-full max-w-lg p-4 mt-10 bg-white shadow-lg rounded-lg mb-10">
                <TourDetails />
            </div>
        </div>
    );
};

export default ReservationComponent;
