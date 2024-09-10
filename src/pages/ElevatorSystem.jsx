import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Floor from "../components/Floor";

function ElevatorSystem() {
    const { floors } = useParams();
    const [floor, setFloor] = useState(0);
    return (
        <>
            <h1>No. of floors = {floors}</h1>
            <div className="container">
                <Floor floor={floor} />
            </div>
        </>
    );
}

export default ElevatorSystem;
