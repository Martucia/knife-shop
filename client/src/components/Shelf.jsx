import { NavLink } from 'react-router-dom';
import Right from '../images/right.svg'
import Product from './Product';
import { useState, useEffect } from 'react';
import axios from 'axios';



const Shelf = () => {
    const [products, setProducts] = useState(null);


    // if (props.onsale) {
    useEffect(() => {
        axios.get(`http://localhost:5000/api/catalog/onsale`).then((response) => {
            setProducts(response.data.products.slice(3));
        });
    }, []);
    // }


    if (products) return (
        <div className="shelf">
            <div className="shelf__header">
                <div className="title">
                    Хиты продаж
                </div>
                <NavLink to="/catalog">
                    Перейти в каталог
                    <img src={Right} alt="" />
                </NavLink>
            </div>
            <div className="shelf__wrapper">
                {products.map(product => {
                    return <Product data={product} />
                })}
            </div>
            <div className="shelf__mobile-btn">
                <NavLink to="/catalog">
                    Все акции
                    <img src={Right} alt="" />
                </NavLink>
            </div>
        </div>
    );
}



export default Shelf;