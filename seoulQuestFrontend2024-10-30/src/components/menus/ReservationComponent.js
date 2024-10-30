import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useMemo } from "react";
import useCustomReservation from "../../hooks/useCustomReservation";
import ReservationItemComponent from "../cartAndReservation/ReservationItemComponent";

const ReservationComponent = () => {
    const { isLogin, loginState } = useCustomLogin();
    const { refreshReservation, reservationItems, changeReservation } = useCustomReservation();

    const total = useMemo(() => {
        let total = 0;

        console.log("1) reservationItems",reservationItems);
        console.log("2)reservationItems.error" ,reservationItems.error)
        
        if(reservationItems.length == 0 || reservationItems.error == "ERROR_ACCESS_TOKEN"){
            console.log("3) 예약이 비어있을때")
            return total;
        }else{
            
            for (const titem of reservationItems) {
                total += titem.tprice * titem.tqty;
            }
            return total;
          

        }


    }, [reservationItems]);

    useEffect(() => {
        console.log(isLogin)
        if (isLogin) {
            refreshReservation(); 
        }
    }, [isLogin]);

    return (
        <div className="flex flex-col items-center w-full mt-10 px-4">
            {isLogin ? (
                <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                    {/* Reservation Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold">{loginState.nickname}'s Reservation</h2>
                        <div className="bg-orange-600 text-white font-bold rounded-full py-2 px-4">
                            Items: {reservationItems.length}
                        </div>
                    </div>

                    {/* Reservation Items */}
                    <div className="mb-6">
                        {reservationItems.length > 0 ? (
                            <ul className="space-y-4">
                                {reservationItems.map((titem) => (
                                    <ReservationItemComponent
                                        {...titem}
                                        key={titem.rino}
                                        changeReservation={changeReservation}
                                        email={loginState.email}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-500">Your reservation is empty.</p>
                        )}
                    </div>

                    {/* Total Amount */}
                    <div className="text-right mb-6">
                        <p className="text-2xl font-bold">Total: ₩{total.toFixed(2)}</p>
                    </div>

                    {/* Checkout Button */}
                    <div className="flex justify-center">
                        <button
                            className="w-full max-w-xs bg-green-600 text-white text-lg font-semibold py-3 rounded-full hover:bg-green-500 transition-colors duration-300"
                            type="button"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Please log in to see your reservation.</p>
            )}
        </div>
    );
};

export default ReservationComponent;
