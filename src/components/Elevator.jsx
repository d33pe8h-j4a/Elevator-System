import React from "react";
import { useSelector } from "react-redux";
import { Container } from "./index";

function Elevator() {
    const elevatorStatus = useSelector((state) => state.elevatorStatus) || {
        currentFloor: "N/A",
        direction: "N/A",
        isMoving: false,
        doorStatus: "Unknown",
    };

    return (
        <Container>
            <div className="elevator">
                <h2>Elevator</h2>
                <p>
                    <span>Current Floor: </span>
                    {elevatorStatus.currentFloor}
                </p>
                <p>
                    <span>Direction: </span>
                    {elevatorStatus.direction === "up"
                        ? "⬆️ Going Up"
                        : elevatorStatus.direction === "down"
                        ? "⬇️ Going Down"
                        : "Idle"}
                </p>
                <p className={elevatorStatus.isMoving ? "moving" : "stopped"}>
                    <span>Moving State: </span>
                    {elevatorStatus.isMoving ? "Moving" : "Stopped"}
                </p>
                <p>
                    <span>Door Status: </span>
                    {elevatorStatus.doorStatus === "open"
                        ? "🚪 Open"
                        : "🚪 Closed"}
                </p>
            </div>
        </Container>
    );
}

export default Elevator;
