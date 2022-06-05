import React from 'react';
import Way from "../components/Way";
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Heart from '../images/productHeart.svg'
import HeartFull from '../images/heart-full.svg'
// import Compare from '../images/compare.svg'
import Basket from '../images/productBasket.svg'
import { useDispatch, useSelector } from "react-redux";
import { addProductToBasket, deleteProduct, likeProduct } from "../actions/product";
import ProductSwiper from "../components/ProductSwiper";
import PhotoSlider from "../components/PhotoSlider";
import { Rating } from '@mui/material';
import edit from '../images/edit.svg'
import trash from '../images/trash.svg'
import { setLoading } from "../reducers/userReducer"
import AlertComponent from '../components/AlertComponent';
import { useParams, useNavigate } from "react-router-dom";


const ProductPage = (props) => {
    const dispatch = useDispatch()
    const [product, setProduct] = useState(null);
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false)
    const [isLiked, setLike] = useState(null)

    let { id } = useParams();
    const navigate = useNavigate();

    const userId = useSelector(state => state.user.currentUser.id);
    const isAdmin = useSelector(state => state.user.isAdmin);
    const likes = useSelector(state => state.user.likes);
    const isAuth = useSelector(state => state.user.isAuth);

    useEffect(() => {
        setLike(likes.some(like => like.data._id === id.slice(1)))
    }, [likes, id, isLiked])

    const like = (id) => {
        if (isAuth) {
            dispatch(likeProduct(userId, id))
        } else {
            props.openLog(true)
        }
    };


    const handleChange = () => {
        if (userId) {
            dispatch(addProductToBasket(userId, id.slice(1)))
            setSuccess(true)
            setAlert(true);
        } else {
            props.openLog(true)
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        dispatch(setLoading(true))
        axios.get(`http://localhost:5000/api/catalog/${id}`).then((response) => {
            setProduct(response.data.product);
            dispatch(setLoading(false))
        });

    }, [id, dispatch]);

    const delProduct = () => {
        dispatch(deleteProduct(id.slice(1)))
        navigate(-1);
    }

    if (product) return (
        <>
            <Way way={product.name} width={90} />
            <div className="product-info">
                <PhotoSlider id={product._id} images={product.productImg} />
                <div className="information">
                    <div className="information__header">
                        <div className="information__header__left">
                            <div className="title">
                                {product.name}
                            </div>
                            <Rating value={product.rate} readOnly />
                        </div>
                        {isAdmin ? <div className="information__header__buttons">
                            <button style={{ height: 30 + "px" }} onClick={delProduct} className='delete'>
                                <img style={{ height: 100 + "%" }} src={trash} alt="" />
                            </button>
                            <NavLink style={{ height: 30 + "px" }} to={"/admin-catalog/edit/" + id}>
                                <img style={{ height: 100 + "%" }} src={edit} alt="" />
                            </NavLink>
                        </div> : (<div className="information__header__buttons">
                            {/* <NavLink to="/compare">
                                <img src={Compare} alt="" />
                            </NavLink> */}
                            <button onClick={() => like(product._id)}>
                                {isLiked ? <img src={HeartFull} alt="" /> : <img src={Heart} alt="" />}
                            </button>

                        </div>)}

                    </div>
                    <div className="state" style={product.inStock ? { color: "green" } : { color: "red" }}>
                        {product.inStock ? "В наличии" : "Отсутствует"}
                    </div>
                    <div className="characteristic">
                        <ul className="characteristic-name">
                            <li>Торговая марка:</li>
                            <li>Серия:</li>
                            <li>Производство:</li>
                            {/* <li>Бонусные баллы: </li> */}
                        </ul>
                        <ul className="characteristic-value">
                            {/* <li>{product.vendor}</li> */}
                            <li>{product.trademark}</li>
                            <li>{product.serie}</li>
                            <li>{product.manufacture}</li>
                            {/* <li>+544</li> */}
                        </ul>
                    </div>
                    <div className="price" style={!product.inStock ? { display: "none" } : { display: "block" }}>
                        <p className='price-p' style={product.discount > 0 && product.onsale ? {
                            textDecorationLine: "line-through", fontSize: "18px"
                        } : { fontSize: "26px" }}>
                            {product.price.toLocaleString("currency")} ₴
                        </p>
                        <p className="price-with-discount" style={product.discount > 0 && product.onsale ? {
                            display: "block", color: "red", fontWeight: "400", fontSize: "26px"
                        } : { display: "none" }}>
                            {Math.round(product.price - (product.price * product.discount) / 100).toLocaleString("currency")} ₴
                        </p>
                        {/* {product.price.toLocaleString("currency")} ₴ */}
                    </div>
                    <div className="interaction" style={!product.inStock ? { marginTop: "30px" } : {}}>
                        <div className="count">
                            <button disabled={!product.inStock} className={!product.inStock ? "disabled" : "inoneclick"}>
                                -
                            </button>
                            <span>1</span>
                            <button disabled={!product.inStock} className={!product.inStock ? "disabled" : "inoneclick"}>
                                +
                            </button>
                        </div>
                        <div className="btns">
                            <button disabled={!product.inStock} className={!product.inStock ? "disabled" : "tobasket"} onClick={() => {
                                handleChange(product.id)
                            }}>
                                В корзину
                                <img src={Basket} alt="" />
                            </button>
                            <button disabled={!product.inStock} className={!product.inStock ? "disabled" : "inoneclick"} >
                                Купить в 1 клик
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ProductSwiper product={product} setProduct={setProduct} desc={product.description} productId={product._id} reviews={product.reviews} />
            {alert && <AlertComponent success={success} close={setAlert} />}
        </>
    )

}

export default ProductPage;