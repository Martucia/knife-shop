import Logo from '../../images/logo.jpg'
import Map from '../../images/map.svg'
import Down from '../../images/drop-down.svg'
import Heart from '../../images/heart.svg'
import Basket from '../../images/basket.svg'
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
// import { basketCount } from '../../reducers/userReducer';
import { useEffect, useState } from 'react';


const HeaderCenter = (props) => {
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
        <div className="header__center">
            <div className="header__center__inner">
                <div className="header__center__left">
                    < NavLink className="logo" to="/">
                        <img src={Logo} alt="" />
                    </NavLink>
                    <div className="search">
                        <input type="search" placeholder='Поиск' />
                    </div>
                </div>
                <div className="header__center__right">
                    <button className='city'>
                        <img src={Map} alt="" />
                        Тернопіль
                    </button>
                    <div className="order-block">
                        <a href="tel:8-800-777-49-67">(38)097-546-3465</a>
                        <a href="tel:8-800-777-49-67" className='numberText'>
                            Заказать звонок
                        </a>

                        {/* <img src={Down} alt="" /> */}
                    </div>
                    < NavLink className="liked" to="/liked">
                        <img src={Heart} alt="" />
                    </NavLink>

                    <div className='balance'>
                        <button className='basket-btn' onClick={() => props.openBasket(true)}>
                            <img src={Basket} alt="" />
                            <p>{basketCount}</p>
                        </button>
                        <div>
                            <p>
                                0 р.
                            </p>
                            < NavLink className='order' to="/basket">
                                Оформить заказ
                            </NavLink>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HeaderCenter;