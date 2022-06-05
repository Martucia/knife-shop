
import { useState } from 'react';
import dropArrow from "../images/filter-drop-btn.svg"
import React from 'react';
import FilterCheck from './FilterCheck';


const FilterDropDrown = (props) => {
    const [isOpen, setOpen] = useState(true)

    const toggleDropDown = (e) => {
        e.preventDefault();
        setOpen(!isOpen)
    }

    return (
        <div className="drop-down">
            <button className={isOpen ? "close drop-down__header" : 'drop-down__header'} onClick={toggleDropDown}>
                <p>{props.title}</p>
                <img src={dropArrow} alt="" />
            </button>
            <div className="drop-down__inner" style={isOpen ? { display: 'flex' } : { display: "none" }}>
                {props.data.map((name, index) => {
                    return (
                        <FilterCheck key={"filter-" + index} name={name} way={props.way} />
                    )
                })}
            </div>
        </div>
    );
}

export default FilterDropDrown;