import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components";
import { useDispatch } from "react-redux";
import { setFloors as setSystemFloorsCount } from "../store/systemSlice";

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [floors, setFloors] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (floors > 0) {
            dispatch(setSystemFloorsCount(floors));
            navigate(`/elevatorsystem/${floors}`);
        }
    };
    return (
        <section className="">
            <h1>Elevator Management System</h1>
            <div className="form-signin">
                <h2 className="h3">Floors Required</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating">
                        <Input
                            placeholder="Enter the number of floors"
                            min="1"
                            onChange={(e) => {
                                setFloors(e.target.value);
                            }}
                            value={floors}
                            type="number"
                            className="width-50"
                        />
                    </div>
                    <button className="w-100 btn btn-lg" type="submit">
                        SUBMIT
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Home;
