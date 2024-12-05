import React from "react";
import { Badge } from "antd";

const CartList = ({ porderItems, selectedItems, handleToggleSelect, host , shippingFee}) => {
  return (
    <div className="px-6 py-4 bg-white rounded-xl shadow-md mb-6">
      <hr className="border-t border-gray-200 my-4" />
      {porderItems.map((item, index) => (
        <div key={index} className="flex items-center mb-4 border-b pb-4">
          <input
            type="checkbox"
            onChange={() => handleToggleSelect(index)}
            checked={selectedItems.has(index)}
            className="mr-4"
          />
          <img
            src={`${host}/api/products/view/s_${item.pfiles}`}
            alt="Product Image"
            className="w-16 h-16 mr-4 rounded"
          />
          <div className="flex-grow-1">
            <p className="font-semibold text-gray-700">{item.pname}</p>
            {/* {item.shippingFee === 0 && ( <Badge */}
            <Badge
            count= {item.shippingFee ? `shippingFee ₩${item.shippingFee}`: "Free Shipping"}
            style={{
              backgroundColor: item.shippingFee? "#718C5A" :"#0097A7",
              color: "#fff",
              padding: "0 10px",
              borderRadius: "5px",
            }}
            />
          {/* />)} */}
          </div>
          <div className="flex flex-col items-end mt-5 ml-auto mr-7">
            <Badge count={`₩${item.pprice.toLocaleString()}`} style={{ backgroundColor: "#52c41a" }}>
              <p className="text-gray-700 font-semibold mr-7 mb-3">Price</p>
            </Badge>
            <Badge count={item.pqty} style={{ backgroundColor: "#faad14" }}>
              <p className="text-gray-700 font-semibold mr-3 mb-2">Qty</p>
            </Badge>
          
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center text-lg font-semibold">
        <p>Shipping Fee:</p>
        <p>₩{shippingFee}</p>
      </div>
        <p className="text-xs text-gray-500 mt-1">Shipping fees depend on the product, and free shipping applies when a free shipping item is included. Otherwise, a minimum shipping fee is charged.</p>
    </div>
  );
};

export default CartList;
