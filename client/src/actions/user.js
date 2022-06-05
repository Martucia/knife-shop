import axios from 'axios'
import { setUser, setLoading } from "../reducers/userReducer";

export const registration = (name, email, password) => {
    return async dispatch => {
        try {

            dispatch(setLoading(true))

            await axios.post(`http://localhost:5000/api/auth/reg`, {
                name,
                email,
                password
            })
            dispatch(login(email, password))

            dispatch(setLoading(true))

        } catch (e) {
            dispatch(setLoading(false))
            return e.response.data.message
        }
    }
}


export const login = (email, password) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))

            const response = await axios.post(`http://localhost:5000/api/auth/log`, {
                email,
                password
            })

            dispatch(setUser(response.data.user, response.data.basket, response.data.likesList, response.data.isAdmin))
            localStorage.setItem('token', response.data.token)

            dispatch(setLoading(false))

        } catch (e) {
            dispatch(setLoading(false))
            return e.response.data.message

        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')

            if (token) {
                dispatch(setLoading(true))
                const response = await axios.get(`http://localhost:5000/api/auth/`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

                await dispatch(setUser(response.data.user, response.data.basket, response.data.likesList, response.data.isAdmin))
                localStorage.setItem('token', response.data.token)

                dispatch(setLoading(false))
            }

        } catch (e) {
            alert(e.response.message)
            console.log(e.response)
            localStorage.removeItem('token')
        }
    }
}

export const saveOrder = (order) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            await axios.post(`http://localhost:5000/api/auth/order`, { order })
            dispatch(setLoading(false))
        } catch (e) {
            console.log(e.response)
            dispatch(setLoading(false))
        }
    }
}