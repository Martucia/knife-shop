const SET_PRODUCTS = "SET_PRODUCTS"
const SET_FILTERS = "SET_FILTERS"
const ADD_REVIEW = "ADD_REVIEW"
const EDIT_PRODUCT = "EDIT_PRODUCT"
const DEL_ITEM = "DEL_ITEM"
const ADD_PRODUCT = "ADD_PRODUCT"
const DELETE_REVIEW = "DELETE_REVIEW"

const defaultState = {
    catalog: [],
    pagesCount: null,
    filters: []
}

export default function productReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                catalog: action.payload,
                pagesCount: action.count
            }
        case SET_FILTERS:
            return {
                ...state,
                filters: action.payload
            }
        case ADD_REVIEW:
            return {
                ...state,
                catalog: state.catalog.map(product => {
                    if (product._id === action.payload.owner) {
                        product.reviews.push(action.payload)
                    }
                    return product;
                })
            }
        case DELETE_REVIEW:
            return {
                ...state,
                catalog: state.catalog.map(product => {
                    if (product._id === action.productId) {
                        product.reviews.filter(review => {
                            return review._id !== action.payload
                        })
                    }
                    return product;
                })
            }
        case EDIT_PRODUCT:

            return {
                ...state,
                catalog: state.catalog.map(product => product._id === action.payload._id
                    ? action.payload
                    : product
                )
            }
        case DEL_ITEM:
            return {
                ...state,
                catalog: state.catalog.filter(product => {
                    return product._id !== action.payload
                })
            }
        case ADD_PRODUCT:
            return {
                ...state,
                catalog: [...state.catalog, action.payload]
            }
        default:
            return state
    }
}

export const setProducts = (products, count) => ({ type: SET_PRODUCTS, payload: products, count })
export const setFilters = filters => ({ type: SET_FILTERS, payload: filters })
export const addReviewtoState = review => ({ type: ADD_REVIEW, payload: review })
export const deleteReviewfromState = (productId, reviewId) => ({ type: DELETE_REVIEW, payload: reviewId, productId })
export const editProductReducer = product => ({ type: EDIT_PRODUCT, payload: product })
export const deleteProductReducer = productId => ({ type: DEL_ITEM, payload: productId })
export const addProduct = product => ({ type: ADD_PRODUCT, payload: product })


