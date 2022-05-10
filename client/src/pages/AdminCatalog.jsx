import p1 from '../images/p1.png'
import trash from '../images/trash.svg'
import edit from '../images/edit.svg'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { setCatalog } from "../actions/product";
import { NavLink } from 'react-router-dom';



const AdminCatalog = (props) => {
    const products = useSelector(state => state.catalog.catalog);
    const dispatch = useDispatch()
    const [page, setPage] = useState(
        parseInt(window.location.search.split("=")[1] || 1)
    )

    useEffect(() => {
        dispatch(setCatalog(page))
    }, [])

    

    return (
        <div className="admin-catalog">
            {products.map(product => {
                return <Product openEditor={props.openEditor} product={product} />
            })}
        </div>
    );
}

const Product = (props) => {
    const [reviewsLength, setReviewsLength] = useState('')

    useEffect(() => {
        let revLength = Number(props.product.reviews.length);

        if (revLength == 0) {
            setReviewsLength(props.product.reviews.length + " отзывов")
        } else if (revLength == 1) {
            setReviewsLength(props.product.reviews.length + " отзыв")
        } else if (revLength == 2 || revLength == 3 || revLength == 4) {
            setReviewsLength(props.product.reviews.length + " отзыва")
        } else {
            setReviewsLength(props.product.reviews.length + " отзывов")
        }
    }, [])

    return (
        <div className="admin-catalog-product">
            <div className="admin-catalog-product__left">
                <div className="admin-catalog-product__img">
                    <img src={p1} alt="" />
                </div>
                <div className="admin-catalog-product__title">
                    <NavLink to={"/catalog/:" + props.product._id + "/info"}>
                        {props.product.name}
                    </NavLink>
                </div>
            </div>
            <div className="admin-catalog-product__right">
                <div className="admin-catalog-product__sale" style={props.product.onsale ? { display: "block" } : { display: "none" }}>
                    {props.product.onsale} %
                </div>
                <div className="admin-catalog-product__reviews">
                    <NavLink to={"/catalog/:" + props.product._id + "/reviews"}>
                        {reviewsLength}
                    </NavLink>
                </div>
                <div className="admin-catalog-product__price">
                    {props.product.price.toLocaleString("currency")} грн.
                </div>
                <button className='admin-catalog-product__delete'>
                    <img src={trash} alt="" />
                </button>
                <button onClick={() => props.openEditor(true)}>
                    <img src={edit} alt="" />
                </button>
            </div>
        </div>
    )
}

export default AdminCatalog;