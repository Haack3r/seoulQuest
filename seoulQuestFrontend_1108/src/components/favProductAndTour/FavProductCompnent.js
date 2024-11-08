import React from 'react';
import { API_SERVER_HOST } from '../../api/todoApi';
import { DeleteOutlined } from "@ant-design/icons"; 

const host = API_SERVER_HOST;

const FavProductCompnent = ({ fino, pname, pprice, pno, pqty, imageFile, changeFav, email }) => {
    const handleCLickQty = (amount) => {
        changeFav({ email, fino, pno, pqty: pqty + amount });
    };
  return ( <li key={fino} className="flex flex-col items-start p-4 bg-stone-100 rounded-lg shadow-sm">
    <div className="flex items-center w-full space-x-4 ">
        {/* Product Image */}
        <div className="w-1/2">
            <img
                className="w-full h-25 object-cover rounded-lg shadow-md"
                src={`${host}/api/products/view/s_${imageFile}`}
                alt={pname}
            />
        </div>
        <div className="w-1/2 flex flex-col relative">
            {/* Delete Button positioned at top-right */}
            <button
                onClick={() => handleCLickQty(-1 * pqty)}
                className="absolute top-0 right-0 text-red-500 hover:text-red-700 transition-all duration-200"
            >
                <DeleteOutlined className="text-lg" />
            </button>
            
            {/* Product Information */}
            <h3 className="text-lg font-semibold text-gray-900">{pname}</h3>
            <p className="text-sm text-gray-500">₩{pprice.toLocaleString()}</p>
        </div>
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
            className="px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
            +
        </button>
    </div>
</div>

</li>
);
};

export default FavProductCompnent