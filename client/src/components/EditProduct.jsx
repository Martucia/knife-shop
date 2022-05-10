import { useState } from "react";
import { useEffect } from 'react';
import i1 from "../images/i1.png";
import i2 from "../images/i2.png";
import i3 from "../images/i3.png";
import i4 from "../images/i4.png";
import i5 from "../images/i5.png";
import deleteImg from "../images/delete-image.svg"
import addNew from "../images/add-new.svg"


const EditProduct = (props) => {


    useEffect(() => {
        if (props.isOpen) {
            document.body.classList.add("noscroll");
        } else {
            props.setOpen(false)
        }
    }, [props.isOpen])

    return (
        <div className="modal">
            <div className="modal__content editor">
                <button className="close" onClick={() => {
                    props.setOpen(false)
                    document.body.classList.remove("noscroll");
                }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.3536 5.64645C18.5488 5.84171 18.5488 6.15829 18.3536 6.35355L6.35355 18.3536C6.15829 18.5488 5.84171 18.5488 5.64645 18.3536C5.45118 18.1583 5.45118 17.8417 5.64645 17.6464L17.6464 5.64645C17.8417 5.45118 18.1583 5.45118 18.3536 5.64645Z" fill="#414141" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.64645 5.64645C5.84171 5.45118 6.15829 5.45118 6.35355 5.64645L18.3536 17.6464C18.5488 17.8417 18.5488 18.1583 18.3536 18.3536C18.1583 18.5488 17.8417 18.5488 17.6464 18.3536L5.64645 6.35355C5.45118 6.15829 5.45118 5.84171 5.64645 5.64645Z" fill="#414141" />
                    </svg>

                </button>
                <div className="modal__content__photos">
                    <div className="modal__content__photos__photo">
                        <p className="img">
                            <img src={i1} alt="" />
                            <button className="delete">
                                <img src={deleteImg} alt="" />
                            </button>
                        </p>
                        <p>
                            <button className="main">
                                Главная
                            </button>
                        </p>
                    </div>
                    <div className="modal__content__photos__photo">
                        <p className="img">
                            <img src={i2} alt="" />
                            <button className="delete">
                                <img src={deleteImg} alt="" />
                            </button>
                        </p>
                        <p>
                            <button>
                                Выбрать
                            </button>
                        </p>
                    </div>
                    <div className="modal__content__photos__photo">
                        <p className="img">
                            <img src={i3} alt="" />
                            <button className="delete">
                                <img src={deleteImg} alt="" />
                            </button>
                        </p>
                        <p>
                            <button>
                                Выбрать
                            </button>
                        </p>
                    </div>
                    <div className="modal__content__photos__photo">
                        <p className="img">
                            <img src={i4} alt="" />
                            <button className="delete">
                                <img src={deleteImg} alt="" />
                            </button>
                        </p>
                        <p>
                            <button>
                                Выбрать
                            </button>
                        </p>
                    </div>
                    <div className="modal__content__photos__photo add-new">
                        <button>
                            <img src={addNew} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;