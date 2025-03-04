
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    compose: {
        loading: false,
        success: false,
        error: null,
    },
    topNews: {
        loading: false,
        data: [],
        error: null,
    },
    credibleNews: {
        loading: false,
        data: [],
        error: null,
    },
    latestNews: {
        loading: false,
        data: [],
        error: null,
    },

};

export const composeScoopAsync = createAsyncThunk(
    'scoop/composeScoopAsync',
    async (scoopData, { dispatch, getState }) => {
        try {

            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTgzMmM5OTFlN2FhNjU1YTA3YmJhMTIiLCJGaXJzdE5hbWUiOiJrYXJ0aGlrIiwiTGFzdE5hbWUiOiJyZWRkeSIsIlVzZXJOYW1lIjoia3IyNTE2MSIsIlByb2ZpbGVJbWFnZSI6ImZpbGVzL2FkbWluLW15RmlsZS0xNzAzMDk1NDQ5NDUxLmpwZWciLCJFbWFpbCI6ImtyMjUxNjFAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsIm15VXB2b3RlcyI6W10sIk5ld3MiOltdLCJpYXQiOjE3MDM4NDY3MzIsImV4cCI6MTcwNjQzODczMn0.5zgMiZZq8Oaa_iE0IRSHG3jOS9bNKkqUE9hH0EJMgxA'
            const response = await axios.post(
                'http://localhost:5000/api/scoop/post',
                scoopData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            dispatch(composeScoopSuccess(response.data));
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
);

export const fetchTopNewsAsync = createAsyncThunk(
    "scoop/fetchTopNewsAsync",
    async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/scoop/home/top");
             return response.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    }
);
export const fetchCredibleNewsAsync = createAsyncThunk(
    "scoop/fetchCredibleNewsAsync",
    async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/scoop/home/credible");
            return response.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
);

export const fetchLatestNewsAsync = createAsyncThunk(
    "scoop/fetchLatestNewsAsync",
    async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/scoop/home/latest");
            return response.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
);
const scoopSlice = createSlice({
    name: 'scoop',
    initialState,
    reducers: {
        composeScoopSuccess: (state) => {
            state.compose.loading = false;
            state.compose.success = true;
            state.compose.error = null;
        },
        composeScoopReset: (state) => {
            state.compose.loading = false;
            state.compose.success = false;
            state.compose.error = null;
        },      

    },
    extraReducers: (builder) => {
        builder
            .addCase(composeScoopAsync.pending, (state) => {
                state.compose.loading = true;
            })
            .addCase(composeScoopAsync.fulfilled, (state) => {
                state.compose.loading = false;
                state.compose.success = true;
                state.compose.error = null;
            })
            .addCase(composeScoopAsync.rejected, (state, action) => {
                state.compose.loading = false;
                state.compose.success = false;
                state.compose.error = action.error;
            })
            .addCase(fetchTopNewsAsync.pending, (state) => {
                state.topNews.loading = true;
              })
              .addCase(fetchTopNewsAsync.fulfilled, (state, action) => {
                console.log(action.payload);
                state.topNews.loading = false;
                state.topNews.data = action.payload; 
                state.topNews.error = null;
              })
              .addCase(fetchTopNewsAsync.rejected, (state, action) => {
                state.topNews.loading = false;
                state.topNews.error = action.error;
              })
            .addCase(fetchCredibleNewsAsync.pending, (state) => {
                state.credibleNews.loading = true;
            })
            .addCase(fetchCredibleNewsAsync.fulfilled, (state, action) => {
                state.credibleNews.loading = false;
                state.credibleNews.data = action.payload;
                state.credibleNews.error = null;
            })
            .addCase(fetchCredibleNewsAsync.rejected, (state, action) => {
                state.credibleNews.loading = false;
                state.credibleNews.data = null;
                state.credibleNews.error = action.error;
            })
            .addCase(fetchLatestNewsAsync.pending, (state) => {
                state.latestNews.loading = true;
            })
            .addCase(fetchLatestNewsAsync.fulfilled, (state, action) => {
                state.latestNews.loading = false;
                state.latestNews.data = action.payload;
                state.latestNews.error = null;
            })
            .addCase(fetchLatestNewsAsync.rejected, (state, action) => {
                state.latestNews.loading = false;
                state.latestNews.data = null;
                state.latestNews.error = action.error;
            });
    },

});

export const {
    composeScoopSuccess,
    composeScoopReset } = scoopSlice.actions;
export default scoopSlice.reducer;
