import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Elevator, Floor, Input } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { updateFloorAndAddUser } from "../store/authSlice";

function ElevatorSystem() {
    const { floors } = useParams();
    const dispatch = useDispatch();
    const [currentFloor, setCurrentFloor] = useState();
    const userData = useSelector((state) => state.auth.userData);
    useEffect(() => {
        if (currentFloor >= 0 && currentFloor < floors) {
            console.log("Updating the current floor for the user");
            dispatch(updateFloorAndAddUser(currentFloor));
        }
    }, [currentFloor]);
    return (
        <>
            <h1>No. of floors = {floors}</h1>
            {currentFloor ? (
                <div className="container">
                    <Floor />
                    <Elevator />
                </div>
            ) : (
                <Input
                    label="Current Floor: "
                    type="number"
                    placeholder="Enter your current floor"
                    onChange={(e) => setCurrentFloor(Number(e.target.value))}
                />
            )}
        </>
    );
}

export default ElevatorSystem;
