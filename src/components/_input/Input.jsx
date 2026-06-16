import { forwardRef } from "react";
// import RHF;

import styleInput from "./Input.module.css";
// import css;

const Input = forwardRef(({type, name, id, placeholder, style, ...rest}, ref) => {
    return (
        <div>
            <input
                type={type}
                name={name} 
                id={id} 
                placeholder={placeholder}
                className={`${styleInput.input} ${style}`}
                ref={ref}
                {...rest}
            />
        </div>
    )
});

export default Input;