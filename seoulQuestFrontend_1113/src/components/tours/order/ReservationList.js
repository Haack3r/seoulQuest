import React from "react";
import { Badge } from "antd";

const ReservationList = ({bookItems, selectedItems, handleToggleSelect, host }) => {
  return (
    <div className="px-6 py-4 bg-white rounded-xl shadow-md mb-6">
      {bookItems.map((item, index) => (
        <div key={index} className="flex items-center mb-4">
          <input
            type="checkbox"
            onChange={() => handleToggleSelect(index)}
            checked={selectedItems.has(index)}
            className="mr-4"
          />
          <img
            src={`${host}/api/tours/view/s_${item.tfiles}`}
            alt="Tour Image"
            className="w-16 h-16 mr-4 rounded"
          />
          <div className="flex-grow-1">
            <p className="font-semibold text-gray-700">{item.tname}</p>
            <p className="text-gray-500">Standard packaging included</p>
          </div>
          <div className="flex flex-col items-end mt-5 ml-auto mr-6">
            <Badge count={`₩${item.tprice.toLocaleString()}`} style={{ backgroundColor: "#52c41a" }}>
              <p className="text-gray-700 font-semibold mr-7 mb-5">Price</p>
            </Badge>
            <Badge count={item.tqty} style={{ backgroundColor: "#faad14" }}>
              <p className="text-gray-700 font-semibold mr-3 mb-5">Qty</p>
            </Badge>
          </div>
        </div>
      ))}

      <hr className="border-t border-gray-400 my-6" />
      <div className="flex justify-between items-center text-lg font-semibold">
        <p>Shipping Fee:</p>
        {/* <p>₩3,000</p> */}
        <p>₩0</p>
      </div>
    </div>
  );
};

export default ReservationList;
