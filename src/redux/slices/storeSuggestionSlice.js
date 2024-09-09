import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { storeSuggestions, BASE_URL } from '../../constants/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to get access token from AsyncStorage
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
// Action to fetch suggestions
export const fetchSuggestions = createAsyncThunk(
  'storeSuggestions/fetchSuggestions',
  async ({ businessType, search, accessToken }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://maryjfinder.com/api/stores/suggestions?type=${businessType}&search=${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Include the token in the Authorization header
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// export const fetchSuggestions = createAsyncThunk(
//   'storeSuggestions/fetchSuggestions',
//   async ({ businessType, search }) => {
//     const accessToken = await getAccessToken();
    
//     try {
//       // Make API request to fetch suggestions
//       // const response = await axios.get(`${BASE_URL}stores/suggestions`
//       const response = await axios.get(`${BASE_URL}${storeSuggestions}&businessType=${businessType}&search=${search}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`, // Attach access token in headers
//         },
//       });
//       console.log('response.data---------suggestionnew one-', response?.data?.body?.response || []);      return response.data; 
//       // Ensure the API response is returned properly
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//       throw error;
//     }
//   },
// );

// Redux slice for store suggestions
// const storeSuggestionSlice = createSlice({
//   name: 'storeSuggestions',
//   initialState: {
//     data: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSuggestions.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchSuggestions.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload.body; 
//         // state.data = action.payload; // Update state with fetched suggestions
//       })
//       .addCase(fetchSuggestions.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message; // Store error message if the request fails
//       });
//   },
// });

// export default storeSuggestionSlice.reducer;

// // redux/slices/storeSuggestionSlice.js
// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
// import {storeSuggestions, BASE_URL} from '../../constants/endpoints';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // Async action to fetch store suggestions
// const getAccessToken = async () => {
//   try {
//     const accessToken = await AsyncStorage.getItem('accessToken');
//     return accessToken;
//   } catch (error) {
//     console.error('Error retrieving access token from AsyncStorage:', error);
//     throw error;
//   }
// };
// export const fetchSuggestions = createAsyncThunk(
//   'storeSuggestions/fetchSuggestions',
//   async ({ businessType = 'dispensaries', search}) => {
//     const accessToken = await getAccessToken();
//     const response = await axios.get('https://maryjfinder.com/api/stores/suggestions', {
//       params: {
//         businessType,
//         search,
//       },
//     });
//     console.log(
//       'response------------------------------suggestion0000000',
//       response,
//     );
//     // return response.data;
//   },
// );

// const storeSuggestionSlice = createSlice({
//   name: 'storeSuggestions',
//   initialState: {
//     data: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchSuggestions.pending, state => {
//         state.status = 'loading';
//       })
//       .addCase(fetchSuggestions.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//       })
//       .addCase(fetchSuggestions.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default storeSuggestionSlice.reducer;
