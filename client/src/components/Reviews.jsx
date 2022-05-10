import { useEffect, useState } from 'react';
import Input from "./Input"
import { addReview } from "../actions/product";
import { useDispatch, useSelector } from "react-redux";
import img from "../images/avatar.png"
import Star from '../images/star.svg'
import Heart from '../images/productHeart.svg'
import ReviewText from './ReviewText';
import { Rating } from '@mui/material';

const Reviews = (props) => {
    // if (props.reviews.length > 0) console.log(props.reviews)

    //if (!props.reviews.length == 0) 
    return (
        <div className="product-swiper__reviews">
            <ReviewsEmpty product={props.product} setProduct={props.setProduct} length={props.reviews.length} productId={props.productId} revOpen={props.revOpen} />
            {props.reviews.map(review => {
                return <Review name={review.author} rate={review.rate} date={review.date} text={review.text} />
            })}
        </div>
    )
}

const ReviewsEmpty = (props) => {
    const [openInput, setOpenInput] = useState(false)
    const [inputVal, setInputVal] = useState('')
    const [rate, setRate] = useState(null)

    const dispatch = useDispatch()
    const userName = useSelector(state => state.user.currentUser.name);

    useEffect(() => {
        if (props.length > 0) setOpenInput(true)
    }, [])

    const sendReview = () => {
        if (userName) {
            // if (inputVal) {
            if (rate) {
                dispatch(addReview(inputVal, props.productId, userName, rate))
                let rev = {
                    text: inputVal,
                    author: userName,
                    rate: rate,
                    owner: props.productId,
                    date: 'Сейчас'
                }

                let newReviews = props.product.reviews.push(rev)
                props.setProduct({ ...props.product, review: newReviews })
                setInputVal('')
                setRate(null)
            } else {
                alert("Поставте оценку продукту")
            }
            // } else {
            //     alert("Введите текст")
            // }
        } else {
            alert("Войдите в аккаунт")
        }
    }

    return (
        <>
            <div className='product-swiper__reviews-row empty' style={!openInput ? { display: 'flex' } : { display: 'none' }} >
                {/* style={!openInput ? { display: 'flex', alignItems: "center", flexDirection: "row" } : { display: 'none' }} */}
                <div>
                    У данного товара нет отзывов. Станьте первым, кто оставил отзыв об этом товаре!
                </div>
                <button onClick={() => setOpenInput(true)}>
                    Написать отзыв
                </button>
            </div>

            <div className='product-swiper__reviews-row' style={{ display: openInput ? 'flex' : 'none' }}>

                <label htmlFor="review-send">Напишите свой отзыв о этом продукте</label>

                <div className="input__block">
                    <input onChange={(e) => setInputVal(e.target.value)}
                        value={inputVal}
                        type="text"
                        placeholder="Ваш отзыв"
                        name="review-send"
                    />
                    <button onClick={() => sendReview()}>
                        Отправить отзыв
                    </button>
                </div>
                <div id="error" className="error"></div>
                <div className="rating">
                    <p>
                        Поставте оценку продукту:
                    </p>
                    <Rating value={rate} onChange={(event, newValue) => {
                        setRate(newValue);
                    }} />
                </div>
            </div>
        </>
    );
}

const Review = (props) => {


    return (
        <div className="review">
            <div className="review__img">
                <img src={img} alt="" />
            </div>
            <div className="review__inner">
                <div className="review__inner__header">
                    <div className="title">
                        {props.name}
                    </div>
                    <div className="date">
                        {props.date.split('T')[0]}
                    </div>
                </div>
                <Rating readOnly value={props.rate} />

                <ReviewText text={props.text} />

                <div className="review__inner__footer">
                    <button className='answer'>
                        Ответить
                    </button>
                    <button className="like">
                        <img src={Heart} alt="" />
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Reviews;