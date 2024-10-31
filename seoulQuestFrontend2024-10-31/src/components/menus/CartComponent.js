import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useMemo } from "react";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cartAndReservation/CartItemComponent";

const CartComponent = () => {
    const { isLogin, loginState } = useCustomLogin();
    const { refreshCart, cartItems, changeCart } = useCustomCart();

    const total = useMemo(() => {
        let total = 0;
        console.log(cartItems)
        if(cartItems.length !==0) {
            console.log("여기에 들어오네", cartItems)
            if(cartItems.error === 'ERROR_ACCESS_TOKEN') return
            
            for (const item of cartItems) {
                total += item.pprice * item.pqty;
            }
            return total;
        }
       
    }, [cartItems]);

    useEffect(() => {
        if (isLogin) {
            refreshCart(); // 화면 새로고침 시 , 카트 아이템을 다시 조회
        }
    }, [isLogin]);

    return (
        <div className="flex flex-col items-center w-full px-4">
            {isLogin ? (
                <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                    {/* Cart Header */}
                    <div className="mb-6 border-b pb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Cart</h2>   
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
                    <div className="flex justify-between items-center mt-6">
                        {total && <p className="text-2xl font-bold">Total: ₩{total.toFixed(2)}</p>}
                    </div>

                    {/* Checkout Button */}
                    <div className="flex justify-center">
                        <button
                            className="text-white font-semibold py-2 px-6 rounded-lg bg-stone-400 hover:bg-stone-600 transition duration-300"
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
