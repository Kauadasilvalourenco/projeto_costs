import styleButton from "./Button.module.css";
// import css;

function Button({children, style}) {
    return(
        <div>
            <button
                className={`${style} ${styleButton.button}`}
            >
                {children}
            </button>
        </div>
    )
}

export default Button;