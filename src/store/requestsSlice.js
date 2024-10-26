import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    requestQueue: [
        {
            userId: 1,
            requestedFloor: 5,
        },
        {
            userId: 2,
            requestedFloor: 2,
        },
        {
            userId: 3,
            requestedFloor: 2,
        },
    ],
};

const requestsSlice = createSlice({
    name: "requests",
    initialState,
    reducers: {
        addRequest: (state, action) => {
            state.requestQueue.push(action.payload);
        },
        removeRequest: (state) => {
            state.requestQueue.shift();
        },
        updateRequest: (state, action) => {
            state.requestQueue = state.requestQueue.map((request) =>
                request.userId === action.payload.userId
                    ? {
                          ...request,
                          requestedFloor: action.payload.requestedFloor,
                      }
                    : request
            );
        },
    },
});

export const { addRequest, removeRequest, updateRequest } =
    requestsSlice.actions;
export default requestsSlice.reducer;
