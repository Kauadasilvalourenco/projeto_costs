import { forwardRef } from "react";
// import RHF;

import styleSelect from "./Select.module.css";
// import css;

const Select = forwardRef(({name, id, style, options, ...rest}, ref) => {
    return (
        <div>
            <select 
                name={name}
                id={id}
                className={`${styleSelect.select} ${style}`}
                ref={ref}
                {...rest}
            >
                <option value="" hidden>Escolha uma Categoria</option>

                {options.map((option) => (
                    <option 
                        key={option.id} 
                        value={option.nome} 
                        className={styleSelect.option}
                    >
                        {option.nome}
                    </option>
                ))}
            </select>
        </div>
    )
});

export default Select;