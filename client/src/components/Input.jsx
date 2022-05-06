import React from 'react';


const Input = (props) => {
    return (

        <div className="input__block">
            <label htmlFor={props.name}>{props.label}</label>

            <input onChange={(event) => props.setValue(event.target.value)}
                value={props.value}
                type={props.type}
                placeholder={props.placeholder}
                name={props.name}
                />
            <div id="error" className="error"></div>
        </div>
    );
};

export default Input;