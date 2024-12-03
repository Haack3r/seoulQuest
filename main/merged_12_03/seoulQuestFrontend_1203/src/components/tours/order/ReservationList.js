import React from "react";
import { Globe, CalendarCheck, ContactRound, Wallet } from "lucide-react";

const ReservationList = ({ bookInfo, selectedItems, handleToggleSelect, host }) => {
    return (
        <div className="px-6 py-4 bg-white rounded-xl shadow-md mb-6">
            <hr className="border-t border-gray-200 my-4" />
            {bookInfo.torderItems.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between mb-4 border-b pb-4"
                >
                    {/* Left Section: Checkbox, Image, and Name */}
                    <div className="flex items-center">
                        {/* Checkbox */}
                        <input
                            type="checkbox"
                            onChange={() => handleToggleSelect(index)}
                            checked={selectedItems.has(index)}
                            className="mr-4"
                        />
                        {/* Tour Image */}
                        <img
                            src={`${host}/api/tours/view/s_${item.tfiles}`}
                            alt="Tour Image"
                            className="w-17 h-16 mr-4 rounded"
                        />
                        {/* Tour Name */}
                        <div>
                            <p className="font-semibold text-gray-700 mb-2">{item.tname}</p>
                        </div>
                    </div>

                    {/* Right Section: Tour Details */}
                    <div className="text-right space-y-2">
                        <p className="text-xs flex items-center">
                            <CalendarCheck className="h-4 w-4 mr-1" />
                            {item.tdate}
                        </p>
                        <p className="text-xs flex items-center">
                            <ContactRound className="h-4 w-4 mr-1" />
                            {item.tqty}
                        </p>
                        <p className="text-xs flex items-center">
                            <Globe className="h-4 w-4 mr-1" />
                            Language: English
                        </p>
                        <p className="text-xs flex items-center">
                            <Wallet className="h-4 w-4 mr-1" />
                            ₩{item.tprice}
                        </p>
                    </div>
                </div>
            ))}
            <p className="text-xs text-green-600">
                Please double-check <strong>the reservation date</strong> and <strong>the number of people</strong>.
            </p>
        </div>
    );
};

export default ReservationList;
