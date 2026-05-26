import styleButton from "./Button.module.css";
// import css;

function Button({onClick, children, style}) {
    return(
        <div>
            <button
                onClick={onClick}
                className={`${style} ${styleButton.button}`}
            >
                {children}
            </button>
        </div>
    )
}

export default Button;