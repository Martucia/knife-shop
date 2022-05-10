const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const ADD_TO_BASKET = "ADD_TO_BASKET"
const REMOVE_FROM_BASKET = "REMOVE_FROM_BASKET"

const defaultState = {
    currentUser: {},
    isAuth: false,
    basket: [],
    isAdmin: false
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            console.log(action)
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                isAdmin: action.isAdmin,
                basket: action.basket
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false,
                isAdmin: false,
                basket: []
            }
        case ADD_TO_BASKET:
            let isNew = true;
            if (state.basket.length > 0) {
                const arr = state.basket.map((product) => {
                    if (product._id === action.payload._id) {
                        isNew = false;
                        return {...product, count: product.count + 1 }
                    }

                    return product;
                })
                if (isNew) arr.push(action.payload);

                return {
                    ...state,
                    basket: arr
                }
            } else {
                return {
                    ...state,
                    basket: [...state.basket, action.payload]
                }
            }

        case REMOVE_FROM_BASKET:

            return {
                ...state,
                basket: state.basket.filter(product => {
                    return product._id !== action.payload
                })
            }
        default:
            return state
    }
}


export const setUser = (user, basket, isAdmin) => ({ type: SET_USER, payload: user, basket, isAdmin })
export const addToBasket = product => ({ type: ADD_TO_BASKET, payload: product })
export const logout = () => ({ type: LOGOUT })
export const removeFromBasket = id => ({ type: REMOVE_FROM_BASKET, payload: id })