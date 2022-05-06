import { NavLink } from 'react-router-dom';
import Star from '../images/star.svg'
import Heart from '../images/productHeart.svg'
import Compare from '../images/compare.svg'
import Basket from '../images/productBasket.svg'
import p1 from '../images/p1.png'
import { addProductToBasket } from "../actions/product";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import AlertComponent from './AlertComponent';

const Product = (props) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth);
    const userId = useSelector(state => state.user.currentUser.id);
    const [alert, setAlert] = useState(false)

    const handleChange = (id) => {
        if (isAuth) {
            dispatch(addProductToBasket(userId, id))
        } else {
            setAlert(true);
        }
    };


    return (
        <div className="product">
            <div className="onsale" style={props.data.onsale ? { display: 'block' } : { display: "none" }}>
                -50%
            </div>
            <div className="product__img">
                <img src={p1} alt="" />
            </div>
            <div className="product__title">
                <NavLink to={"/catalog/:" + props.data._id + "/info"}>
                    {props.data.name}
                </NavLink>
            </div>
            <div className="product__info">
                <div className="size">
                    {props.data.size}
                </div>
                <div className="material">
                    {props.data.material}
                </div>
            </div>
            <div className="product__rate">
                <div className="stars">
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                </div>
                <div className="reviews">
                    <NavLink to="/reviews">
                        12 отзывов
                    </NavLink>
                </div>
            </div>
            <div className="product__footer">
                <div className="product__interaction">
                    <div className="price">
                        {props.data.price.toLocaleString("currency")} р.
                    </div>
                    <div className="buttons">
                        {/* <NavLink to="/compare">
                            <img src={Compare} alt="" />
                        </NavLink> */}
                        <button>
                            <img src={Heart} alt="" />
                        </button>
                    </div>
                </div>
                <button className='tobasket' onClick={() => {
                    handleChange(props.data._id)
                }}>
                    В корзину
                    <img src={Basket} alt="" />
                </button>

            </div>
            <AlertComponent visible={alert ? "block" : "none"} close={setAlert} />
        </div >
    )
}

export default Product;