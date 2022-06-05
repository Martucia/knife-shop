import { NavLink } from 'react-router-dom';
import Right from "../images/right-grey.svg"
import React from 'react';


const Way = (props) => {
    return (
        <div className="way" style={{ width: props.width + "%" }}>
            <NavLink to="/">Главная</NavLink>
            <img src={Right} alt="" />
            <div className='current'>
                {props.way}
            </div>
        </div>
    );
}

export default Way;