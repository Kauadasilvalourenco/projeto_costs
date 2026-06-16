import styleButton from "./Button.module.css";
// import css;

function Button({type, onClick, children, style}) {
    return(
        <div>
            <button
                type={type}
                onClick={onClick}
                className={`${style} ${styleButton.button}`}
            >
                {children}
            </button>
        </div>
    )
}

export default Button;