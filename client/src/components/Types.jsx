import React from 'react';
import k1 from "../images/k1.png"
import k2 from "../images/k2.png"
import k3 from "../images/k3.png"
import k4 from "../images/k4.png"
import k5 from "../images/k5.png"
import k6 from "../images/k6.png"
import { NavLink } from 'react-router-dom';

const Types = () => {
    return (
        <div className="types">
            <Block title="Каталог ножей"
                ul={["Разделочные ножи", "Туристические ножи", "Ножи охотничьи"]}
                className={"block1"} right="72" img={k1} bottom="-20" />
            <Block title="Среднеклинковое оружие"
                ul={["Кортики", "Кинжалы", "Бебуты"]}
                className={"block2"} right="-20" bottom="-40" img={k2} />
            <Block title="Длинноклинковое оружие"
                ul={["Катаны", "Шашки", "Сабли"]}
                className={"block3"} right="-30" bottom="-40" img={k3} />
            <Block title="Сувенирные изделия"
                ul={["Предметы интерьера", "Бизнес-подарки", "Украшенная посуда"]}
                className={"block4"} right="-20" bottom="-100" img={k4} />
            <Block title="Сопутствующие товары"
                ul={["Чехлы и кейсы", "Ножны", "Системы ношения"]}
                className={"block5"} right="-75" bottom="-40" img={k5} />
            <Block title="Ножевая мастерская"
                ul={["Паста ГОИ", "Алмазная паста", "Бруски и камни"]}
                className={"block6"} right="-50" bottom="-40" img={k6} />
        </div>
    );
}

const Block = (props) => {
    return (
        <div className={"block " + props.className}>
            <div className="block__text">
                <div className="title">
                    {props.title === "Каталог ножей" ? <NavLink to={"/catalog"}>
                        {props.title}
                    </NavLink> : <NavLink to={"/catalog?category=" + props.title}>
                        {props.title}
                    </NavLink>}

                </div>
                <div className="line"></div>
                <ul>
                    {props.ul.map((li, index) => {
                        return <li key={"type-" + props.title + "-" + index}>
                            <NavLink to="/">
                                {li}
                            </NavLink>
                        </li>
                    })}
                </ul>
            </div>
            <div className="block__img"  >
                <img src={props.img} alt="" />
            </div>
        </div>
    )
}

export default Types;