import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import Heart from '../images/productHeart.svg'
import HeartFull from '../images/heart-full.svg'
import { useEffect, useState } from 'react';
import { addProductToBasket, likeProduct } from "../actions/product";
import { ReactComponent as Basket } from '../images/productBasket.svg'

const ProductInLine = (props) => {
    const likes = useSelector(state => state.user.likes);
    const [isLiked, setLike] = useState(null)

    const dispatch = useDispatch()

    const userId = useSelector(state => state.user.currentUser.id);
    const isAuth = useSelector(state => state.user.isAuth);

    const like = (id) => {
        if (isAuth) {
            dispatch(likeProduct(userId, id))
        }
    };

    const addToBask = (id) => {
        dispatch(addProductToBasket(userId, id))
    };

    useEffect(() => {
        setLike(likes.some(like => like.data._id === props.product._id))
    }, [likes, props])


    return (
        <div className={props.product.inStock ? "product-in-line" : "product-in-line product-unavailable"}>
            <div className="product-in-line__left">
                <div className="product-in-line__img">
                    <img src={props.product.catalogImg} alt="" />
                </div>
                <div className="product-in-line__title">
                    <NavLink to={"/catalog/:" + props.product._id + "/info"}>
                        {props.product.name}
                    </NavLink>
                </div>
                <div className="product-in-line__inStock" style={props.product.inStock ? { color: "green" } : { color: "red" }} >
                    {props.product.inStock ? "В наличии" : "Отсутствует"}
                </div>
            </div>
            <div className="product-in-line__right">
                <div className="product-in-line__sale" style={props.product.onsale && props.product.discount > 0 ? { display: "block" } : { display: "none" }}>
                    - {props.product.discount} %
                </div>
                <div className="product-in-line__price">
                    <p className='price' style={props.product.discount > 0 && props.product.onsale ? {
                        textDecorationLine: "line-through"
                    } : {}}>
                        {props.product.price.toLocaleString("currency")} ₴
                    </p>
                    <p className="price-with-discount" style={props.product.discount > 0 && props.product.onsale ? {
                        display: "block", color: "red", fontWeight: "400"
                    } : { display: "none" }}>
                        {Math.round(props.product.price - (props.product.price * props.product.discount) / 100).toLocaleString("currency")} ₴
                    </p>
                </div>
                {props.product.inStock && <button className='tobasket' onClick={() => { addToBask(props.product._id) }}>
                    <Basket />
                </button>}
                <button className={!props.product.inStock ? "like-btn notavailable" : "like-btn"} onClick={() => { like(props.product._id) }}>
                    {isLiked ? <img src={HeartFull} alt="" /> : <img src={Heart} alt="" />}
                </button>
            </div>
        </div>
    )
}

export default ProductInLine;
