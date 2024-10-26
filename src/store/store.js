import { configureStore } from "@reduxjs/toolkit";
import elevatorStatusReducer from "./elevatorStatusSlice";
import usersReducer from "./usersSlice";
import requestsReducer from "./requestsSlice";
import authReducer from "./authSlice";
import systemReducer from "./systemSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        elevatorStatus: elevatorStatusReducer,
        users: usersReducer,
        requests: requestsReducer,
        systemStatus: systemReducer,
    },
});

export default store;
