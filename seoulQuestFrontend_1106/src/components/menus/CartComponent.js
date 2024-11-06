import React, { useEffect, useMemo } from "react"; // useEffect, useMemo import 추가
import useCustomLogin from "../../hooks/useCustomLogin"; // useCustomLogin import 추가
import useCustomCart from "../../hooks/useCustomCart"; // useCustomCart import 추가
import CartItemComponent from "../cartAndReservation/CartItemComponent"; // CartItemComponent import 추가
import { ShoppingCartOutlined } from "@ant-design/icons"; // ShoppingCartOutlined import 추가



const CartComponent = () => {
    const { isLogin, loginState } = useCustomLogin();
    const { refreshCart, cartItems, changeCart } = useCustomCart();

    const total = useMemo(() => {
        let total = 0;
        if (cartItems.length !== 0) {
            if (cartItems.error === 'ERROR_ACCESS_TOKEN') return;
            for (const item of cartItems) {
                total += item.pprice * item.pqty;
            }
            return total;
        }
    }, [cartItems]);

    useEffect(() => {
        if (isLogin) {
            refreshCart();
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
                        {cartItems.length > 0 ? (
                            <ul className="space-y-4">
                                {cartItems.map((item) => (
                                    <CartItemComponent
                                        {...item}
                                        key={item.cino}
                                        changeCart={changeCart}
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
                                Total: ₩{total.toFixed(2)}
                            </p>
                        )}
                        <p className="text-gray-600">{cartItems.length} items</p>
                    </div>

                    {/* Checkout Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            className="text-white font-semibold py-2 px-6 rounded-lg bg-stone-400 hover:bg-stone-600 transition duration-300 shadow-md w-full sm:w-auto"
                            type="button"
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
export default CartComponent;
