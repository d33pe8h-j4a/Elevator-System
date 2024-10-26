import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice.js";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout());
            navigate("/");
        });
    };
    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default LogoutBtn;
