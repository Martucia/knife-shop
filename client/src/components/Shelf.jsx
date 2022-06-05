import { NavLink } from 'react-router-dom';
import Right from '../images/right.svg'
import Product from './Product';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const Shelf = (props) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/catalog?sample=true${props.onsale ? "&onsale=true" : null}`).then((response) => {
            setProducts(response.data.products);
        });

    }, [props.onsale])

    return (
        <div className="shelf">
            <div className="shelf__header">
                <div className="title">
                    {props.title}
                </div>
                <NavLink to="/catalog">
                    Перейти в каталог
                    <img src={Right} alt="" />
                </NavLink>
            </div>
            <div className="shelf__wrapper">
                <Swiper
                    breakpoints={{
                        10: {
                            slidesPerView: 1,
                            slidesPerGroup: 1
                        },
                        550: {
                            slidesPerView: 2,
                            slidesPerGroup: 2
                        },
                        1000: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                            slidesPerGroup: 3
                        },
                        1300: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                            slidesPerGroup: 4
                        },
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                >
                    {products.map(product => <SwiperSlide key={"shelf-product-" + props.title + "-" + product._id}><Product openLog={props.openLog} data={product} /></SwiperSlide>)}
                </Swiper>

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