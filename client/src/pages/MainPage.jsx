import Banner from "../components/Banner";
import Shelf from "../components/Shelf";
import Types from "../components/Types";


const MainPage = () => {
    return (
        <>
            <Banner />
            <Types />
            <Shelf onsale={true} title="Хиты продаж" />
        </>
    );
}

export default MainPage;