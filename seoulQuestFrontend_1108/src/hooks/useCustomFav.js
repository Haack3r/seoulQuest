import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavItemsAsync, postChangeFavAsync } from "../slices/favSlice";

const useCustomFav = () => {
  const favItems = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const refreshFav = () => {
    dispatch(getFavItemsAsync());
  };
  const changeFav = (param) => {
    dispatch(postChangeFavAsync(param));
  };
  return { favItems, refreshFav, changeFav };
};
export default useCustomFav;
