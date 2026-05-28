import styleLabel from "./Label.module.css";

function Label({htmlFor, children, style}) {
    return(
        <div>
            <label 
                htmlFor={htmlFor}
                className={`${styleLabel.label} ${style}`}
            >
                {children}
            </label>
        </div>
    )
}

export default Label;