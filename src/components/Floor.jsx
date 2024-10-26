import React, { useState } from "react";
import { Button, Input, Message } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, updateRequest } from "../store/requestsSlice"; // Assuming you have this action
import { updateUserRequest } from "../store/usersSlice";

function Floor() {
    const dispatch = useDispatch();
    const elevatorCurrentFloor = useSelector(
        (state) => state.elevatorStatus.currentFloor
    );
    const floors = useSelector((state) => state.systemStatus.floors);
    const userData = useSelector((state) => state.auth.userData); // Assuming userData contains userId and currentFloor
    const [message, setMessage] = useState(
        `Elevator is at floor ${elevatorCurrentFloor}`
    );
    const [error, setError] = useState("");

    const handleKeypadChange = (event) => {
        const targetFloor = parseInt(event.target.value, 10);
        if (isNaN(targetFloor) || targetFloor < 0 || targetFloor >= floors) {
            setError("Invalid floor number");
        } else {
            // Dispatch a request with the user's requested floor
            dispatch(
                updateRequest({
                    userId: userData.$id,
                    requestedFloor: targetFloor, // Add requestedFloor to request
                })
            );
            dispatch(
                updateUserRequest({
                    userId: userData.$id,
                    requestedFloor: targetFloor,
                })
            );
            setMessage(
                `Request sent: Moving from floor ${elevatorCurrentFloor} to floor ${targetFloor}`
            );
            setError("");
        }
    };

    const handleUpRequest = () => {
        if (userData.currentFloor < floors - 1) {
            dispatch(
                addRequest({
                    userId: userData.$id,
                    direction: "up", // Specify the direction
                })
            );
            setMessage(
                `Request sent: Moving from floor ${userData.currentFloor} up`
            );
        } else {
            setError("Cannot go higher than the top floor");
        }
    };

    const handleDownRequest = () => {
        if (userData.currentFloor > 0) {
            dispatch(
                addRequest({
                    userId: userData.$id,
                    direction: "down", // Specify the direction
                })
            );
            setMessage(
                `Request sent: Moving from floor ${userData.currentFloor} down`
            );
        } else {
            setError("Cannot go lower than the ground floor");
        }
    };

    return (
        <div className="temp-container">
            <h2>Floor: {userData.currentFloor}</h2>
            {error && (
                <Message
                    type="error"
                    message={error}
                    onClose={() => setError("")}
                />
            )}
            {message && (
                <Message message={message} onClose={() => setMessage("")} />
            )}
            <Button id="up-btn" onClick={handleUpRequest}>
                Up
            </Button>
            <Button id="down-btn" onClick={handleDownRequest}>
                Down
            </Button>
            {elevatorCurrentFloor === userData.currentFloor && (
                <Input
                    id="keypad-input"
                    type="number"
                    placeholder="Go to floor"
                    onChange={handleKeypadChange}
                />
            )}
        </div>
    );
}

export default Floor;
