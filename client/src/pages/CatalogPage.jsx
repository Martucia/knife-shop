import Way from '../components/Way';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Product from '../components/Product';
import { useDispatch, useSelector } from "react-redux";
import FilterDropDrown from '../components/FilterDropDrown';
import filtersList from '../filters.json'
import { filterProduct } from "../actions/product";


const CatalogPage = () => {
    const [sortBy, setSortBy] = useState("bypop");
    const products = useSelector(state => state.catalog.catalog);
    const [filters, setFilters] = useState({
        manufacture: [],
        steel: [],
        handle: [],
        guardback: []
    })

    const dispatch = useDispatch()

    const handleChange = (event) => {
        setSortBy(event.target.value);
        // console.log(sortBy)
    };

    useEffect(() => {
        if (sortBy === "bypop") {
            products.sort((a, b) => a.name > b.name ? 1 : -1)
        }
        if (sortBy === "byprice") {
            products.sort((a, b) => a.price > b.price ? 1 : -1)
            // console.log(products)
        }
    }, [sortBy]);

    // useEffect(() => {
    //     dispatch(filterProduct(filters))
    // }, [filters]);


    //if (products) 
    return (
        <div className="catalog">
            <button onClick={() => console.log(filters)}>click</button>
            <div className="catalog__header">
                <Way way="Разделочные ножи" wayUlr="carving-knives" />
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        value={sortBy}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={"bypop"}>По популярности</MenuItem>
                        <MenuItem value={"byprice"}>По цене</MenuItem>
                        <MenuItem value={"byreviews"}>По отзывам</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="catalog__inner">
                <div className="catalog__filter">
                    <div className="title">
                        Фильтр товаров
                    </div>
                    {filtersList.map(filter => {
                        return <FilterDropDrown all={filters} set={setFilters} title={filter.name} data={filter.filters} />
                    })}
                </div>
                <div className="catalog__wrapper">
                    {products.map(product => {
                        return <Product data={product} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default CatalogPage;

