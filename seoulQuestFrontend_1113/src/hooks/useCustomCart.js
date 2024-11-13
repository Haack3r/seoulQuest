import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemsAsync, postChangeCartAsync } from '../slices/cartSlice';

const useCustomCart = () => {
    const cartItems = useSelector(state => state.cartSlice);
    const dispatch = useDispatch();

    const refreshCart = useCallback(() => {
        console.log("useCustomCart: refresh");
        dispatch(getCartItemsAsync());
    }, [dispatch]);

    const changeCart = useCallback((param) => {
        dispatch(postChangeCartAsync(param));
    }, [dispatch]);

    return { cartItems, refreshCart, changeCart };
}

export default useCustomCart;
