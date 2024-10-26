import { createSlice } from "@reduxjs/toolkit";
import { addUser } from "./usersSlice";

const initialState = {
    status: false,
    userData: {
        userId: null,
        currentFloor: null,
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        setCurrentFloor: (state, action) => {
            state.userData.currentFloor = action.payload;
        },
    },
});

export const { login, logout, setCurrentFloor } = authSlice.actions;
export default authSlice.reducer;

export const updateFloorAndAddUser =
    (currentFloor) => async (dispatch, getState) => {
        dispatch(setCurrentFloor(currentFloor));
        const state = getState().auth;
        dispatch(
            addUser({
                userId: state.userData.$id,
                currentFloor: state.userData.currentFloor,
                requestedFloor: null,
                isWaiting: true,
            })
        );
    };
