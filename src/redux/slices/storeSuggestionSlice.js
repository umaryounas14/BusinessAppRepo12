import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {storeSuggestions, BASE_URL} from '../../constants/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    return accessToken;
  } catch (error) {
    console.error('Error retrieving access token from AsyncStorage:', error);
    throw error;
  }
};

// Async action to fetch store suggestions
export const fetchSuggestions = createAsyncThunk(
  'storeSuggestions/fetchSuggestions',
  async ({businessType, search}) => {
    try {
      const accessToken = await getAccessToken(); // Retrieve the access token


      console.log('Fetching suggestions with:::::::::', {
        businessType,
        search,
        accessToken,
      });
      const response = await axios.get(`${BASE_URL}stores/suggestions`, {
        params: {
          businessType,
          search,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the access token in the Authorization header
        },
      });

      console.log(
        'response------------------------------suggestion',
        response?.body,
      );

      return response?.data;
    } catch (error) {
      console.error('Error fetching store suggestions:', error);
      throw error;
    }
  },
);

const storeSuggestionSlice = createSlice({
  name: 'storeSuggestions',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSuggestions.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default storeSuggestionSlice.reducer;
