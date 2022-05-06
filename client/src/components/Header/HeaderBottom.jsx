import { NavLink } from 'react-router-dom';


const HeaderBottom = () => {
    return (
        <div className="header__bottom">
            <ul>
                <li><NavLink to="/catalog">
                    Каталог ножей
                </NavLink></li>
                <li>Клинковое оружие</li>
                <li>Сувенирные изделия</li>
                <li>Фонари ARMYTEK</li>
                <li>Сопуствующие товары</li>
            </ul>
        </div>
    );
}

export default HeaderBottom;