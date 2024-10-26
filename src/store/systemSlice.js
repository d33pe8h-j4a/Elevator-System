import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    floors: -1,
};

const systemSlice = createSlice({
    name: "systemStatus",
    initialState,
    reducers: {
        setFloors: (state, action) => {
            state.floors = action.payload;
        },
    },
});

export const { setFloors } = systemSlice.actions;
export default systemSlice.reducer;
