import Banner from "../components/Banner";
import Shelf from "../components/Shelf";
import Types from "../components/Types";
import React from 'react';
import { useEffect } from "react";
import { setCatalog } from '../actions/product';
import { useDispatch } from 'react-redux';

const MainPage = (props) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(setCatalog({}))
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Banner />
            <Types />
            <Shelf openLog={props.openLog} title="Хиты продаж" />
            <Shelf openLog={props.openLog} onsale={true} title="Акция" />
            <Shelf openLog={props.openLog} title="Осталось немного" />
            <Shelf openLog={props.openLog} title="Нужно брать" />
            <Shelf openLog={props.openLog} title="Тренд сезона" />

        </>
    );
}

export default MainPage;