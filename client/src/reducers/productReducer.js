const SET_PRODUCTS = "SET_PRODUCTS"
const ADD_REVIEW = "ADD_REVIEW"
// const DEL_ITEM = "DEL_ITEM"

const defaultState = {
    catalog: []
}

export default function productReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                catalog: action.payload
            }
        case ADD_REVIEW: 
            let newCatalog = state.catalog.map(product => {
                if(product._id === action.payload.owner) {
                    product.reviews.push(action.payload)
                }
                return product;
            })
            return {
                ...state,
                catalog: newCatalog
            }
        default:
            return state
    }
}

export const setProducts = products => ({ type: SET_PRODUCTS, payload: products })
export const addReviewtoState = review => ({ type: ADD_REVIEW, payload: review })


