import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavTourItemsAsync,
  postChangeTourFavAsync,
  deleteTourFavItemAsync,
  deleteBulkTourFavItemAsync,
} from "../slices/favTourSlice";
import useCustomLogin from "../hooks/useCustomLogin";

const useCustomTourFav = () => {
  const { loginState } = useCustomLogin();
  const email = loginState.email; 
  const favItems = useSelector((state) => state.favTour.items || []);
  const dispatch = useDispatch();

  const refreshFav = useCallback(() => {
    dispatch(getFavTourItemsAsync(email)); // Pass email when refreshing favorites
  }, [dispatch, email]);

  const changeFav = useCallback(
    async (favItem) => {
      const isAlreadyFavorite = favItems.some(
        (item) => item.tno === favItem.tno
      );
      if (isAlreadyFavorite) {
        alert("This tour is already in your favorites!");
        return;
      }
      await dispatch(postChangeTourFavAsync(favItem));
      refreshFav();
    },
    [dispatch, favItems, refreshFav]
  );

  const deleteFav = useCallback(
    async (ftino) => {
      await dispatch(deleteTourFavItemAsync(ftino));
      refreshFav();
    },
    [dispatch, refreshFav]
  );

  const deleteBulkFav = useCallback(
    (ftinoList) => {
      dispatch(deleteBulkTourFavItemAsync(ftinoList)).then(() => refreshFav());
    },
    [dispatch, refreshFav]
  );

  return { favItems, refreshFav, changeFav, deleteFav, deleteBulkFav };
};

export default useCustomTourFav;
