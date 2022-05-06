import axios from 'axios'
import { setUser } from "../reducers/userReducer";

export const registration = (name, email, password) => {
    return async dispatch => {
        try {

            const response = await axios.post(`http://localhost:5000/api/auth/reg`, {
                name,
                email,
                password
            })
            dispatch(login(email, password))
            
            alert(response.data.message)

        } catch (e) {
            alert(e.response.data.message)
            console.log(e)

        }
    }
}


export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/log`, {
                email,
                password
            })

            // console.log(response)
            dispatch(setUser(response.data.user, response.data.basket))
            localStorage.setItem('token', response.data.token)

        } catch (e) {
            // alert(e.response.data.message)
            console.log(e)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )

            dispatch(setUser(response.data.user, response.data.basket))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            // alert(e.response.message)
            localStorage.removeItem('token')
        }
    }
}