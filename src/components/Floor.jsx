import React from "react";
import { Button, Input } from "./index";

function Floor({ floor }) {
    return (
        <div className="temp-container">
            <h2>Floor: {floor}</h2>
            <Button>Up</Button>
            <Button>Down</Button>
            <Input type="number" placeholder="Go to floor" />
        </div>
    );
}

export default Floor;
