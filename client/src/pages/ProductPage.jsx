import Way from "../components/Way";
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Heart from '../images/productHeart.svg'
import Compare from '../images/compare.svg'
import Star from '../images/star.svg'
import Basket from '../images/productBasket.svg'
import { useDispatch, useSelector } from "react-redux";
import { addProductToBasket } from "../actions/product";
import { useParams } from "react-router-dom";
import ProductSwiper from "../components/ProductSwiper";
import PhotoSlider from "../components/PhotoSlider";
import { Rating } from '@mui/material';



const ProductPage = () => {
    const dispatch = useDispatch()
    const [product, setProduct] = useState(null);

    let { id } = useParams();

    const userId = useSelector(state => state.user.currentUser.id);

    const handleChange = () => {
        if (userId) {
            dispatch(addProductToBasket(userId, id.slice(1)))
        } else {
            alert("Войдите в аккаунт")
        }
    };

    let productSwiper = useRef();



    useEffect(() => {
        axios.get(`http://localhost:5000/api/catalog/${id}`).then((response) => {
            setProduct(response.data.product);
        });
        // if(toSwiper) window.scrollTo(0, productSwiper.current.offsetTop)
    }, [id]);

    if (product) return (
        <>
            <Way way={product.name} width={90} />
            <div className="product-info">
                <PhotoSlider />
                <div className="information">
                    <div className="information__header">
                        <div className="information__header__left">
                            <div className="title">
                                {product.name}
                            </div>
                            <Rating value={product.rate} readOnly />
                        </div>
                        <div className="information__header__buttons">
                            <NavLink to="/compare">
                                <img src={Compare} alt="" />
                            </NavLink>
                            <button>
                                <img src={Heart} alt="" />
                            </button>

                        </div>
                    </div>
                    <div className="state">
                        В наличии
                    </div>
                    <div className="characteristic">
                        <ul className="characteristic-name">
                            <li>Артикул:</li>
                            <li>Торговая марка:</li>
                            <li>Серия:</li>
                            <li>Бонусные баллы: </li>
                        </ul>
                        <ul className="characteristic-value">
                            {/* <li>{product.vendor}</li> */}
                            <li>{product.trademark}</li>
                            <li>{product.serie}</li>
                            <li>{product.manufacture}</li>
                            <li>+544</li>
                        </ul>
                    </div>
                    <div className="price">
                        {product.price.toLocaleString("currency")} грн
                    </div>
                    <div className="interaction">
                        <div className="count">
                            <button>
                                -
                            </button>
                            <span>1</span>
                            <button>
                                +
                            </button>
                        </div>
                        <div className="btns">
                            <button className="tobasket" onClick={() => {
                                handleChange(product.id)
                            }}>
                                В корзину
                                <img src={Basket} alt="" />
                            </button>
                            <button className="inoneclick">
                                Купить в 1 клик
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ProductSwiper refName={productSwiper} product={product} setProduct={setProduct} desc={product.description} productId={product._id} reviews={product.reviews} />
        </>
    );
}

export default ProductPage;