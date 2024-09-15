import { createSlice } from "@reduxjs/toolkit";


const fetchStatusSlice = createSlice({
    name: 'fetchStatus',
    initialState : {
        fetchDone: false,
        currentlyFetching: false,
    },
    reducers: {
        markFetchDone: (state) => {
            state.fetchDone = true;
        },
        markFetchingStarted: (state) => {
            state.currentlyFetching = true;
        },
        markFetchingFinished: (state) => {
            state.currentlyFetching = false;
        }
    }
});

export default fetchStatusSlice; // Export the reducer function
export const fetchStatusActions = fetchStatusSlice.actions; // Export the actions
