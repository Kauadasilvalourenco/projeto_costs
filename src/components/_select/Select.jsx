import styleSelect from "./Select.module.css";
// import css;

function Select({name, id, options, onChange, style}) {
    return(
        <div>
            <select 
                name={name}
                id={id}
                onChange={onChange}
                className={`${styleSelect.select} ${style}`}
                required
            >
                <option hidden>Escolha uma Categoria</option>

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
}

export default Select;