import MainPage from "./pages/MainPage";
import { Route, Routes, Switch } from 'react-router-dom';
import Header from "./components/Header/Header";
import CatalogPage from "./pages/CatalogPage";
import AdminCatalog from "./pages/AdminCatalog";
import { useEffect, useState } from "react";
import ProductPage from "./pages/ProductPage";
import { useDispatch } from "react-redux";
import Registration from "./components/Registration";
import Authorization from "./components/Authorization";
import { auth } from "./actions/user";
import { setCatalog } from "./actions/product";
import Basket from "./components/Basket";
import Footer from "./components/Footer";
import EditProduct from "./components/EditProduct";
import MobileHeader from "./components/Header/MobileHeader";


function App() {
    const [isLogOpen, openLog] = useState(false);
    const [isRegOpen, openReg] = useState(false);
    const [isBasketOpen, openBasket] = useState(false);
    const [isMenuOpen, openMenu] = useState(false);
    const [isEditorOpen, openEditor] = useState(false);

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(auth());
        // dispatch(setCatalog())
    }, [])


    return (
        <>
            <Header
                setOpen={openLog}
                openBasket={openBasket} />
            <MobileHeader
                isMenuOpen={isMenuOpen}
                openMenu={openMenu}
                openBasket={openBasket}
                setOpen={openLog}
            />

            <Routes >
                <Route exact path="/" element={< MainPage />} />
                <Route path="/catalog" element={< CatalogPage />} />
                <Route path="/catalog/:id/*" element={< ProductPage />} />
                <Route path="/admin-catalog" element={< AdminCatalog openEditor={openEditor} />} />
            </Routes>
            <Footer />

            {isBasketOpen && < Basket
                isOpen={isBasketOpen}
                closeBasket={openBasket} />}

            {isLogOpen && < Authorization
                isActive={isLogOpen}
                openLog={openLog}
                openReg={openReg}
            />}

            {isRegOpen && < Registration
                isActive={isRegOpen}
                openReg={openReg}
                openLog={openLog}
            />}

            {isEditorOpen && <EditProduct
                isOpen={isEditorOpen}
                setOpen={openEditor} />}

        </>
    );
}

export default App;