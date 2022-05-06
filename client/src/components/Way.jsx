import { NavLink } from 'react-router-dom';
import Right from "../images/right-grey.svg"


const Way = (props) => {
    return (
        <div className="way">
            <NavLink to="/">Главная</NavLink>
            <img src={Right} alt="" />
            <NavLink to={"/"+props.wayUrl}>{props.way}</NavLink>
        </div>
    );
}

export default Way;