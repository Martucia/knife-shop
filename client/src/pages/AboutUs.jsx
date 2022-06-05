import img from "../images/about-us.jpg"
import { useEffect } from "react"
import d1 from "../images/d1.png"
import d2 from "../images/d2.png"
import d3 from "../images/d3.png"
import d4 from "../images/d4.png"
import s1 from "../images/s1.jpg"
import s2 from "../images/s6.jpg"
import s3 from "../images/s3.jpg"
import s4 from "../images/s4.jpg"
import s5 from "../images/s5.jpg"
import Way from "../components/Way"

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <div className="about-us">
            <Way wayUrl="about" way="О нас" />
            <h1>Немного истории</h1>
            <div className="about-us__block">
                <div className="about-us__block__img">
                    <img src={img} alt="" />
                </div>
                <div className="about-us__block__text">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem eveniet alias fugiat accusamus doloribus assumenda mollitia deleniti dolorem. Voluptatibus veritatis natus quasi rem. Totam excepturi labore asperiores cumque eveniet in ea corrupti, omnis possimus aliquam vitae consequatur explicabo autem dicta earum dolor optio, similique, maxime illum veniam ab? Labore sapiente explicabo, ad pariatur dolorum vero vitae saepe illo dolor voluptas quas odio corrupti ducimus magnam. Dolore iure culpa modi explicabo? Culpa at harum aspernatur nisi placeat laborum, laudantium enim, eos neque modi nulla tempora, dignissimos dolores impedit accusamus illo quam velit! Eos eius pariatur cupiditate accusamus animi aspernatur temporibus magnam voluptatem ullam. Vero libero distinctio accusamus esse id doloremque rerum, harum consequatur, alias ea nobis laboriosam modi ut. Odit illo quia reprehenderit facilis! Nobis, atque ipsam sint tempore doloremque ut dolores libero non asperiores dignissimos animi deserunt minus ullam beatae omnis quod consectetur neque earum fugiat expedita dolorum praesentium veniam? Consectetur accusamus inventore molestiae nihil itaque provident non! Cum?
                </div>
            </div>
            <div className="about-us__dignity">
                <div className="dignity">
                    <div className="dignity__img">
                        <img src={d1} alt="" />
                    </div>
                    <div className="dignity__text">
                        Доставка заказа от 2х дней
                    </div>
                </div>
                <div className="dignity">
                    <div className="dignity__img">
                        <img src={d2} alt="" />
                    </div>
                    <div className="dignity__text">
                        Доставка курьером до двери
                    </div>
                </div>
                <div className="dignity">
                    <div className="dignity__img">
                        <img src={d3} alt="" />
                    </div>
                    <div className="dignity__text">
                        Оплата заказа при получении
                    </div>
                </div>
                <div className="dignity">
                    <div className="dignity__img">
                        <img src={d4} alt="" />
                    </div>
                    <div className="dignity__text">
                        Вся продукция сертифицирована
                    </div>
                </div>
            </div>
            <div className="about-us__staff">
                <h2>Директор нашего магазина:</h2>
                <div className="about-us__staff__wrapper">
                    <div className="about-us__staff__wrapper__photo">
                        <img src={s2} alt="" />
                    </div>
                    <div className="about-us__staff__wrapper__info">
                        <h3>Шлапак Марта</h3>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, unde.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non quae tempore culpa eaque rem. Fugit explicabo odit distinctio fugiat quos!</p>
                        <p>Email: <a href="/">imarta.shlapak@gmail.com</a></p>
                        <p>Телефон: <a href="/">+38(097)140-79-38</a></p>
                    </div>
                </div>
                <div className="about-us__staff__list">
                    <div className="employee">
                        <div className="employee__img">
                            <img src={s1} alt="" />
                        </div>
                        <div className="employee__name">
                            Максимилиан Аграр
                        </div>
                        <div className="employee__position">
                            Массажист директора
                        </div>
                    </div>
                    <div className="employee">
                        <div className="employee__img">
                            <img src={s4} alt="" />
                        </div>
                        <div className="employee__name">
                            Дидимус Роспишнский
                        </div>
                        <div className="employee__position">
                            Водитель
                        </div>
                    </div>
                    <div className="employee">
                        <div className="employee__img">
                            <img src={s3} alt="" />
                        </div>
                        <div className="employee__name">
                            Вадимка Стрипатский
                        </div>
                        <div className="employee__position">
                            Охрана
                        </div>
                    </div>
                    <div className="employee">
                        <div className="employee__img">
                            <img src={s5} alt="" />
                        </div>
                        <div className="employee__name">
                            Ростимилямус Угундариус
                        </div>
                        <div className="employee__position">
                            Зять
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AboutUs;