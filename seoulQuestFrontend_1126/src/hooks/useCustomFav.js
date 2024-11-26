import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavItemsAsync,
  postChangeFavAsync,
  deleteFavItemAsync,
  deleteBulkFavItemAsync,
} from "../slices/favSlice";

const useCustomFav = (email) => {
  const favItems = useSelector((state) => state.fav.items || []);
  const dispatch = useDispatch();

  const refreshFav = useCallback(() => {
    if (!email) {
      console.warn("Cannot refresh favorites without an email.");
      return;
    }
    dispatch(getFavItemsAsync(email));
  }, [dispatch, email]);

  const changeFav = useCallback(
    async (favItem) => {
      const isAlreadyFavorite = favItems.some(
        (item) => item.pno === favItem.pno
      );
      if (isAlreadyFavorite) {
        alert("This product is already in your favorites!");
        return;
      }
      await dispatch(postChangeFavAsync(favItem));
      refreshFav();
    },
    [dispatch, favItems, refreshFav]
  );

  const deleteFav = useCallback(
    async (fino) => {
      await dispatch(deleteFavItemAsync(fino));
      refreshFav();
    },
    [dispatch, refreshFav]
  );

  const deleteBulkFav = useCallback(
    (finoList) => {
      dispatch(deleteBulkFavItemAsync(finoList)).then(() => refreshFav());
    },
    [dispatch, refreshFav]
  );

  return { favItems, refreshFav, changeFav, deleteFav, deleteBulkFav };
};

export default useCustomFav;
