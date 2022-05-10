import Way from '../components/Way';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Product from '../components/Product';
import { useDispatch, useSelector } from "react-redux";
import FilterDropDrown from '../components/FilterDropDrown';
import filtersList from '../filters.json'
import { setCatalog } from "../actions/product";
import { Pagination } from '@mui/material';
import { NavLink, useRouteMatch } from 'react-router-dom';


const CatalogPage = (props) => {
    const dispatch = useDispatch()

    // const [sortBy, setSortBy] = useState("bypop");
    const [filters, setFilters] = useState({
        manufacture: [],
        steel: [],
        handle: [],
        guardback: []
    })


    const products = useSelector(state => state.catalog.catalog);
    const [page, setPage] = useState(
        parseInt(window.location.search.split("=")[1] || 1)
    )


    useEffect(() => {
        dispatch(setCatalog(page))
    }, [])

    // useEffect(() => {
    //     if (sortBy === "bypop") {
    //         products.sort((a, b) => a.name > b.name ? 1 : -1)
    //     }
    //     if (sortBy === "byprice") {
    //         products.sort((a, b) => a.price > b.price ? 1 : -1)
    //         // console.log(products)
    //     }
    // }, [sortBy]);


    //if (products) 
    
    return (
        <div className="catalog">
            <div className="catalog__header">
                <Way way="Разделочные ножи" wayUlr="carving-knives" />
                {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        value={sortBy}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={"bypop"}>По популярности</MenuItem>
                        <MenuItem value={"byprice"}>По цене</MenuItem>
                        <MenuItem value={"byreviews"}>По отзывам</MenuItem>
                    </Select>
                </FormControl> */}

            </div>

            <div className="catalog__inner">
                <div className="catalog__filter">
                    <div className="title">
                        Фильтр товаров
                    </div>
                    {/* {filtersList.map(filter => {
                        return <FilterDropDrown all={filters} set={setFilters} title={filter.name} data={filter.filters} />
                    })} */}
                </div>
                <div className="catalog__products">
                    <div className="catalog__products__wrapper">
                        {products.map(product => {
                            return <Product data={product} />
                        })}
                    </div>
                    <Pagination />
                </div>
            </div>
        </div>
    );
}

export default CatalogPage;

