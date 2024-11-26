import React from 'react';
import { API_SERVER_HOST } from '../../api/reviewApi';
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";

const host = API_SERVER_HOST;

const ReservationItemComponent = ({ rino, tname, tprice, tdate, tno, tqty, imageFile, changeReservation, email, maxCapacity, availableCapacity }) => {
    console.log("여기는 Reservation Items");


    const handleClickQty = (amount) => {
        const newQty = tqty + amount;
        
        // 수량이 최대 인원수를 초과하지 않도록 제한
        if (newQty > maxCapacity || newQty < 0) return; 

        changeReservation({ email, rino, tno, tdate, tqty: newQty, maxCapacity, availableCapacity });
    };

 

    return (
        <div key={rino} className="bg-white shadow-md rounded-lg p-5 mb-5 transition duration-300 hover:shadow-xl">
            {/* Title and Delete Button */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-gray-900 text-lg font-semibold">{tname}</div>
                <button
                    className="flex items-center space-x-2 px-2 py-1 bg-red-100 text-red-500 rounded-md hover:bg-red-200 transition-all duration-200"
                    onClick={() => handleClickQty(-1 * tqty)}
                >
                    <DeleteOutlined className="text-lg" />
                    <span className="text-xs font-medium">Delete</span>
                </button>
            </div>

            {/* Image and Date Side-by-Side */}
            <div className="flex items-start space-x-4 mb-4">
    <div className="overflow-hidden rounded-md shadow-sm flex-1">
        <img className="w-full h-20 object-cover rounded-md" src={`${host}/api/tours/view/s_${imageFile}`} alt={tname} />
    </div>
    <div className="flex flex-col justify-center flex-1">
        <span className="text-sm text-gray-600 font-semibold mb-1">📅 Date</span>
        <span className="text-gray-900 text-md font-bold bg-gray-100 p-2 rounded-md text-center">{tdate}</span>
    </div>
</div>

            {/* Quantity Selection */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">How Many Participants?</label>
                <p className="text-xs text-gray-500 mb-3">Add your participants below and get ready for an unforgettable experience!</p>

                <div className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded-md p-2 mb-4">
                    <span className="text-gray-700 text-sm font-semibold">Adult</span>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => handleClickQty(-1)}
                            className="px-3 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
                        >
                            -
                        </button>
                        <span className="text-gray-800 font-semibold">{tqty}</span>
                        <button
                            onClick={() => handleClickQty(1)}
                            disabled={tqty >= maxCapacity} // 최대 인원 수에 도달하면 비활성화
                            className={`px-3 py-1 rounded-md ${
                                tqty >= maxCapacity ? "bg-gray-300 text-gray-400" : "text-gray-700 bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            +
                        </button>

                       
                    </div>
                </div>
            </div>

            {/* Price Display */}
            <div className="flex justify-end p-2 border-t border-gray-200 mt-4">
                <div className="text-lg font-bold text-gray-900">₩{tqty * tprice}</div>
            </div>
        </div>
    );
};

export default ReservationItemComponent;
