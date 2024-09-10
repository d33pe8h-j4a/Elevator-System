import React from "react";

function Button({
    children,
    type = "button",
    bgColor = "", // Background color will be passed through className or overridden
    textColor = "", // Text color can also be overridden
    className = "",
    ...props
}) {
    return (
        <button className={`button ${className}`} {...props}>
            {children}
        </button>
    );
}

export default Button;
