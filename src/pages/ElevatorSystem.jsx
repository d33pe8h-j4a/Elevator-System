import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Floor from "../components/Floor";
import { Input } from "../components";

function ElevatorSystem() {
    const { floors } = useParams();
    const [currentFloor, setCurrentFloor] = useState();
    return (
        <>
            <h1>No. of floors = {floors}</h1>
            {currentFloor ? (
                <div className="container">
                    <Floor floor={currentFloor} />
                </div>
            ) : (
                <Input
                    label="Current Floor: "
                    type="number"
                    placeholder="Enter your current floor"
                    onChange={(e) => setCurrentFloor(e.target.value)}
                />
            )}
        </>
    );
}

export default ElevatorSystem;
