import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItemsAsync, postChangeCartAsync } from '../slices/cartSlice'

const useCustomCart = () => {
    const cartItems = useSelector(state => state.cartSlice)
    const dispatch = useDispatch()
    const refreshCart = () => {
        // dispatch(getCartItemsAsync())
    }
    const changeCart = (param) => {
        dispatch(postChangeCartAsync(param))
    }
  return (
    {cartItems, refreshCart, changeCart}
  )
}

export default useCustomCart