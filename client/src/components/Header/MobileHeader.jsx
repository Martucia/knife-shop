import { NavLink } from 'react-router-dom';
import Logo from '../../images/logo.jpg'
import Person from '../../images/Person.svg'
import Phone from '../../images/mob-phone.svg'
import Heart from '../../images/mob-heart.svg'
import Basket from '../../images/mob-basket.svg'
import HeaderBottom from './HeaderBottom';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";


const MobileHeader = (props) => {
    const [basketCount, setBasketCount] = useState(0);
    const basket = useSelector(state => state.user.basket);

    useEffect(() => {
        let out = 0;

        basket.forEach(product => {
            out += product.count
        })
        setBasketCount(out)
    }, [basket])

    return (
        <div className="mobile-header">
            <div className="mobile-header__top">
                < NavLink className="logo" to="/">
                    <img src={Logo} alt="" />
                </NavLink>
                <button className="menu-burger__header">
                    <span></span>
                </button>
            </div>
            <HeaderBottom />
            <div className="mobile-header__bottom">
                <div className="search">
                    <input type="search" placeholder='Поиск' />
                </div>
                <div className="buttons">
                    <NavLink to="/">
                        <img src={Phone} alt="" />
                    </NavLink>
                    <NavLink to="/" onClick={() => props.setOpen(true)}>
                        <img src={Person} alt="" />
                    </NavLink>
                    <NavLink to="/">
                        <img src={Heart} alt="" />
                    </NavLink>
                    <button className='basket-btn' onClick={() => props.openBasket(true)}>
                        <img src={Basket} alt="" />
                        <p>{basketCount}</p>
                    </button>
                </div>
            </div>
        </div >
    );
}

export default MobileHeader;