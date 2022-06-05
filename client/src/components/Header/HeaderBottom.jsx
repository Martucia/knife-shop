import { NavLink } from 'react-router-dom';


const HeaderBottom = () => {
    return (
        <div className="header__bottom">
            <div className='header__bottom__inner'>
                <NavLink to="/catalog?page=1">
                    Каталог ножей
                </NavLink>
                <NavLink to="/d">
                    {/* catalog?category=Среднеклинковое оружие */}
                    Среднеклинковое оружие
                </NavLink>
                <NavLink to="/dd">
                    {/* catalog?category=Длинноклинковое оружие */}
                    Длинноклинковое
                </NavLink>
                <NavLink to="/ddd">
                    {/* catalog?category=Сувенирные изделия */}
                    Сувенирные изделия
                </NavLink>
                <NavLink to="/dddd">
                    {/* catalog?category=Сопутствующие товары */}
                    Сопутствующие товары
                </NavLink>

            </div>
        </div>
    );
}

export default HeaderBottom;