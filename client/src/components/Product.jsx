import { NavLink } from 'react-router-dom';
import Star from '../images/star.svg'
import Heart from '../images/productHeart.svg'
import Compare from '../images/compare.svg'
import Basket from '../images/productBasket.svg'
import p1 from '../images/p1.png'
import { addProductToBasket } from "../actions/product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import AlertComponent from './AlertComponent';
import { Rating } from '@mui/material';


const Product = (props) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth);
    const userId = useSelector(state => state.user.currentUser.id);
    const [alert, setAlert] = useState(false);
    // const [ratesCount, setRatesCount] = useState(0)
    const [middleRateValue, setMiddleRateValue] = useState(5)
    const [reviewsLength, setReviewsLength] = useState('')

    const handleChange = (id) => {
        if (isAuth) {
            dispatch(addProductToBasket(userId, id))
        } else {
            setAlert(true);
        }
    };

    useEffect(() => {
        let out = 0;
        props.data.reviews.forEach(review => {
            // setRatesCount(count => count + 1)
            out += review.rate;
        })
        out = out / props.data.reviews.length
        setMiddleRateValue(out)

        let revLength = Number(props.data.reviews.length);

        if (revLength == 0) {
            setReviewsLength(props.data.reviews.length + " отзывов")
        } else if (revLength == 1) {
            setReviewsLength(props.data.reviews.length + " отзыв")
        } else if (revLength == 2 || revLength == 3 || revLength == 4) {
            setReviewsLength(props.data.reviews.length + " отзыва")
        } else {
            setReviewsLength(props.data.reviews.length + " отзывов")
        }
    }, [])

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
                    <Rating readOnly value={middleRateValue} />
                    {/* {'(' + props.data.reviews.length + ')'} */}
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