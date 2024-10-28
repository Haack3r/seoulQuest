import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useMemo } from "react";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";

const CartComponent = () => {
    const { isLogin, loginState } = useCustomLogin();
    const { refreshCart, cartItems, changeCart } = useCustomCart();

    const total = useMemo(() => {
        let total = 0;
        for (const item of cartItems) {
            total += item.pprice * item.pqty;
        }
        return total;
    }, [cartItems]);

    useEffect(() => {
        if (isLogin) {
            // refreshCart(); // 화면 새로고침 시 , 카트 아이템을 다시 조회
        }
    }, [isLogin]);

    return (
        <div className="flex flex-col items-center w-full mt-10 px-4">
            {isLogin ? (
                <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                    {/* Cart Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold">{loginState.nickname}'s Cart</h2>
                        <div className="bg-orange-600 text-white font-bold rounded-full py-2 px-4">
                            Items: {cartItems.length}
                        </div>
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
                    <div className="text-right mb-6">
                        <p className="text-2xl font-bold">Total: ₩{total.toFixed(2)}</p>
                    </div>

                    {/* Checkout Button */}
                    <div className="flex justify-center">
                        <button
                            className="w-full max-w-xs bg-green-600 text-white text-lg font-semibold py-3 rounded-full hover:bg-green-500 transition-colors duration-300"
                            type="button"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Please log in to see your cart.</p>
            )}
        </div>
    );
};

export default CartComponent;
