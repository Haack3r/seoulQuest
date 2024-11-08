import React, { useEffect, useMemo } from "react"; 
import useCustomLogin from "../../hooks/useCustomLogin"; 
import useCustomFav from "../../hooks/useCustomFav"; 
import FavProductComponent from "../favProductAndTour/FavProductCompnent";
import { ShoppingCartOutlined } from "@ant-design/icons"; 
import { useNavigate } from "react-router-dom";

const ProductComponent = () => {
    const navigate = useNavigate();
    const { isLogin, loginState } = useCustomLogin();
    const { refreshFav, favItems, changeFav } = useCustomFav();

    const total = useMemo(() => {
        let total = 0;
        if (favItems.length !== 0) {
            if (favItems.error === 'ERROR_ACCESS_TOKEN') return;
            for (const item of favItems) {
                total += item.pprice * item.pqty;
            }
            return total;
        }
    }, [favItems]);

    useEffect(() => {
        if (isLogin) {
            refreshFav();
        }
    }, [isLogin]);

    return (
        <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8">
            {isLogin ? (
                <div className="w-full max-w-3xl bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-xl">
                    {/* Cart Header */}
                    <div className="mb-6 border-b pb-4 flex items-center space-x-2">
                        <ShoppingCartOutlined className="text-2xl sm:text-3xl text-gray-700" />
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Shopping Cart</h2>   
                    </div>

                    {/* Cart Items */}
                    <div className="mb-6">
                        {favItems.length > 0 ? (
                            <ul className="space-y-4">
                                {favItems.map((item) => (
                                    <FavProductComponent
                                        {...item}
                                        key={item.fino}
                                        changeFav={changeFav}
                                        email={loginState.email}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-500">Your cart is empty.</p>
                        )}
                    </div>

                    {/* Total Amount */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 border-t pt-4">
                        {total && (
                            <p className="text-lg sm:text-xl font-bold text-gray-800">
                                Total: ₩{total.toLocaleString()}
                            </p>
                        )}
                        <p className="text-gray-600">{favItems.length} items</p>
                    </div>

                    {/* Checkout Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            className="text-white font-semibold py-2 px-6 rounded-lg bg-stone-400 hover:bg-stone-600 transition duration-300 shadow-md w-full sm:w-auto"
                            type="button"
                            onClick={()=>navigate('/user/products/order')}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-12">Please log in to see your cart.</p>
            )}
        </div>
    );
};

export default ProductComponent