import styleInput from "./Input.module.css";
// import css;

function Input({type, name, id, placeholder, onChange, style}) {
    return(
        <div>
            <input
                type={type}
                name={name} 
                id={id} 
                placeholder={placeholder}
                onChange={onChange}
                className={`${styleInput.input} ${style}`}
                required
            />
        </div>
    )
}

export default Input;