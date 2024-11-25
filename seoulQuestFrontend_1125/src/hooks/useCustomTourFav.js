import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getFavTourItemsAsync, // renamed to emphasize tours
  postChangeTourFavAsync, // renamed to emphasize tours
  deleteTourFavItemAsync, // renamed to emphasize tours
  deleteBulkTourFavItemAsync // renamed to emphasize tours
} from '../slices/favTourSlice';

const useCustomTourFav = () => {
    const favItems = useSelector((state) => state.favTour.items || []); // Ensure this points to tours
    const dispatch = useDispatch();

    const refreshFav = useCallback(() => {
        dispatch(getFavTourItemsAsync()); // Ensure this fetches tours only
    }, [dispatch]);

    const changeFav = useCallback(async (favItem) => {
        const isAlreadyFavorite = favItems.some(item => item.tno === favItem.tno);
        if (isAlreadyFavorite) {
            alert("This tour is already in your favorites!");
            return;
        }
        await dispatch(postChangeTourFavAsync(favItem));
        refreshFav();
    }, [dispatch, favItems, refreshFav]);

    const deleteFav = useCallback(async (ftino) => {
        await dispatch(deleteTourFavItemAsync(ftino));
        refreshFav();
    }, [dispatch, refreshFav]);

    const deleteBulkFav = useCallback((ftinoList) => {
        dispatch(deleteBulkTourFavItemAsync(ftinoList)).then(() => refreshFav());
    }, [dispatch, refreshFav]);

    return { favItems, refreshFav, changeFav, deleteFav, deleteBulkFav };
};

export default useCustomTourFav;
