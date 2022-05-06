import Way from "../components/Way";
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Heart from '../images/productHeart.svg'
import Compare from '../images/compare.svg'
import Star from '../images/star.svg'
import Basket from '../images/productBasket.svg'
import { useDispatch, useSelector } from "react-redux";
import { addProductToBasket } from "../actions/product";
import { useParams } from "react-router-dom";
import i1 from "../images/i1.png"
import i2 from "../images/i2.png"
import i3 from "../images/i3.png"
import i4 from "../images/i4.png"
import i5 from "../images/i5.png"
import ProductSwiper from "../components/ProductSwiper";



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


    useEffect(() => {
        axios.get(`http://localhost:5000/api/catalog/${id}`).then((response) => {
            setProduct(response.data.product);
        });
    }, [id]);
    
    if (product) return (
        <>
            <Way way={product.name} />
            <div className="product-info">
                <div className="swiper">
                    <div className="main-photo">
                        <img src={i1} alt="" />
                    </div>
                    <div className="photo-row">
                        <img src={i2} alt="" />
                        <img src={i3} alt="" />
                        <img src={i4} alt="" />
                        <img src={i5} alt="" />
                    </div>
                </div>
                <div className="information">
                    <div className="information__header">
                        <div className="information__header__left">
                            <div className="title">
                                {product.name}
                            </div>
                            <div className="stars">
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                            </div>
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
            <ProductSwiper product={product} setProduct={setProduct} desc={product.description} productId={product._id} reviews={product.reviews} />
        </>
    );
}

export default ProductPage;