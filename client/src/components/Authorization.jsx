import { useState } from 'react';
import Input from './Input';
import { login } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import closer from '../images/modal-closer.svg'

function Authorization(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.user.isAuth);

    useEffect(() => {
        if (props.isActive && !isAuth) {
        } else {
            props.openLog(false)
        }
    }, [props, isAuth])


    const handleSubmit = () => {
        dispatch(login(email, password)).then((response) => {
            setError(response)
        })
    }

    const onKeyPressHandler = async (e) => {
        if (e.charCode === 13) {
            dispatch(login(email, password)).then((response) => {
                setError(response)
            })
        }
    }

    return (

        <div className='modal' style={{ justifyContent: "center" }} >
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <button className="close" onClick={() => {
                    props.openLog(false)
                }}>
                    <img src={closer} alt="" />

                </button>
                <div className="modal__title">
                    Вход
                </div>

                <Input onKeyPress={onKeyPressHandler} label="Email" name={"email"} setValue={setEmail} value={email} type="email" placeholder="Введите Email" />
                <Input onKeyPress={onKeyPressHandler} label="Пароль" name={"password"} setValue={setPassword} value={password} type="password" placeholder="Введите пароль" />
                <div className="modal__btn">
                    <button onClick={handleSubmit}>
                        Вход
                    </button>
                    <div className="error">{error}</div>
                </div>
                <div className="modal__footer">
                    <button className="reg" onClick={() => {
                        props.openLog(false);
                        props.openReg(true)
                    }}>
                        Регистрация
                    </button>
                    <button className="reset">
                        Забыли пароль?
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Authorization;