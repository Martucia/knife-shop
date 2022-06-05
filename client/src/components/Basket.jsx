import closer from "../images/closer.svg";
import deleteProduct from "../images/delete.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductFromBasket } from '../actions/product';
import { NavLink, useNavigate } from 'react-router-dom';


const Basket = (props) => {
    const [basketSumm, setBasketSumm] = useState(0);
    const [basketStyle, setBasketStyle] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate();

    const products = useSelector(state => state.user.basket);
    const userId = useSelector(state => state.user.currentUser.id);
    const isAuth = useSelector(state => state.user.isAuth);


    const deleteItem = (productId) => {
        dispatch(deleteProductFromBasket(productId, userId))
    };

    useEffect(() => {
        if (props.isOpen) {
            setBasketStyle('basketAnim')
        }
    }, [props.isOpen])


    function setCloseBasket(time) {
        setTimeout(function () {
            props.closeBasket(false);
        }, time);
    }

    useEffect(() => {
        let price = 0;

        products.forEach(product => {
            if (product.data.discount > 0 && product.data.onsale) {
                price += ((product.data.price - (product.data.price * product.data.discount) / 100) * product.count)
            } else {
                price += (product.data.price * product.count)
            }
        })
        setBasketSumm(price)
    }, [products])

    const handleOpenOrder = () => {
        if (products.length > 0) {
            navigate("/order")
            setCloseBasket(340);
            setBasketStyle('');
        } else {
            alert("Добавьте товар в корзину")
        }
    }


    if (isAuth) return (
        <div className="basket-bg">
            <div className={'basket ' + basketStyle} >
                <div className="title">
                    Корзина
                    <button onClick={() => {
                        setCloseBasket(340)
                        setBasketStyle('');
                    }}>
                        <img src={closer} alt="" />
                    </button>
                </div>
                <div className="basket__inner">
                    {products.length > 0 ? products.map(product => {
                        return (
                            <div className="block" key={"product-in-basket-" + product._id}>
                                <div className="product__count">
                                    x{product.count}
                                </div>
                                <div className="block__inner">
                                    <div className="block__img">
                                        <img src={product.data.catalogImg} alt="" />
                                    </div>
                                    <div className="block__text">
                                        <div className="block__title">
                                            < NavLink to={'/catalog/:' + product.data._id} onClick={() => {
                                                setCloseBasket(340);
                                                setBasketStyle('');
                                            }}>
                                                {product.data.name}
                                            </NavLink>
                                        </div>
                                        <div className="block__price price" style={!product.data.inStock ? { display: "none" } : { display: "block" }}>
                                            <p className='price-p' style={product.data.discount > 0 && product.data.onsale ? {
                                                textDecorationLine: "line-through", fontSize: "18px"
                                            } : { fontSize: "24px" }}>
                                                {product.data.price.toLocaleString("currency")} ₴
                                            </p>
                                            <p className="price-with-discount" style={product.data.discount > 0 && product.data.onsale ? {
                                                display: "block", color: "red", fontWeight: "400", fontSize: "24px"
                                            } : { display: "none" }}>
                                                {Math.round(product.data.price - (product.data.price * product.data.discount) / 100).toLocaleString("currency")} ₴
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* 
                                <button className="delete-from-basket" onClick={() => removeOne(product.data._id)}>
                                    -
                                </button> */}

                                <button className="delete-from-basket" onClick={() => deleteItem(product.data._id)}>
                                    <img src={deleteProduct} alt="" />
                                </button>
                            </div>
                        )
                    }) : <div className="empty" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", opacity: "0.6" }}>
                        Добавьте товар в корзину
                    </div>}

                </div>
                <div className="basket__footer">
                    <div className="basket__summ">
                        {basketSumm.toLocaleString("currency")} ₴
                    </div>
                    < button onClick={handleOpenOrder} className="basket-order">
                        Замовити
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Basket;