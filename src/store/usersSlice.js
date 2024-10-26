import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usersList: [
        {
            userId: 1,
            currentFloor: 2,
            requestedFloor: 5,
            isWaiting: true,
        },
        {
            userId: 2,
            currentFloor: 0,
            requestedFloor: 2,
            isWaiting: true,
        },
        {
            userId: 3,
            currentFloor: 5,
            requestedFloor: 2,
            isWaiting: true,
        },
    ],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.usersList.push(action.payload);
        },
        updateUserRequest: (state, action) => {
            state.usersList = state.usersList.map((user) =>
                user.userId === action.payload.userId
                    ? { ...user, ...action.payload }
                    : user
            );
        },
        removeUserRequest: (state, action) => {
            state.usersList = state.usersList.map((user) =>
                user.userId === action.payload.userId
                    ? { ...user, isWaiting: false }
                    : user
            );
        },
        removeUser: (state, action) => {
            state.usersList = state.usersList.filter(
                (user) => user.userId !== action.payload.userId
            );
        },
    },
});

export const { addUser, updateUserRequest, removeUserRequest, removeUser } =
    usersSlice.actions;
export default usersSlice.reducer;
