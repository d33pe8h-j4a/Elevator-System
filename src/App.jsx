import { useEffect, useState } from "react";
import { Input } from "./components";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();
    const [floors, setFloors] = useState(0);
    useEffect(() => {
        if (floors > 0) navigate(`/elevatorsystem/${floors}`);
    }, [floors, navigate]);
    return (
        <>
            <h1>Elevator Management System</h1>
            <Input
                label="No. of Floors"
                placeholder="Enter the number of floors"
                min="1"
                onChange={(e) => {
                    setFloors(e.target.value);
                }}
                value={floors}
                type="number"
            />
        </>
    );
}

export default App;
