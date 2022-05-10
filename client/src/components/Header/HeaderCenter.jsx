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
    const [basketSumm, setBasketSumm] = useState(0);
    const basket = useSelector(state => state.user.basket);
    const isAdmin = useSelector(state => state.user.isAdmin);


    useEffect(() => {
        let count = 0;
        let price = 0;

        basket.forEach(product => {
            count += product.count
            price += (product.price * product.count)
        })
        setBasketCount(count)
        setBasketSumm(price)
    }, [basket])


    if (!isAdmin) {
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
                                    {basketSumm.toLocaleString("currency")} р.
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
    } else {
        return (
            <div className="header__center admin">
                <div className="header__center__inner">
                    <div className="header__center__left">
                        < NavLink className="logo" to="/">
                            <img src={Logo} alt="" />
                        </NavLink>
                    </div>
                    <div className="header__center__right">
                        < NavLink to="/admin-catalog">
                            Редагувати товар
                        </NavLink>

                    </div>
                </div>

            </div>

        )
    }
}

export default HeaderCenter;