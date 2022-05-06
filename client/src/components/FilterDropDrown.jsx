import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import dropArrow from "../images/filter-drop-btn.svg"

// {
//     "name": "minmax",
//     "filters": [
//         "Общая длина, мм",
//         "Длина клинка, мм",
//         "Ширина клинка, мм"
//     ]
// },
// {
//     "name": "rate",
//     "filters": [
//         1,
//         2,
//         3,
//         4,
//         5
//     ]
// }

const FilterDropDrown = (props) => {

    function handleChange(e, val) {
        if (e.target.checked) {
            if (props.title === "Производство") {
                props.set({
                    ...props.all,
                    manufacture: [...props.all.manufacture, val]
                })
            } else if (props.title === "Сталь") {
                props.set({
                    ...props.all,
                    steel: [...props.all.steel, val]
                })
            } else if (props.title === "Рукоять") {
                props.set({
                    ...props.all,
                    handle: [...props.all.handle, val]
                })
            } else if (props.title === "Гарда и тыльник") {
                props.set({
                    ...props.all,
                    guardback: [...props.all.guardback, val]
                })
            }
        } else {
            if (props.title === "Производство") {
                props.set({
                    ...props.all,
                    manufacture: props.all.manufacture.filter(filter => {
                        return filter !== val
                    })
                })
            } else if (props.title === "Сталь") {
                props.set({
                    ...props.all,
                    steel: props.all.steel.filter(filter => {
                        return filter !== val
                    })
                })
            } else if (props.title === "Рукоять") {
                props.set({
                    ...props.all,
                    handle: props.all.handle.filter(filter => {
                        return filter !== val
                    })
                })
            } else if (props.title === "Гарда и тыльник") {
                props.set({
                    ...props.all,
                    guardback: props.all.guardback.filter(filter => {
                        return filter !== val
                    })
                })
            }
            // props.set(filters.filter(item => item !== val))
        }
    };

    return (
        <div className="drop-down">

            <div className="drop-down__title">
                {props.title}
                <button>
                    <img src={dropArrow} alt="" />
                </button>
            </div>
            <div className="drop-down__inner">
                {props.data.map(b => {
                    return (
                        <FormControlLabel
                            control={
                                <Checkbox onChange={(e) => handleChange(e, b)} />
                            }
                            label={b}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default FilterDropDrown;