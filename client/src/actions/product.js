import axios from 'axios'
import { addToBasket, removeFromBasket, setLoading, likeProductReducer, removeOneFromBasketReducer, clearBasketReducer } from "../reducers/userReducer";
import { setProducts, setFilters, addReviewtoState, editProductReducer, deleteProductReducer, addProduct } from "../reducers/productReducer";



export const setCatalog = (searchParams) => {
    return async dispatch => {
        try {

            dispatch(setLoading(true))

            const response = await axios.get(`http://localhost:5000/api/catalog?${searchParams}`);

            dispatch(setProducts(response.data.products, response.data.count))


            dispatch(setLoading(false))
            return response.data.products;

        } catch (e) {
            console.log(e)
            dispatch(setLoading(false))
        }
    }
}

export const getFilters = () => {
    return async dispatch => {
        try {

            dispatch(setLoading(true))

            const response = await axios.get(`http://localhost:5000/api/catalog/getFilters`);

            dispatch(setFilters(response.data))

            dispatch(setLoading(false))
            return response.data;

        } catch (e) {
            console.log(e)
            dispatch(setLoading(false))
        }
    }
}

export const addNewProduct = (product) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await axios.post(`http://localhost:5000/api/catalog/addproduct`,
                product
            );

            dispatch(addProduct(response.data.product))
            dispatch(setLoading(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoading(false))

        }
    }
}

export const likeProduct = (userId, id) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await axios.patch(`http://localhost:5000/api/catalog/like/:${userId}`, {
                id
            });

            if (response.data.delete) {
                dispatch(likeProductReducer(response.data.likeId, response.data.delete))
            } else {
                dispatch(likeProductReducer(response.data.like, false))
            }

            dispatch(setLoading(false))

        } catch (e) {
            console.log(e)
            dispatch(setLoading(false))

        }
    }
}

export const addProductToBasket = (userId, id) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await axios.patch(`http://localhost:5000/api/catalog/addtobasket/:${userId}`, {
                id
            });

            dispatch(addToBasket(response.data.product))
            dispatch(setLoading(false))

        } catch (e) {
            console.log(e)
            dispatch(setLoading(false))

        }
    }
}

export const deleteProductFromBasket = (id, userId) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            await axios.delete(`http://localhost:5000/api/catalog/removeproduct?productId=${id}&userId=${userId}`);

            dispatch(removeFromBasket(id))
            dispatch(setLoading(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoading(false))

        }
    }
}

export const removeOneFromBasket = (id, userId) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            await axios.patch(`http://localhost:5000/api/catalog/removeoneproduct?productId=${id}&userId=${userId}`).then(response => {
                if (response.status === 204) {
                    dispatch(removeFromBasket(id))
                } else {
                    dispatch(removeOneFromBasketReducer(id))
                }
            });

            dispatch(setLoading(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoading(false))
        }
    }
}

export const clearBasket = (userId) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            await axios.patch(`http://localhost:5000/api/catalog/clearbasket?userId=${userId}`).then(() => {
                dispatch(clearBasketReducer())
            });

            dispatch(setLoading(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoading(false))

        }
    }
}

export const editProduct = (updates, id) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await axios.patch(`http://localhost:5000/api/catalog/edit/${id}`, {
                updates
            });

            dispatch(editProductReducer(response.data.product))
            dispatch(setLoading(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoading(false))

        }
    }
}

export const deleteProduct = (id) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            await axios.delete(`http://localhost:5000/api/catalog/delete/:${id}`);

            dispatch(deleteProductReducer(id))
            dispatch(setLoading(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoading(false))

        }
    }
}


export const addReview = (text, productId, userId, rate) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await axios.patch(`http://localhost:5000/api/catalog/addreview`, {
                text,
                productId,
                userId,
                rate
            });

            dispatch(addReviewtoState(response.data.review))
            dispatch(setLoading(false))

        } catch (e) {
            console.log(e)
            dispatch(setLoading(false))

        }
    }
}

export const deleteReview = (productId, reviewId) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            await axios.patch(`http://localhost:5000/api/catalog/removereview`, {
                productId,
                reviewId
            });

            // dispatch(deleteReviewfromState(productId, reviewId))
            dispatch(setLoading(false))

        } catch (e) {
            console.log(e)
            dispatch(setLoading(false))

        }
    }
}