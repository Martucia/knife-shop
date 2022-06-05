import closer from "../../images/closer-white.svg";
import back from "../../images/back-white.svg";
import right from "../../images/right-white.svg";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Person from '../../images/Person.svg'
import { logout } from '../../reducers/userReducer'


const MobileMenu = (props) => {
    const [menuStyle, setMenuStyle] = useState('')
    const [catalogOpen, setCatalogOpen] = useState(false)
    const isAuth = useSelector(state => state.user.isAuth);
    const accountName = useSelector(state => state.user.currentUser.name);
    const dispatch = useDispatch()


    useEffect(() => {
        if (props.isOpen) {
            setMenuStyle('mobile-menu-anim')
        }
    }, [props.isOpen])

    function setCloseMenu(time) {
        setTimeout(function () {
            props.openMenu(false);
            setCatalogOpen(false);
        }, time);
        setMenuStyle('');
    }

    const followLink = () => {
        setCloseMenu(340)
    }

    return (
        <div className="mobile-menu-bg" style={props.isOpen ? { display: 'flex' } : { display: "none" }}>
            <div className={'mobile-menu ' + menuStyle}>
                <div className="mobile-menu__header">
                    <button onClick={() => setCatalogOpen(false)} className="back" style={catalogOpen ? { visibility: 'visible' } : { visibility: "hidden" }}>
                        <img src={back} alt="" />
                        Назад
                    </button>

                    <button className="mobile-menu-closer" onClick={() => {
                        setCloseMenu(340)
                    }}>
                        <img style={{ fill: "blue" }} src={closer} alt="close" />
                    </button>
                </div>
                {!catalogOpen ? <MainMenuPage followLink={followLink} setCatalogOpen={setCatalogOpen} /> : <CatalogMenuPage followLink={followLink} />}
                <div className="mobile-menu__footer">
                    {isAuth &&
                        < NavLink className="account" to="/account">
                            <img src={Person} alt="" />
                            {accountName}
                        </NavLink>
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

const MainMenuPage = (props) => {
    const isAdmin = useSelector(state => state.user.isAdmin);

    return (
        <div className="mobile-menu__inner" >
            {/* <NavLink onClick={props.followLink} to="/">
                Личный кабинет
            </NavLink> */}
            <button onClick={() => props.setCatalogOpen(true)}>
                Каталог товаров <img src={right} alt="" />
            </button>
            {/* <NavLink onClick={props.followLink} to="/">
                Контакты
            </NavLink> */}
            <NavLink onClick={props.followLink} to="/delivery">
                Оплата и доставка
            </NavLink>
            <NavLink onClick={props.followLink} to="/about">
                О нас
            </NavLink>
            {isAdmin && <NavLink onClick={props.followLink} to="/admin-catalog?page=1">
                Админ каталог
            </NavLink>}

        </div >
    )
}

const CatalogMenuPage = (props) => {
    return (
        <div className="mobile-menu__inner" >
            <NavLink onClick={props.followLink} className="all-catalog" to="/catalog">
                Весь каталог
            </NavLink>
            <NavLink onClick={props.followLink} to="/">
                Разделочные ножи
            </NavLink>
            <NavLink onClick={props.followLink} to="/">
                Туристические ножи
            </NavLink>
            <NavLink onClick={props.followLink} to="/">
                Ножи охотничьи
            </NavLink>
            <NavLink onClick={props.followLink} to="/">
                Булатные ножи
            </NavLink>
            <NavLink onClick={props.followLink} to="/">
                Ножи из дамаска
            </NavLink>
            <NavLink onClick={props.followLink} to="/">
                Тактического назначения
            </NavLink>
            <NavLink onClick={props.followLink} to="/">
                Метательные ножи
            </NavLink>
            <NavLink onClick={props.followLink} to="/">
                Мачете и кукри
            </NavLink>
            <NavLink onClick={props.followLink} to="/">
                Ножи кухонные
            </NavLink>
        </div >
    )
}

export default MobileMenu;