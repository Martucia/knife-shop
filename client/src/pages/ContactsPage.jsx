import Way from "../components/Way"
import { useEffect } from "react"

const ContactsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <div className="contacts">
            <Way wayUrl="about" way="О нас" />
            <h1 className="title">Связаться с нами</h1>
            <h3>Интернет магазин Златоустовских ножей</h3>
            <div className="contacts__wrapper">
                <Contact title="Наш адрес" array={["456227, г. Златоуст, ул. Шоссейная, д. 7K, офис «2»", "ИП Смирнов Сергей Анатольевич.", "ОГРН ИП: 313740425300045"]} />
                <Contact title="Телефон" array={["+38(097) 156 8495", '+38(056) 778 6455']} />
                <Contact title="Дополнительные контактные данные:" array={["+38(097) 156 8495", '+38(056) 778 6455']} />
                <Contact title="Email" array={["info@zlatmax.ru"]} />
                <Contact title="График работы" array={["Пн-Пт: 7:00 - 16:00 МСК"]} />
            </div>
        </div>
    );
}

const Contact = (props) => {
    return (
        <div className="contact-block">
            <div className="contact-block__circle">
                !
            </div>
            <h4>{props.title}</h4>
            {props.array.map(info => <p>
                {info}
            </p>)}
        </div>
    )
}

export default ContactsPage;