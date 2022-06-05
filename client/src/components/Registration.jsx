import React, { useState } from 'react';
import { registration } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import closer from '../images/modal-closer.svg'
import FormRow from './FormRow';

function Registration(props) {
    const [error, setError] = useState(false)

    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.user.isAuth);

    useEffect(() => {
        if (!props.isActive || isAuth) props.openReg(false)
    }, [props, isAuth])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        dispatch(registration(data.name, data.email, data.password)).then((res) => {
            setError(res)
            if (!res) reset()
        })
    };

    return (
        <div className='modal' style={{ justifyContent: "center" }} >
            {/* onClick={() => props.openReg(false)} */}
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <button className="close" onClick={() => {
                    props.openReg(false)
                }}>
                    <img src={closer} alt="" />
                </button>
                <div className="modal__title">
                    Регистрация
                </div>

                <form autoComplete='off' className='form-registration' onSubmit={handleSubmit(onSubmit)}>
                    <FormRow label="Имя" name="name" type="text" register={register} errors={errors.name} />
                    <FormRow label="Email" name="email" type="email" register={register} errors={errors.email} />
                    <FormRow label="Пароль" name="password" type="password" register={register} errors={errors.password} />
                    <div className="modal__btn">
                        <input type="submit" className='form-send' />
                        <div className="error">{error}</div>
                    </div>
                </form>

                <div className="modal__footer">
                    <button className="reg log" onClick={() => {
                        props.openLog(true);
                        props.openReg(false)
                    }}>
                        Войти
                    </button>
                    <button className="reset">
                        Забыли пароль?
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Registration;