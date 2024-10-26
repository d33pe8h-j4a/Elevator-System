import React from "react";

function Message({ type = "info", message, onClose, className = "" }) {
    return (
        <div className={`message ${type} ${className}`}>
            <span>{message}</span>
            {onClose && (
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
            )}
        </div>
    );
}

export default Message;
