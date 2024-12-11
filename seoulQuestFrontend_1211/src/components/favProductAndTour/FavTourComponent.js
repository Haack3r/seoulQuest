import React from 'react';
import { API_SERVER_HOST } from '../../api/reviewApi';
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const host = API_SERVER_HOST;

const FavTourComponent = ({ tno, ftino, tname, tprice, uploadFileNames, handleDelete, handleSelect, selected }) => {
    return (
        <div
            key={ftino}
            className="relative flex flex-row items-center p-4 bg-white shadow-md rounded-lg mb-4 space-x-4"
        >
            {/* Delete Button */}
            <button
                className="absolute top-0 right-2 text-red-500 hover:text-red-700 transition-all duration-200"
                onClick={() => handleDelete(ftino)}
            >
                <DeleteOutlined className="text-lg" />
            </button>

            {/* Tour Image */}
            <Link to={`/user/tours/read/${tno}?page=1&size=10`} className="w-1/3">
                <img
                    className="w-full h-24 object-cover rounded-lg shadow-md"
                    src={`${host}/api/tours/view/s_${uploadFileNames[0]}`}
                    alt={tname}
                />
            </Link>

            {/* Tour Information */}
            <div className="w-1/2 flex flex-col justify-between space-y-2">
                {/* Title and Price */}
                <div className="flex flex-col">
                    <h3 className="text-sm md:text-lg font-semibold text-gray-900 break-words">
                        {tname}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">₩{tprice.toLocaleString()}</p>
                </div>

                {/* Selection Checkbox */}
                <div className="flex items-center justify-end">
                    <input
                        type="checkbox"
                        className="form-checkbox w-4 h-4 text-blue-600"
                        checked={selected}
                        onChange={() => handleSelect(ftino)}
                    />
                </div>
            </div>
        </div>
    );
};

export default FavTourComponent;
