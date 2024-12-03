import React from 'react';
import { API_SERVER_HOST } from '../../api/reviewApi';
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const host = API_SERVER_HOST;

const FavProductComponent = ({ pno, fino, pname, pprice, pimage, plink, handleDelete, handleSelect, selected }) => {
    return (
        <div key={fino} className="bg-white shadow-md rounded-lg p-5 mb-5 transition duration-300 hover:shadow-xl">
            <div className="flex justify-between items-center mb-4">
                <div className="text-gray-900 text-lg font-semibold">{pname}</div>
                <button
                    className="flex items-center space-x-2 px-2 py-1 bg-red-100 text-red-500 rounded-md hover:bg-red-200 transition-all duration-200"
                    onClick={() => handleDelete(fino)}
                >
                    <DeleteOutlined className="text-lg" />
                    <span className="text-xs font-medium">Delete</span>
                </button>
            </div>

            <div className="flex items-start space-x-4 mb-4">
                <div className="overflow-hidden rounded-md shadow-sm flex-1">
                    <img className="w-full h-20 object-cover rounded-md" src={`${host}/api/products/view/s_${pimage}`} alt={pname} />
                </div>
                <div className="flex flex-col justify-center flex-1">
                    <Link to={`/user/products/read/${pno}?page=1&size=10`} className="text-blue-500 hover:underline">View Product</Link>
                </div>
            </div>

            <div className="flex justify-between items-center p-2 border-t border-gray-200 mt-4">
                <div className="text-lg font-bold text-gray-900">₩{pprice}</div>
                <input type="checkbox" checked={selected} onChange={() => handleSelect(fino)} />
            </div>
        </div>
    );
};

export default FavProductComponent;
