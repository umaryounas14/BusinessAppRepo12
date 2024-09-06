// redux/slices/storeSuggestionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch store suggestions
export const fetchSuggestions = createAsyncThunk(
  'storeSuggestions/fetchSuggestions',
  async ({ businessType, search }) => {
    const response = await axios.get('/stores/suggestions', {
      params: {
        businessType,
        search,
      },
    });
console.log('response------------------------------suggestion',response?.data)
    // return response.data;
  }
);

const storeSuggestionSlice = createSlice({
  name: 'storeSuggestions',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
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
