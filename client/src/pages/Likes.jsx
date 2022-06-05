import { useSelector } from "react-redux";
import ProductInLine from "../components/ProductInLine";
import { Navigate } from 'react-router-dom';
import { useEffect } from "react"


const Likes = () => {
    const likes = useSelector(state => state.user.likes);
    const isAuth = useSelector(state => state.user.isAuth);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!isAuth) return <Navigate to="/" replace />
    return (
        <div className="catalog-in-line">
            {likes.length > 0 ? likes.map(like => {
                return <ProductInLine key={'like-' + likes._id} product={like.data} />
            }) : <div style={{ width: "100%", margin: "60px 0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", opacity: "0.6" }}>У вас еще нету лайкнутых продуктов</div>}
        </div>
    );
}


export default Likes;