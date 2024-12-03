import React from 'react';
import { API_SERVER_HOST } from '../../api/reviewApi';
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const host = API_SERVER_HOST;

const FavTourComponent = ({ tno, ftino, tname, tprice, uploadFileNames, handleDelete, handleSelect, selected }) => {
    return (
        <div key={ftino} className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4 space-x-4">
            {/* Tour Image */}
            <Link to={`/user/tours/read/${tno}?page=1&size=10`} className="w-1/2">
                <img
                    className="w-full h-25 object-cover rounded-lg shadow-md"
                    src={`${host}/api/tours/view/s_${uploadFileNames}`}
                    alt={tname}
                />
            </Link>

            {/* Tour Information */}
            <div className="w-1/2 flex flex-col relative">
                {/* Delete Button positioned at top-right */}
                <button
                    className="absolute top-0 right-0 text-red-500 hover:text-red-700 transition-all duration-200"
                    onClick={() => handleDelete(ftino)}
                >
                    <DeleteOutlined className="text-lg" />
                </button>

                {/* Tour Title and Price */}
                <h3 className="text-lg font-semibold text-gray-900">{tname}</h3>
                <p className="text-sm text-gray-500">₩{tprice.toLocaleString()}</p>
            </div>

            {/* Selection Checkbox */}
            <div className="absolute bottom-4 right-4">
                <input type="checkbox" checked={selected} onChange={() => handleSelect(ftino)} />
            </div>
        </div>
    );
};

export default FavTourComponent;
