import HeaderBottom from "./HeaderBottom";
import HeaderCenter from "./HeaderCenter";
import HeaderTop from "./HeaderTop";

const Header = (props) => {
    return (
        <header className="header">
            <HeaderTop setOpen={props.setOpen} />
            <HeaderCenter openBasket={props.openBasket} />
            <HeaderBottom />
        </header>
    );
}

export default Header;