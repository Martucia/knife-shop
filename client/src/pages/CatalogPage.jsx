import React, { useState } from 'react';
import Way from '../components/Way';
import { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Product from '../components/Product';
import { useSelector } from "react-redux";
// import { setCatalog } from "../actions/product";
import { Pagination } from '@mui/material';
import { useSearchParams } from "react-router-dom"
import Filtration from '../components/Filtration';

const CatalogPage = (props) => {
    const count = useSelector(state => state.catalog.pagesCount);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState("bypop");
    const params = new URLSearchParams(searchParams);
    const page = params.get('page');


    const handleChange = (event, value) => {
        props.setPage(Number(value));
        params.set("page", value);
        setSearchParams(params)

        window.scrollTo(0, 0)
    };

    const sortHandle = (event) => {
        params.set("sort", event.target.value);
        setSortBy(event.target.value)
        setSearchParams(params)
    };

    const products = useSelector(state => state.catalog.catalog);

    useEffect(() => {
        props.setPage(Number(page) || 1)
    }, [page, props])

    useEffect(() => {
        window.scrollTo(0, 0)
        setSortBy(params.get("sort") || 'bypop')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="catalog">
            <div className="catalog__header">
                <Way way={params.get('category') || "Каталог товаров"} wayUrl="catalog" />

                <Select
                    value={sortBy}
                    onChange={sortHandle}
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ height: "45px", width: "100%", maxWidth: "200px" }}
                >
                    <MenuItem value={"bypop"}>По популярности</MenuItem>
                    <MenuItem value={"byprice"}>По цене</MenuItem>
                    <MenuItem value={"byreviews"}>По отзывам</MenuItem>
                </Select>

            </div>
            <div className="catalog__inner">
                <Filtration />
                <div className="catalog__products">
                    {products.length > 0 ? <>
                        <div className="catalog__products__wrapper">
                            {products.map(product => {
                                return <Product key={product._id.toString()} openLog={props.openLog} data={product} />
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
                        }}
                            className='pagination' page={Number(page) || 1} onChange={handleChange} count={count} />}
                    </> : <div className="empty" style={{ textAlign: "center", fontSize: 20 + "px", color: "#aaa", margin: "50px 0" }}>
                        Товара по такому запросу нет
                    </div>}


                </div>
            </div>
        </div >
    );



}

export default CatalogPage;

