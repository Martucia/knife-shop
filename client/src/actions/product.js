import axios from 'axios'
import { addToBasket, removeFromBasket } from "../reducers/userReducer";
import { setProducts, addReviewtoState } from "../reducers/productReducer";



export const setCatalog = () => {
    return async dispatch => {
        try {
            const response = await axios.get("http://localhost:5000/api/catalog/");

            dispatch(setProducts(response.data.products))

        } catch (e) {
            // alert(e.response.data.message)
            console.log(e)

        }
    }
}

export const addProductToBasket = (userId, id) => {
    return async dispatch => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/catalog/addtobasket/:${userId}`, {
                id
            });
            dispatch(addToBasket(response.data.product))

        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteProductFromBasket = (id, userId) => {
    return async dispatch => {
        try {

            const response = await axios.delete(`http://localhost:5000/api/catalog/removeproduct?productId=${id}&userId=${userId}`);

            dispatch(removeFromBasket(id))

        } catch (e) {
            console.log(e)
        }
    }
}

// export const filterProduct = (params) => {
//     return async dispatch => {
//         try {
//             let out = '';
//             if (params.manufacture) {
//                 params.manufacture.forEach((word) => {
//                     out = out + word
//                 })
//             }
//             console.log(out)

//             const response = await axios.get(`http://localhost:5000/api/catalog/filter?${}`);


//         } catch (e) {
//             console.log(e)
//         }
//     }
// }

export const addReview = (text, productId, userName, rate) => {
    return async dispatch => {
        try {

            const response = await axios.patch(`http://localhost:5000/api/catalog/addreview`, {
                text,
                productId,
                userName,
                rate
            });

            dispatch(addReviewtoState(response.data.review))


        } catch (e) {
            console.log(e)
        }
    }
}