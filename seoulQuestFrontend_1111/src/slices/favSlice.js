import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFavItems, postChangeFav, deleteFavItem, deleteFavItemsBulk  } from '../api/favoriteApi';

// Define the existing async thunks
export const getFavItemsAsync = createAsyncThunk('fav/getFavItems', async () => {
    const response = await getFavItems();
    return response; // This should be the data from the API
});

export const postChangeFavAsync = createAsyncThunk('fav/postChangeFav', async (favItem) => {
    const response = await postChangeFav(favItem);
    return response;
});

// Define the missing deleteFavItemAsync thunk
export const deleteFavItemAsync = createAsyncThunk('fav/deleteFavItem', async (fino) => {
    const response = await deleteFavItem(fino);
    return response;
});
export const deleteBulkFavItemAsync = createAsyncThunk('fav/deleteBulkFavItem', async (finoList) => {
    const response = await deleteFavItemsBulk(finoList);
    return response || []; // Return an empty array if the response is null to avoid errors
});


// Create the slice
const favSlice = createSlice({
    name: 'fav',
    initialState: {
        items: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFavItemsAsync.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(postChangeFavAsync.fulfilled, (state, action) => {
                state.items.push(action.payload); // Optionally update the state if needed
            })
            .addCase(deleteFavItemAsync.fulfilled, (state, action) => {
                // Remove the item from the state based on the ID (fino) after successful deletion
                state.items = state.items.filter(item => item.fino !== action.meta.arg);
            })
            .addCase(deleteBulkFavItemAsync.fulfilled, (state, action) => {
                const finoList = action.payload; // Guaranteed to be an array (possibly empty)
                state.items = state.items.filter(item => !finoList.includes(item.fino));
            });
    },
});

export default favSlice.reducer;
