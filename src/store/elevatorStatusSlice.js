import { createSlice } from "@reduxjs/toolkit";
import { removeRequest } from "./requestsSlice";
import { setCurrentFloor } from "./authSlice";

const initialState = {
    currentFloor: 0,
    direction: "idle",
    isMoving: false,
    destinationFloor: null,
    doorStatus: "closed",
    currentUsers: [],
};

const elevatorStatusSlice = createSlice({
    name: "elevatorStatus",
    initialState,
    reducers: {
        setElevatorStatus: (state, action) => {
            Object.assign(state, action.payload); // Option 1: Mutate directly
            // Alternatively, use the return statement:
            // return { ...state, ...action.payload };
        },

        setMovingState: (state, action) => {
            // console.log("Setting moving state: ", action.payload);
            state.isMoving = action.payload;
        },

        updateFloor: (state, action) => {
            // console.log("Updating current floor to: ", action.payload);
            state.currentFloor = action.payload;
        },

        updateDirection: (state, action) => {
            // console.log("Updating direction to: ", action.payload);
            state.direction = action.payload;
        },

        setDoorStatus: (state, action) => {
            // console.log("Setting door status to: ", action.payload);
            state.doorStatus = action.payload;
        },

        enterElevator: (state, action) => {
            if (!state.currentUsers.includes(action.payload)) {
                // console.log("User entering elevator: ", action.payload);
                state.currentUsers.push(action.payload);
            }
        },

        exitElevator: (state, action) => {
            // console.log("User exiting elevator: ", action.payload);
            state.currentUsers = state.currentUsers.filter(
                (userId) => userId !== action.payload
            );
        },
    },
});

export const {
    setElevatorStatus,
    setMovingState,
    updateFloor,
    updateDirection,
    setDoorStatus,
    enterElevator,
    exitElevator,
} = elevatorStatusSlice.actions;
export default elevatorStatusSlice.reducer;

// Thunk to handle the process
export const processNextRequest = () => async (dispatch, getState) => {
    const { requests, users, auth } = getState();
    if (requests.requestQueue.length === 0) return;

    // console.log("UsersList: ", users.usersList);
    // console.log("Requests: ", requests.requestQueue);

    let request = requests.requestQueue[0];
    const user = users.usersList.find((usr) => usr.userId === request.userId);
    const currentUser = auth.userData;
    if (!user) {
        console.log("No user found for request: ", request);
        return;
    }

    console.log("Processing request for user: ", user);
    // console.log("Set Moving state to true");
    dispatch(setMovingState(true));

    const moveToUserFloor = () => {
        return new Promise((resolve) => {
            const { elevatorStatus } = getState(); // Fetch latest state
            const { currentFloor: elevatorFloor } = elevatorStatus;
            const { currentFloor: userFloor } = user;
            const direction = elevatorFloor < userFloor ? "up" : "down";
            // console.log(
            //     `Moving from floor ${elevatorFloor} to user's floor ${userFloor} (Direction: ${direction})`
            // );
            dispatch(updateDirection(direction));

            setTimeout(() => {
                // console.log(`Arrived at user's floor: ${userFloor}`);
                dispatch(updateFloor(userFloor));
                resolve();
            }, Math.abs(elevatorFloor - userFloor) * 2000);
        });
    };

    const aboardTheUser = () => {
        return new Promise((resolve) => {
            // console.log("Opening doors for user to board");
            dispatch(setDoorStatus("open"));
            setTimeout(() => {
                // console.log("User aboard: ", request.userId);
                dispatch(enterElevator(request.userId));
                dispatch(setDoorStatus("closed"));
                // console.log("Doors closed");
                resolve();
            }, 10000); // User takes 10 seconds to get on the elevator
        });
    };

    const moveToRequestedFloor = () => {
        return new Promise((resolve) => {
            const updatedRequest = getState().requests.requestQueue.find(
                (req) => req.userId === request.userId
            );
            const { elevatorStatus } = getState(); // Fetch latest state
            const { currentFloor: elevatorFloor } = elevatorStatus;
            const { requestedFloor } = updatedRequest;
            const direction = elevatorFloor < requestedFloor ? "up" : "down";
            dispatch(updateDirection(direction));
            let nextFloor = elevatorFloor + (direction === "up" ? 1 : -1);

            const interval = setInterval(() => {
                // console.log(`Elevator moving to floor: ${nextFloor}`);
                dispatch(updateFloor(nextFloor));
                if (nextFloor === requestedFloor) {
                    // console.log(
                    //     `Arrived at requested floor: ${requestedFloor}`
                    // );
                    if (currentUser.$id === updatedRequest.userId)
                        dispatch(setCurrentFloor(requestedFloor));
                    clearInterval(interval);
                    resolve();
                } else {
                    nextFloor += direction === "up" ? 1 : -1;
                }
            }, 1000);
        });
    };

    const departTheUser = () => {
        return new Promise((resolve) => {
            // console.log("Opening doors for user to depart");
            dispatch(setDoorStatus("open"));
            setTimeout(() => {
                // console.log("User departed: ", request.userId);
                dispatch(exitElevator(request.userId));
                dispatch(setDoorStatus("closed"));
                // console.log("Doors closed");
                resolve();
            }, 2000); // User takes 2 seconds to get off the elevator
        });
    };

    try {
        await moveToUserFloor();
        await aboardTheUser();
        await moveToRequestedFloor();
        await departTheUser();
        // console.log("Request processed, removing request from queue");
        dispatch(removeRequest());
        dispatch(setMovingState(false));
        // console.log("Set Moving state to false");
    } catch (error) {
        console.error("Error in processing request:", error);
    }
};
