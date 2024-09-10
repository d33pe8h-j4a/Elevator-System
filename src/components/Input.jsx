import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
    { label, type = "text", className = "", ...props },
    ref
) {
    const id = useId();
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (props.onSubmit) {
                props.onSubmit(event);
            }
        }
    };
    return (
        <div className="input-container">
            {label && (
                <label className="input-label" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`input-field ${className}`}
                ref={ref}
                {...props}
                id={id}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
});

export default Input;
