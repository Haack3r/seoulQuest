import React from 'react'
import { API_SERVER_HOST } from '../../api/todoApi';

const host = API_SERVER_HOST

const CartItemComponent = ({cino, pname, pprice, pno, pqty, imageFile, changeCart, email}) => {
    
    const handleCLickQty = (amount) => {
        changeCart({ email, cino, pno, pqty: pqty + amount})

    }
  return (
    <li key = {cino} className='border-2'>
        <div className='w-full border-2'>
            <div className='m-1 p-1'>
                <img src={`${host}/api/products/view/s-${imageFile}`}/>
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