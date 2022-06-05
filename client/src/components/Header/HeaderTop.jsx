import { NavLink } from 'react-router-dom';
import Person from '../../images/Person.svg'
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../reducers/userReducer'


const HeaderTop = (props) => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch()


    const accountName = useSelector(state => state.user.currentUser.name);

    return (
        <div className="header__top">
            <div className="header__top__inner">
                <ul>
                    < NavLink to="/about">
                        О нас
                    </NavLink>
                    < NavLink to="/delivery">
                        Оплата и доставка
                    </NavLink>
                    {/* < NavLink to="/contacts">
                        Контакты
                    </NavLink> */}
                </ul>
                <div className="header__top__right">
                    {isAuth &&
                        <div style={{color: "#fff"}} className="account">
                            <img src={Person} alt="" />
                            {accountName}
                        </div>
                    }

                    {isAuth &&
                        <button onClick={() => dispatch(logout())}>
                            Выйти
                        </button>
                    }
                    {!isAuth &&
                        <button onClick={() => props.setOpen(true)}>
                            Войти
                        </button>
                    }

                </div>

            </div>
        </div>
    );
}

export default HeaderTop;