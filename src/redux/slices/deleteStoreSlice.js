import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteStore, BASE_URL } from '../../constants/endpoints';

const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    return accessToken;
  } catch (error) {
    console.error('Error retrieving access token from AsyncStorage:', error);
    throw error;
  }
};

// Adjusted thunk to handle store_id in URL and other data in the request body
export const deleteMyStore = createAsyncThunk(
   'stores/delete',
    async ({  id }, { rejectWithValue }) => { 
    try {
      const accessToken = await getAccessToken();
      const url = `https://maryjfinder.com/api/stores/delete`;
      // const response = await axios.post(url, {...data, store_id }, {  // Pass data as request body
      const response = await axios.post(url, {id }, { 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data, "323232323232323actiavted store")
      return response.data;
    } catch (error) {
      console.error('Unable to Activate', error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const deleteStoreSlice = createSlice({
  name: 'deleteStore',
  initialState: {
    loading: false,
    error: null,
    storeData: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
    //   .addCase(activateMyStore.pending, state => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(activateMyStore.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.storeData = action.payload;
    //   })
    //   .addCase(activateMyStore.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

export default deleteStoreSlice.reducer;
