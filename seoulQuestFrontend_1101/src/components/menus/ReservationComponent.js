import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useMemo } from "react";
import useCustomReservation from "../../hooks/useCustomReservation";
import ReservationItemComponent from "../cartAndReservation/ReservationItemComponent";
import TourDetails from "../tours/TourDetails";
import { SolutionOutlined} from "@ant-design/icons";


const ReservationComponent = ({maxCapacity}) => {
    const { isLogin, loginState } = useCustomLogin();
    const { refreshReservation, reservationItems, changeReservation } = useCustomReservation();

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

        console.log(reservationItems)
    }, [isLogin]);

    return (
        <div className="flex flex-col items-center w-full px-4">
            {isLogin ? (
                <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                    {/* Header */}
                    <div className="mb-6 border-b pb-4 flex items-center space-x-2">
                         <SolutionOutlined className="text-gray-500 text-2xl" />
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Reservation Options</h2>
                    </div>

                    {/* Reservation Items */}
                    <div className="mb-6 space-y-4">
                        {reservationItems.length > 0 ? (
                            reservationItems.map((titem) => (
                                <ReservationItemComponent
                                    maxCapacity={maxCapacity}
                                    email={loginState.email}
                                    {...titem}
                                    key={titem.rino}
                                    changeReservation={changeReservation}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Your reservation is empty.</p>
                        )}
                    </div>

                    {/* Total Amount */}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t">
                        {total && (
                            <p className="text-lg sm:text-xl font-bold text-gray-800">
                                Total: ₩{total.toLocaleString()}
                            </p>
                        )}
                        <p className="text-gray-500">{reservationItems.length} items</p>
                    </div>

                    {/* Book Now Button */}
                    <div className="text-center mt-6">
                        <button className="text-white font-semibold py-2 px-6 rounded-lg bg-stone-400 hover:bg-stone-600 transition duration-300 shadow-md w-full sm:w-auto">
                            Book now
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-6">Please log in to see your reservation.</p>
            )}

            {/* Tour Details */}
            <div className="w-full max-w-lg p-4 mt-10 bg-white shadow-lg rounded-lg mb-10">
                <TourDetails />
            </div>
        </div>
    );
};

export default ReservationComponent;
