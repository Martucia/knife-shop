import React from 'react';
import MainPage from "./pages/MainPage";
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import CatalogPage from "./pages/CatalogPage";
import { useEffect, useState } from "react";
import ProductPage from "./pages/ProductPage";
import { useDispatch, useSelector } from "react-redux";
import Registration from "./components/Registration";
import Authorization from "./components/Authorization";
import { auth } from "./actions/user";
// import { setCatalog } from "./actions/product";
import Basket from "./components/Basket";
import Footer from "./components/Footer";
import Editor from "./components/Editor";
import MobileHeader from "./components/Header/MobileHeader";
import AdminCatalog from "./pages/AdminCatalog";
import Spinner from './components/Spinner';
import Likes from './pages/Likes';
import AboutUs from './pages/AboutUs';
import AboutOrder from './pages/AboutOrder';
// import SlideUp from './components/SlideUp';
import OrderPage from './pages/OrderPage';
// import ContactsPage from './pages/ContactsPage';
import NotFound  from './pages/NotFound';
// import ScrollTop from "./components/ScrollTop"

function App() {
  const [isLogOpen, openLog] = useState(false);
  const [isRegOpen, openReg] = useState(false);
  const [isBasketOpen, openBasket] = useState(false);
  const [isMenuOpen, openMenu] = useState(false);

  const isLoading = useSelector(state => state.user.isLoading);

  const dispatch = useDispatch()

  const [page, setPage] = useState(null)


  useEffect(() => {
    dispatch(auth());
  }, [dispatch])


  useEffect(() => {
    if (isLogOpen || isRegOpen || isBasketOpen || isMenuOpen || isLoading) {
      document.body.classList.add("noscroll");
    } else {
      document.body.classList.remove("noscroll");
    }
  }, [isLogOpen, isRegOpen, isBasketOpen, isMenuOpen, isLoading])

  return (
    <>
      <Header setOpen={openLog} openBasket={openBasket} openLog={openLog} />
      <MobileHeader openLog={openLog} isMenuOpen={isMenuOpen} openMenu={openMenu} openBasket={openBasket} setOpen={openLog} />

      {/* <SlideUp /> */}
      {/* <ScrollTop /> */}

      <Routes>
        <Route exact path="/" element={<MainPage openLog={openLog} />} />
        <Route path="/catalog" element={<CatalogPage openLog={openLog} page={page} setPage={setPage} />} />
        <Route path="/catalog/:id/*" element={<ProductPage openLog={openLog} />} />
        <Route path="/admin-catalog/*" element={<AdminCatalog page={page} setPage={setPage} />} />
        <Route path="/admin-catalog/edit/:id" element={<Editor />} />
        <Route path="/admin-catalog/addnew" element={<Editor isNewProduct={true} />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/delivery" element={<AboutOrder />} />
        <Route path="/order" element={<OrderPage />} />
        {/* <Route path="/contacts" element={<ContactsPage />} /> */}
        <Route element={<NotFound  />} />
      </Routes>
      <Footer />

      {isLoading && <Spinner />}

      {isBasketOpen && <Basket isOpen={isBasketOpen} closeBasket={openBasket} />}

      {isLogOpen && <Authorization isActive={isLogOpen} openLog={openLog} openReg={openReg} />}

      {isRegOpen && <Registration isActive={isRegOpen} openReg={openReg} openLog={openLog} />}

    </>
  );
}

export default App;
