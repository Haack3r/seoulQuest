import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavItemsAsync, postChangeFavAsync, deleteFavItemAsync, deleteBulkFavItemAsync } from '../slices/favSlice';

const useCustomFav = () => {
    const favItems = useSelector((state) => state.fav.items || []);
    const dispatch = useDispatch();

    const refreshFav = useCallback(() => {
        dispatch(getFavItemsAsync());
    }, [dispatch]);
    
    const changeFav = useCallback((favItem) => {
        // Check if the product is already in favorites
        const isAlreadyFavorite = favItems.some(item => item.pno === favItem.pno);
        if (isAlreadyFavorite) {
            alert("You already liked this product!");
            return;
        }
        
        // Proceed to add the product to favorites
        console.log("changeFav called", favItem);
        dispatch(postChangeFavAsync(favItem));
    }, [dispatch, favItems]);
    

    const deleteFav = useCallback((fino) => {
        console.log("deleteFav called", fino);
        dispatch(deleteFavItemAsync(fino));
    }, [dispatch]);

    const deleteBulkFav = useCallback((finoList) => {
        console.log("deleteBulkFav called with finoList:", finoList);
        dispatch(deleteBulkFavItemAsync(finoList));
    }, [dispatch]);

    return { favItems, refreshFav, changeFav, deleteFav, deleteBulkFav };
};

export default useCustomFav;
