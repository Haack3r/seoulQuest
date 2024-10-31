import React from 'react'
import { API_SERVER_HOST } from '../../api/todoApi';
import { UserOutlined ,DeleteOutlined} from "@ant-design/icons";

const host = API_SERVER_HOST

const CartItemComponent = ({cino, pname, pprice, pno, pqty, imageFile, changeCart, email}) => {
    
    const handleCLickQty = (amount) => {
        changeCart({ email, cino, pno, pqty: pqty + amount})

    }
  return (
    <li key = {cino}>
        <div className="space-y-2">
        <div className="text-gray-900 text-lg font-bold flex justify-between mt-8">
            <div>{pname}</div>
            <button 
                className="flex items-center space-x-2 p-2 bg-gray-100 text-red-600 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-200"
                onClick={() => handleCLickQty(-1 * pqty)}
            >
                <DeleteOutlined className="text-lg" />
                <span className="text-sm font-semibold">Delete</span>
            </button>
        </div>
        <div className='m-1 p-1'>
            <img className=' rounded-lg shadow-lg' src={`${host}/api/products/view/s_${imageFile}`}/>
        </div>
        {/* Quantity Selection */}
        <div className="space-y-4">
            <div>
                <label className="block text-gray-700 font-medium mb-1">Quantity </label>
                <p className="text-xs text-gray-500 mb-2">You can select up to 5 for this package</p>
            
                
                <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-3">
                    <span className="text-gray-700 font-semibold">Adult (aged 18+)</span>
                    <div className="flex items-center space-x-3">
                        <button onClick={()=> handleCLickQty(-1)} className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">-</button>
                        <span className="text-gray-700">{pqty}</span>
                        <button onClick={()=> handleCLickQty(1)} className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">+</button>
                    </div>
                </div>
            </div>
        </div>



            <div className='justify-center p-2 text-xl '>
                <div className='jsutify-end w-full'>
                </div>
                <div>Cart Item No: {cino}</div>
                <div>Pno: {pno}</div>
                <div>Name: {pname}</div>
                <div>Price: {pprice}</div>
                <div className='flex'>
                    <div className='w-2/3'>
                    Qty: {pqty}
                    </div>
                    <div>
                    <button className='m-1 p-1 text-2xl bg-orange-500 w-8 rounded-lg' 
                    onClick={()=> handleCLickQty(1)}>
                            +
                        </button>
                        <button className='m-1 p-1 text-2xl bg-orange-500 w-8 rounded-lg' 
                        onClick={()=> handleCLickQty(-1)}>
                            -
                        </button>
                    </div>
                </div>
                <div>
                    <div className='flex text-white font-bold p-2 justify-center'>
                        <button
                        className='m-1 p-1 text-white bg-red-500 w-full rounded-lg' onClick={()=> handleCLickQty(-1 * pqty)}>
                            delete
                        </button>
                    </div>
                    <div className='font-extrabold border-t-2 text-right m-2 pr-4'>
                        ₩{pqty * pprice} 
                    </div>
                </div>
            </div>
            </div>
    </li>
  );
}

export default CartItemComponent