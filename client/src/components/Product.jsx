import { NavLink } from 'react-router-dom';
import Heart from '../images/productHeart.svg'
import HeartFull from '../images/heart-full.svg'
import Basket from '../images/productBasket.svg'
import { addProductToBasket, likeProduct } from "../actions/product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import React from 'react';


const Product = (props) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth);
    const likes = useSelector(state => state.user.likes);

    const userId = useSelector(state => state.user.currentUser.id);
    const [reviewsLength, setReviewsLength] = useState('')
    const [isLiked, setLike] = useState(null)


    useEffect(() => {
        setLike(likes.some(like => like.data._id === props.data._id))
    }, [likes, props])

    const addToBask = (id) => {
        if (isAuth) {
            dispatch(addProductToBasket(userId, id))
        } else {
            props.openLog(true)
        }
    };

    const like = (id) => {
        if (isAuth) {
            dispatch(likeProduct(userId, id))
        } else {
            props.openLog(true)
        }
    };

    useEffect(() => {

        let revLength = Number(props.data.reviews.length);

        if (revLength === 0) {
            setReviewsLength(props.data.reviews.length + " отзывов")
        } else if (revLength === 1) {
            setReviewsLength(props.data.reviews.length + " отзыв")
        } else if (revLength === 2 || revLength === 3 || revLength === 4) {
            setReviewsLength(props.data.reviews.length + " отзыва")
        } else {
            setReviewsLength(props.data.reviews.length + " отзывов")
        }
    }, [props.data.reviews])

    return (
        <div className={props.data.inStock ? "product" : "product product-unavailable"}>
            <div className="onsale" style={props.data.onsale && props.data.discount > 0 ? { display: 'block' } : { display: "none" }}>
                - {props.data.discount} %
            </div>
            <div className="product__img">
                <NavLink to={"/catalog/:" + props.data._id + "/info"}>
                    <img src={props.data.catalogImg} alt="" />
                </NavLink>
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
                    <Rating readOnly value={props.data.rate} />
                </div>
                <div className="reviews">
                    <NavLink to={"/catalog/:" + props.data._id + "/reviews"}>
                        {reviewsLength}
                    </NavLink>
                </div>
            </div>
            <div className="product__footer">
                <div className="product__interaction">
                    <div className="price">
                        <p className='price' style={props.data.discount > 0 && props.data.onsale ? {
                            textDecorationLine: "line-through"
                        } : { fontSize: "24px" }}>
                            {props.data.price.toLocaleString("currency")} ₴
                        </p>
                        <p className="price-with-discount" style={props.data.discount > 0 && props.data.onsale ? {
                            display: "block", color: "red", fontWeight: "400", fontSize: "24px"
                        } : { display: "none" }}>
                            {Math.round(props.data.price - (props.data.price * props.data.discount) / 100).toLocaleString("currency")} ₴
                        </p>
                    </div>
                    <div className="buttons">
                        {/* <NavLink to="/compare">
                            <img src={Compare} alt="" />
                        </NavLink> */}
                        <button style={props.data.inStock ? { display: "block" } : { display: "none" }} onClick={() => { like(props.data._id) }}>
                            {isLiked ? <img src={HeartFull} alt="" /> : <img src={Heart} alt="" />}
                        </button>
                    </div>
                </div>
                {props.data.inStock ? <button className='tobasket' onClick={() => { addToBask(props.data._id) }}>
                    В корзину
                    <img src={Basket} alt="" />
                </button> : <p className='unavailable'>
                    Нет в наявности
                </p>}


            </div>
        </div >
    )
}

export default Product;