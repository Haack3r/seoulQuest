import React from 'react';
import { API_SERVER_HOST } from '../../api/reviewApi';
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const host = API_SERVER_HOST;

const FavProductComponent = ({ pno, fino, pname, pprice, uploadFileNames, handleDelete, handleSelect, selected }) => {
    console.log('pfiles:', uploadFileNames);
    return (
        <div
            key={fino}
            className="relative flex items-center p-4 bg-white shadow-md rounded-lg mb-4 space-x-4"
        >
            {/* Delete Button */}
            <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-all duration-200"
                onClick={() => handleDelete(fino)}
            >
                <DeleteOutlined className="text-lg" />
            </button>

            {/* Product Image */}
            <Link to={`/user/products/read/${pno}?page=1&size=10`} className="w-1/2">
                <img
                    className="w-full h-25 object-cover rounded-lg shadow-md"
                    src={`${host}/api/products/view/s_${uploadFileNames}`}
                    alt={pname}
                />
            </Link>

            {/* Product Information */}
            <div className="w-1/2 flex flex-col space-y-2">
                {/* Title and Price */}
                <h3 className="text-lg font-semibold text-gray-900">{pname}</h3>
                <p className="text-sm text-gray-500">₩{pprice.toLocaleString()}</p>

                {/* Selection Checkbox */}
                <div className="flex items-center justify-end">
                    <input
                        type="checkbox"
                        className="form-checkbox w-5 h-5 text-blue-600"
                        checked={selected}
                        onChange={() => handleSelect(fino)}
                    />
                </div>
            </div>
        </div>
    );
};

export default FavProductComponent;
