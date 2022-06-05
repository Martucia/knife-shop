import { useEffect, useState } from 'react';
import PriceFilter from './PriceFilter';
import dropArrow from "../images/filter-drop-btn.svg"
import FilterDropDrown from './FilterDropDrown';
import { useDispatch } from 'react-redux';
import { getFilters, setCatalog } from '../actions/product';
import { useSearchParams } from "react-router-dom"

const Filtration = () => {
    const [isOpen, setOpen] = useState(true)
    const [filters, setFilters] = useState(null)
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    let params = new URLSearchParams(searchParams);

    const dispatch = useDispatch()

    const toggleDropDown = (e) => {
        e.preventDefault();
        setOpen(!isOpen)
    }
 
    useEffect(() => {
        dispatch(setCatalog(params))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])


    useEffect(() => {
        dispatch(getFilters()).then(response => {
            setFilters(response.filtersList)
        })
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();


    }

    if (filters) return (
        <div className="catalog__filter">

            <button className={isOpen ? "close filters" : 'filters'} onClick={toggleDropDown}>
                <p>Фильтр товаров</p>
                <img src={dropArrow} alt="" />
            </button>

            <form onSubmit={handleSubmit} className="filters__inner" style={isOpen ? { display: 'flex' } : { display: "none" }}>
                <PriceFilter />
                {filters.map((filter, index) => {
                    return <FilterDropDrown key={"filter-group-" + index} way={filter.way} title={filter.name} data={filter.data} />
                })}
            </form>

        </div>
    );
}

export default Filtration;