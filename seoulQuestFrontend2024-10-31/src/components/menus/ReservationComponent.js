import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useMemo, useState } from "react";
import useCustomReservation from "../../hooks/useCustomReservation";
import ReservationItemComponent from "../cartAndReservation/ReservationItemComponent";
import TourDetails from "../tours/TourDetails";

const ReservationComponent = ({maxCapacity,availableCapacity}) => {
    console.log("여기는 Reservation")
    const { isLogin, loginState } = useCustomLogin();
    const { refreshReservation, reservationItems, changeReservation } = useCustomReservation();

    const total = useMemo(() => {
        let total = 0;
        
        //예약이 비어있을때
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
        <div className="flex flex-col items-center w-full px-4">
            {isLogin ? (
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                    {/* Header */}
                    <div className="mb-6 border-b pb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Reservation Options</h2>
                    </div>

                    {/* Select options */}
                   <div className="mb-6">
                        {reservationItems.length > 0 ? (
                            <div className="space-y-4 ">
                                {reservationItems.map((titem) => (
                                    <ReservationItemComponent
                                        maxCapacity={maxCapacity}
                                        availableCapacity={availableCapacity}
                                        email={loginState.email}
                                        {...titem}
                                        key={titem.rino}
                                        changeReservation={changeReservation}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">Your reservation is empty.</p>
                        )}
                    </div>

                    {/* Total and Actions */}
                    <div className="flex justify-between items-center mt-6">
                        {total && <p className="text-2xl font-bold text-gray-800">Total: ₩ {total.toFixed(2)}</p>}
                        <div className="flex space-x-3">
                            <button className=" text-white font-semibold py-2 px-6 rounded-lg bg-stone-400 hover:bg-stone-600 transition duration-300">
                                Book now
                            </button>
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
