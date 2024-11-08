import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomTour from "../../hooks/useCustomTour";
import { useEffect, useMemo } from "react";
import { SolutionOutlined } from "@ant-design/icons";
import FavTourComponent from "../favProductAndTour/FavTourComponent";

const TourComponent = ({ maxCapacity }) => {
    const { isLogin, loginState } = useCustomLogin();
    const { refreshTour, tourItems = [], changeTour } = useCustomTour(); // Default to empty array

    const total = useMemo(() => {
        let total = 0;
        if (tourItems?.length === 0 || tourItems?.error === "ERROR_ACCESS_TOKEN") {
            return total;
        } else {
            for (const titem of tourItems) {
                total += titem.tprice * titem.tqty;
            }
            return total;
        }
    }, [tourItems]);

    useEffect(() => {
        if (isLogin) {
            refreshTour();
        }
        console.log(tourItems);
    }, [isLogin, refreshTour]);

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
                        {tourItems?.length > 0 ? (
                            tourItems.map((titem) => (
                                <FavTourComponent
                                    maxCapacity={maxCapacity}
                                    email={loginState.email}
                                    {...titem}
                                    key={titem.fino}
                                    changeTour={changeTour}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Your reservation is empty.</p>
                        )}
                    </div>

                    {/* Total Amount */}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t">
                        {total > 0 && (
                            <p className="text-lg sm:text-xl font-bold text-gray-800">
                                Total: ₩{total.toLocaleString()}
                            </p>
                        )}
                        <p className="text-gray-500">{tourItems?.length} items</p>
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
        </div>
    );
};

export default TourComponent;
