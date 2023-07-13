import menuIcon from "../images/icon-menu.svg";
import closeMenuIcon from "../images/icon-menu-close.svg";

function Navigation({ displayNav, handleHamburgerClick }) {
    // console.log(displayNav, handleHamburgerClick);

    const navItems = ["Home", "New", "Popular", "Trending", "Categories"];
    const navClass = displayNav ? "display" : null;
    const hamburgerIcon = displayNav ? closeMenuIcon : menuIcon;

    return (
        <nav className={navClass}>
            <button className="hamburger" onClick={handleHamburgerClick}>
                <img src={hamburgerIcon} alt="Logo" />
            </button>
            <ul>
                {navItems.map((item) => (
                    <li key={item.toLowerCase()}>
                        <a href="./">{item}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navigation;
