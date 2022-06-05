import trash from '../images/trash.svg'
import edit from '../images/edit.svg'
import { useEffect } from 'react';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Way from '../components/Way';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../actions/product";
import React from 'react';
import { Pagination } from '@mui/material';
import { setCatalog } from '../actions/product';
import { useSearchParams } from "react-router-dom"

const AdminCatalog = (props) => {
    const products = useSelector(state => state.catalog.catalog);
    const isAdmin = useSelector(state => state.user.isAdmin);
    const count = useSelector(state => state.catalog.pagesCount);
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleChange = (event, value) => {
        props.setPage(value);
        navigate(`/admin-catalog?page=${value}`)
        window.scrollTo(0, 0)
    };

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const page = params.get('page');

    useEffect(() => {
        dispatch(setCatalog(params))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    if (!isAdmin) return <Navigate to="/" replace />

    return (
        <div className="catalog-in-line">
            <div className="catalog-in-line__header">
                <Way way="Разделочные ножи" wayUlr="carving-knives" />
                <NavLink className="add-new" to="/admin-catalog/addnew">
                    Добавить новый товар
                </NavLink>
            </div>
            <div className="catalog-in-line__wrapper">
                {products.map(product => {
                    return <Product key={"adm-product" + product._id} product={product} />
                })}
            </div>
            {count > 1 && <Pagination sx={{
                '& .Mui-selected': {
                    backgroundColor: "#F6B817",
                    color: "#fff",
                    '&:hover': {
                        backgroundColor: "#F6B817",
                    }
                }
            }} className='pagination' page={Number(page)} onChange={handleChange} count={count} />}
        </div>
    );
}

const Product = (props) => {

    const dispatch = useDispatch()

    const delProduct = () => {
        dispatch(deleteProduct(props.product._id))
    }


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
                <button onClick={delProduct} className='product-in-line__delete'>
                    <img src={trash} alt="" />
                </button>
                <NavLink to={"/admin-catalog/edit/:" + props.product._id}>
                    <img src={edit} alt="" />
                </NavLink>
            </div>
        </div>
    )
}

export default AdminCatalog;