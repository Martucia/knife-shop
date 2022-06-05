import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom"


const FilterCheck = (props) => {
    const name = props.way;
    const [searchParams, setSearchParams] = useSearchParams();
    const [isCheck, setCheck] = useState(false);
    let params = new URLSearchParams(searchParams);

    const onChange = () => {
        let category = params.get(name);
        params.set("page", 1);

        if (!isCheck) {
            if (category) {
                params.set(name, category + "," + props.name);
            } else {
                params.append(name, props.name);
            }
        } else {
            let newParams = category.split(',').filter(par => par !== props.name)
            if (newParams.length > 0) {
                params.set(name, newParams);
            } else {
                params.delete(name);
            }

        }

        setSearchParams(params)

        setCheck(!isCheck)
    };

    useEffect(() => {
        let par = params.get(name)
        if (par) {
            let out = par.split(',');
            setCheck(out.includes(props.name))
        } else {
            setCheck(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, name])


    return (
        <FormControlLabel
            control={
                <Checkbox
                    onChange={onChange}
                    name={props.way}
                    checked={isCheck}
                />
            }
            label={props.name}
        />
    );
}

export default FilterCheck;