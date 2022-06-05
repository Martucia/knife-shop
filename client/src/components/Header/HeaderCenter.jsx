import Logo from '../../images/logo.jpg'
import Map from '../../images/map.svg'
import Search from '../../images/search.svg'
import Heart from '../../images/heart.svg'
import Basket from '../../images/basket.svg'
import { NavLink, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';

const HeaderCenter = (props) => {
    const [basketCount, setBasketCount] = useState(0);
    const [basketSumm, setBasketSumm] = useState(0);
    const [search, setSearch] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();
    let params = new URLSearchParams(searchParams);

    const basket = useSelector(state => state.user.basket);
    const isAdmin = useSelector(state => state.user.isAdmin);
    const isAuth = useSelector(state => state.user.isAuth);

    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        setSearch(params.get("name") || '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let count = 0;
        let price = 0;

        if (basket) basket.forEach(product => {
            count += product.count
            if (product.data.discount > 0 && product.data.onsale) {
                price += ((product.data.price - (product.data.price * product.data.discount) / 100) * product.count)
            } else {
                price += (product.data.price * product.count)
            }
        })

        setBasketCount(count)
        setBasketSumm(price)
    }, [basket])

    const handleOpenBasket = () => {
        isAuth ? props.openBasket(true) : props.openLog(true)
    }

    const handleOpenOrders = () => {

        if (isAuth && basket.length > 0) {
            navigate("/order")
        } else if (!isAuth) {
            props.openLog(true);
        } else if (basket.length === 0) {
            alert("Добавьте товар в корзину")
        }
    }

    const handleOpenLikes = () => {
        isAuth ? navigate("/likes") : props.openLog(true)
    }


    const handleSearch = async () => {
        if (location.pathname !== "/catalog") {
            navigate(`/catalog?name=${search}`)
        } else {
            search.length > 0 ? params.set("name", search) : params.delete("name", search)
            setSearchParams(params)
        }
    }

    const onKeyPressHandler = async (e) => {
        if (e.charCode === 13) {
            if (location.pathname !== "/catalog") {
                navigate(`/catalog?name=${search}`)
            } else {
                search.length > 0 ? params.set("name", search) : params.delete("name", search)
                setSearchParams(params)
            }
        }
    }

    if (!isAdmin) {
        return (
            <div className="header__center">
                <div className="header__center__inner">
                    <div className="header__center__left">
                        < NavLink className="logo" to="/">
                            <img src={Logo} alt="" />
                        </NavLink>
                        <div className="search">
                            <input type="search" name="search" onKeyPress={onKeyPressHandler} placeholder='Поиск' value={search} onChange={e => setSearch(e.target.value)} />
                            <button onClick={handleSearch}>
                                <img src={Search} alt="search" />
                            </button>
                        </div>
                    </div>
                    <div className="header__center__right">
                        <button className='city'>
                            <img src={Map} alt="" />
                            Тернопіль
                        </button>
                        <div className="order-block">
                            <a href="tel:380971407938">38(097)-140-7938</a>
                            <a href="tel:380971407938" className='numberText'>
                                Заказать звонок
                            </a>
                        </div>
                        < button onClick={handleOpenLikes} className="liked">
                            <img src={Heart} alt="" />
                        </button>

                        <div className='balance'>
                            <button className='basket-btn' onClick={handleOpenBasket}>
                                <img src={Basket} alt="" />
                                <p>{basketCount}</p>
                            </button>
                            <div>
                                <p>
                                    {basketSumm.toLocaleString("currency")} ₴
                                </p>
                                < button onClick={handleOpenOrders} className="order-link">
                                    Оформить заказ
                                </button>
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
                        <div className="search">
                            <input type="search" name="search" onKeyPress={onKeyPressHandler} placeholder='Поиск' value={search} onChange={e => setSearch(e.target.value)} />
                            <button onClick={handleSearch}>
                                <img src={Search} alt="search" />
                            </button>
                        </div>
                    </div>

                    <div className="header__center__right">
                        < NavLink to="/admin-catalog?page=1">
                            Редагувати товар
                        </NavLink>

                    </div>
                </div>

            </div>

        )
    }
}

export default HeaderCenter;