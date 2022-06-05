import { NavLink, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import Logo from '../../images/logo.jpg'
import Person from '../../images/Person.svg'
import Phone from '../../images/mob-phone.svg'
import Heart from '../../images/mob-heart.svg'
import Search from '../../images/search.svg'
import Basket from '../../images/mob-basket.svg'
import HeaderBottom from './HeaderBottom';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import MobileMenu from './MobileMenu';


const MobileHeader = (props) => {
    const [basketCount, setBasketCount] = useState(0);
    const basket = useSelector(state => state.user.basket);
    const isAuth = useSelector(state => state.user.isAuth);
    const [search, setSearch] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();
    let params = new URLSearchParams(searchParams);

    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        let count = 0;

        if (basket) basket.forEach(product => {
            count += product.count
        })

        setBasketCount(count)

    }, [basket])

    useEffect(() => {
        setSearch(params.get("name") || '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOpenBasket = () => {
        isAuth ? props.openBasket(true) : props.openLog(true)
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

    return (
        <>
            <div className="mobile-header">
                <div className="mobile-header__top">
                    < NavLink className="logo" to="/">
                        <img src={Logo} alt="" />
                    </NavLink>
                    <button onClick={() => props.openMenu(true)} className="menu-burger__header">
                        <span></span>
                    </button>
                </div>
                <HeaderBottom />
                <div className="mobile-header__bottom">
                    <div className="search">
                        <input type="search" name="search" onKeyPress={onKeyPressHandler} placeholder='Поиск' value={search} onChange={e => setSearch(e.target.value)} />
                        <button onClick={handleSearch}>
                            <img src={Search} alt="search" />
                        </button>
                    </div>
                    <div className="buttons">
                        <NavLink to="/contacts">
                            <img src={Phone} alt="" />
                        </NavLink>
                        <NavLink to="/" onClick={() => props.setOpen(true)}>
                            <img src={Person} alt="" />
                        </NavLink>
                        < button onClick={handleOpenLikes}>
                            <img src={Heart} alt="" />
                        </button>
                        <button className='basket-btn' onClick={handleOpenBasket}>
                            <img src={Basket} alt="" />
                            <p>{basketCount}</p>
                        </button>
                    </div>
                </div>
            </div >
            <MobileMenu openMenu={props.openMenu} isOpen={props.isMenuOpen} setOpen={props.setOpen} />
        </>
    );
}

export default MobileHeader;