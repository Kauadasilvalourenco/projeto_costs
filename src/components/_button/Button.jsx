import styleButton from "./Button.module.css";
// import css;

function Button({type, onClick, children, style, disable}) {
    return(
        <div>
            <button
                type={type}
                onClick={onClick}
                className={`${style} ${styleButton.button}`}
                disabled={disable}
            >
                {children}
            </button>
        </div>
    )
}

export default Button;