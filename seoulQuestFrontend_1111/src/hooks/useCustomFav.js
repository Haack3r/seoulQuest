import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavItemsAsync, postChangeFavAsync, deleteFavItemAsync, deleteBulkFavItemAsync } from '../slices/favSlice';

const useCustomFav = () => {
    const favItems = useSelector((state) => state.fav.items || []);
    const dispatch = useDispatch();

    const refreshFav = useCallback(() => {
        dispatch(getFavItemsAsync());
    }, [dispatch]); // Wrap refreshFav with useCallback to make it stable

    const changeFav = useCallback((favItem) => {
        dispatch(postChangeFavAsync(favItem));
    }, [dispatch]);

    const deleteFav = useCallback((fino) => {
        dispatch(deleteFavItemAsync(fino));
    }, [dispatch]);

    const deleteBulkFav = useCallback((finoList) => {
        dispatch(deleteBulkFavItemAsync(finoList));
    }, [dispatch]);

    return { favItems, refreshFav, changeFav, deleteFav, deleteBulkFav };
};

export default useCustomFav;
