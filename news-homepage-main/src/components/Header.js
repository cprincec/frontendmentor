import logo from "../images/logo.svg";
function Header() {
    return (
        <header>
            <picture>
                <img src={logo} alt="logo" />
            </picture>
        </header>
    );
}

export default Header;
