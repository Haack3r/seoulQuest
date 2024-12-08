import React from 'react';
import { API_SERVER_HOST } from '../../api/reviewApi';
import { DeleteOutlined } from "@ant-design/icons"; 
import { Link } from 'react-router-dom';

const host = API_SERVER_HOST;

const CartItemComponent = ({ cino, pname, pprice, pno, pqty, pfiles, changeCart, email ,stockQty}) => {
    const handleCLickQty = (amount) => {
        changeCart({ email, cino, pno, pqty: pqty + amount });
    };

    return (
        <li key={cino} className="relative flex flex-col items-start p-4 bg-white shadow-md rounded-lg ">
            <div className="flex items-center w-full space-x-4">
                {/* Product Image */}
                <Link to={`/user/products/read/${pno}?page=1&size=10`} className="w-1/3">
                    <img
                        className="w-full h-24 object-cover rounded-lg shadow-md"
                        src={`${host}/api/products/view/s_${pfiles}`}
                        alt={pname}
                    />
                </Link>

                <div className="w-1/2 flex flex-col space-y-2">
                    {/* Product Information */}
                    <h3 className="text-lg font-semibold text-gray-900 break-words">{pname}</h3>
                </div>

                {/* Delete Button */}
                <button
                    onClick={() => handleCLickQty(-1 * pqty)}
                    className="absolute top-0 right-2 text-red-500 hover:text-red-700 transition-all duration-200"
                >
                    <DeleteOutlined className="text-lg" />
                </button>
            </div>

            {/* Quantity Controls */}
            <div className="flex justify-between items-center w-full mt-2">
                {/* Price on the left */}
                <div className="text-lg font-bold text-gray-800">
                    ₩{(pprice * pqty).toLocaleString()}
                </div>

                {/* Quantity Controls on the right */}
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleCLickQty(-1)}
                        className="px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        -
                    </button>
                    <span className="text-gray-700 font-medium">{pqty}</span>
                    <button
                        onClick={() => handleCLickQty(1)}
                        disabled={pqty >= stockQty} // 최대 수량에 도달하면 비활성화
                            className={`px-3 py-1 rounded-md ${
                                pqty >= stockQty ? "bg-gray-300 text-gray-400" : "text-gray-700 bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        +
                    </button>
                </div>
            </div>
        </li>
    );
};

export default CartItemComponent;
