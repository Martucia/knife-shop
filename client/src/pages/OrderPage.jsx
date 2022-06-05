import { useForm } from "react-hook-form";
import FormRow from "../components/FormRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addProductToBasket, removeOneFromBasket, clearBasket } from "../actions/product";
import { Navigate } from 'react-router-dom';
import { saveOrder } from '../actions/user'

const OrderPage = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const basket = useSelector(state => state.user.basket);
    const userId = useSelector(state => state.user.currentUser.id);
    const [basketSumm, setBasketSumm] = useState(0);

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        let order = {
            "data": data,
            "products": basket.map(product => {
                return {
                    "name": product.data.name,
                    "_id": product.data._id,
                    "price": product.data.price,
                    "count": product.count
                }
            })
        }

        dispatch(saveOrder(order))
        dispatch(clearBasket(userId))
    };

    const removeOne = (productId) => {
        dispatch(removeOneFromBasket(productId, userId))
    }

    useEffect(() => {
        let price = 0;

        basket.forEach(product => {
            if (product.data.discount > 0 && product.data.onsale) {
                price += ((product.data.price - (product.data.price * product.data.discount) / 100) * product.count)
            } else {
                price += (product.data.price * product.count)
            }
        })
        setBasketSumm(price)
    }, [basket])

    const addToBask = (id) => {
        dispatch(addProductToBasket(userId, id))
    };

    if (!isAuth) return <Navigate to="/" replace />

    return (
        <div className="order">
            <div className="order__inner">
                <form className="order-form">
                    <div className="title">
                        Информация о доставке
                    </div>
                    <FormRow label="Имя" type="text" name="name" register={register} errors={errors.name} />
                    <FormRow label="Фамилия" type="text" name="secname" register={register} errors={errors.secname} />
                    <FormRow label="Номер" type="number" name="number" register={register} errors={errors.number} />
                    <FormRow label="Город" type="text" name="city" register={register} errors={errors.city} />
                    <FormRow label="Адресс" type="text" name="adress" register={register} errors={errors.adress} />
                    <FormRow label="Индекс" type="text" name="index" register={register} errors={errors.index} />
                    {/* <div className="order-form-btn">
                        <button>
                            Сохранить
                        </button>
                    </div> */}
                </form>
                <div className="order-preview">
                    <div className="title">
                        Предосмотр заказа
                    </div>
                    <div className="order-preview__wrapper">
                        {basket.map(product => <div key={"product-in-order-" + product._id} className="preview-product">
                            <div className="preview-product__img">
                                <img src={product.data.catalogImg} alt="" />
                            </div>
                            <div className="preview-product__info">
                                <div className="preview-product__info__title">
                                    {product.data.name}
                                </div>
                                <div className="preview-product__info__price">
                                    {product.data.price.toLocaleString("currency")} ₴
                                </div>
                            </div>
                            <div className="preview-product__count">
                                <button onClick={() => {
                                    removeOne(product.data._id)
                                }}>
                                    -
                                </button>
                                <span>{product.count}</span>
                                <button onClick={() => { addToBask(product.data._id) }}>
                                    +
                                </button>
                            </div>
                        </div>)}

                    </div>
                </div>
            </div>
            <div className="order-send">
                <div className="order-send__title">
                    Итог заказа
                </div>
                <div className="order-send__footer">
                    <div className="order-send__price">
                        <p>
                            Сумма:
                        </p>
                        <p>
                            {basketSumm.toLocaleString("currency")} ₴
                        </p>
                    </div>
                    <button onClick={handleSubmit(onSubmit)} className="order-send-btn">
                        Заказать
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderPage;