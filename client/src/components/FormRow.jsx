const FormRow = (props) => {

    return (
        <div className="form__row">
            <label>
                {props.label}:
                {/* {props.name === "discount" && <span>
                    roiro
                </span>} */}
                <input
                    placeholder={props.label}
                    type={props.type || "text"}
                    ref={props.ref ? props.ref : ''}
                    defaultValue={props.defaultValue || ''}
                    {...props.register(props.name, {
                        required: errorText,
                    }
                    )}
                />
            </label>
            <div className="error">
                {props.errors && <p>{props.errors.message} </p>}
            </div>
        </div>
    )
}

const errorText = "Поле обязательно к заполнению!"

export default FormRow;