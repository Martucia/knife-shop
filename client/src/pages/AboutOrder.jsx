import WayImg from '../images/step-ship.png'
import { useEffect } from "react"
import Way from "../components/Way"
import o1 from '../images/o1.png'
import o2 from '../images/o2.png'
import o3 from '../images/o3.png'
import o4 from '../images/o4.png'
import o5 from '../images/o5.png'

const AboutOrder = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="about-order">
            <Way wayUrl="delivery" way="Оплата и доставка" />
            <h1>Оплата и доставка</h1>
            <img className='delivery-img' src={WayImg} alt="" />
            <p>В нашем интернет-магазине существует доставка заказов без предоплаты (наложенным платежом) по всей территории Украины. Оплата производится на Вашем почтовом отделении при получении посылки. Доставка заказа по Украине без предоплаты с наложенным платежом в среднем занимает 10-14 дней.</p>
            <p>
                <span>Будьте внимательны!</span> При доставке товаров наложенным платежом, Почта Украины дополнительно взимает порядка 5-7% от стоимости оценки посылки за осуществление денежного перевода. Эта комиссия идет Почте Украины за услугу <span>«Наложенный платеж и Перевод денежных средств»</span>. Таким образом, зачастую гораздо выгоднее заказать товар по предоплате. Более подробно о всех плюсах и минусах наложенного платежа можно почитать
                <a href="/"> здесь.</a> Вы можете получить заказ значительно быстрее, по Украине за 2-3 дня, если выберите доставку EMS-почтой. Доставка EMS-почтой также возможна без предоплаты.
            </p>
            <p className='importantly'>
                <span>Внимание:</span> Отправка посылок Наложенным платежом свыше 10000 гривень осуществляется только по предоплате!
            </p>
            <h2>Так же у нас есть другие способы оплаты:</h2>
            <div className="payments">
                <div className="payment">
                    <div className="payment__img">
                        <img src={o1} alt="" />
                    </div>
                    <div className="payment__text">
                        <h4 className='payment__text__title'>
                            Оплата по квитанции в любом банке
                        </h4>
                        <p>
                            Для этого способа оплаты Вам необходимо выбрать в графе <span>"Способ оплаты" - "Наличными в любом банке".</span>
                        </p>
                        <p>
                            После оформления заказа с Вами свяжется менеджер в первые 24 часа для уточнения деталей и вышлет Вам на электронную почту квитанцию. Вам будет необходимо её распечатать и оплатить.
                        </p>
                        <p>
                            <span>Внимание!</span> Срок оплаты до 5 дней, если оплата не поступает в этот период - заказ аннулируется автоматически.
                        </p>
                    </div>
                </div>
                <div className="payment">
                    <div className="payment__img">
                        <img src={o2} alt="" />
                    </div>
                    <div className="payment__text">
                        <h4 className='payment__text__title'>
                            Оплата по безналичному расчету
                        </h4>
                        <p>
                            Если Вы хотите оплатить заказ как юр. лицо, то в графе <span>"Способ оплаты"</span> Вам необходимо выбрать <span>"Безналичный расчет".</span> Все наши реквизиты для оплаты указаны на сайте. С заказом мы высылаем все бухгалтерские документы, которые Вам понадобятся.
                        </p>
                        <p>
                            <span>Внимание!</span> Не подтвержденные заказы не отправляются, поэтому будьте внимательны при указании Вашего номера телефона.
                        </p>
                        <p>
                            Обратите особое внимание! В случае отсутствия товара в наличии, либо при выборе нестандартной конфигурации ножа, товар будет заказан на производстве специально для Вас. При этом срок изготовления товара может увеличится до 30 дней и в данном случае, чтобы гарантированно получить заказ, необходимо произвести 100% предоплату заказа.
                        </p>
                        <p>
                            Возможна доставка заказов за пределы Украины. Условия доставки нужно уточнять у наших менеджеров.
                        </p>
                        <p>
                            Для юридических лиц и индивидуальных предпринимателей предусмотрена оплата безналичным расчетом с предоставлением отчетных документов. Счет на оплату Вы сможете получить при формировании заказа. Оригиналы отчетных документов высылаются в посылке, вместе с заказом.
                        </p>
                    </div>
                </div>
                <div className="payment">
                    <div className="payment__img">
                        <img src={o3} alt="" />
                    </div>
                    <div className="payment__text">
                        <h4 className='payment__text__title'>
                            Оплата при получении на почте
                        </h4>
                        <p>
                            Наложенный платеж
                        </p>
                    </div>
                </div>
                <div className="payment">
                    <div className="payment__img">
                        <img src={o4} alt="" />
                    </div>
                    <div className="payment__text">
                        <h4 className='payment__text__title'>
                            Электронные деньги
                        </h4>
                        <p>
                            Webmoney, Яндекс.Деньги и др.
                        </p>
                        <p>
                            Приём платежей банковскими картами, электронными деньгами и другими способами
                        </p>
                    </div>
                </div>
                <div className="payment">
                    <div className="payment__img">
                        <img src={o5} alt="" />
                    </div>
                    <div className="payment__text">
                        <h4 className='payment__text__title'>
                            Как оформить рассрочку?
                        </h4>
                        <div style={{marginBottom: "20px", fontSize: "16px", lineHeight: "35px"}}>
                            <ul>
                                <li>1. Положите нужные товары в корзину.</li>
                                <li>2. На странице «Оформление заказа» выберите способ оплаты «Кредит/Рассрочка»*</li>
                                <li>3. Оформить заказ, после чего с вами свяжется менеджер для уточнения информации.</li>
                                <li>4. Заполните онлайн-заявку на сайте и получите решение в течение 5 минут.</li>
                                <li>5. После одобрения заявки с вами свяжется менеджер Почта Банка, для подписанания договора.</li>
                                <li>6. После подписания договора в ближайшем офисе «Почта Банк», мы отправим вам товар.</li>
                                <li>7. Пользуйтесь товарами и погашайте своевременно платежи.</li>
                            </ul>
                        </div>
                        <p>
                            Все товары от 3500 грн. доступны для оформления в рассрочку без первоначального взноса и переплат, сроком на 6 месяцев.
                        </p>
                        <p>
                            *Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam eum aut asperiores sequi expedita aliquam pariatur soluta. Natus nulla maxime aperiam quam consequatur officiis, excepturi, illo rerum dolor pariatur assumenda suscipit cum quaerat nostrum ullam eveniet tempora eligendi eaque iste magnam necessitatibus sint totam! Iure at unde quae est sint!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutOrder;