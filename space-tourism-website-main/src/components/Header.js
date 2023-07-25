import logo from "../assets/shared/logo.svg";
import closeIcon from "../assets/shared/icon-close.svg";
import ham from "../assets/shared/icon-hamburger.svg";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import NavContext from "../context/nav";

const Header = () => {
    const NavCtx = useContext(NavContext);

    const StyleActiveLink = ({ isActive }) => {
        return isActive ? { borderRight: "4px solid #D0D6F9" } : undefined;
    };

    return (
        <header className="text-gold grid grid-flow-col px-6 py-4 overflow-hidden ">
            <picture className="max-w-[40px]">
                <img className="w-full" src={logo} alt="logo" />
            </picture>
            <button
                className={`justify-self-end hover:scale-[1.1] ${
                    NavCtx.showNav && "hidden"
                }`}
                onClick={() => {
                    NavCtx.toggleNav();
                }}
            >
                <img src={ham} alt="hamburger" />
            </button>
            {NavCtx.showNav && (
                <nav
                    className={`backdrop-blur-[25px] ${
                        NavCtx.showNav ? " grid animation-slide-in" : "hidden"
                    }  
                grid-rows-[45px_92%] gap-y-[1.5rem] w-[70%] absolute right-0 top-0 min-h-[100vh] z-[0]
                    py-4`}
                >
                    <button
                        className="justify-self-end align-self-center pr-6 align-self-start z-[1] hover:scale-[1.1]"
                        onClick={() => {
                            NavCtx.toggleNav();
                        }}
                    >
                        <img src={closeIcon} alt="hamburger" />
                    </button>
                    <ul className="grid content-start gap-y-[1.3rem]">
                        <li>
                            <NavLink
                                to="/"
                                style={StyleActiveLink}
                                className={`
                                block hover:border-r-4 uppercase tracking-[2.7px] text-[16px] px-[2rem] py-[.2rem] space-[3.7]`}
                                onClick={NavCtx.toggleNav}
                                end
                            >
                                <span className="font-bold">00</span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/destination"
                                style={StyleActiveLink}
                                className="block hover:border-r-4 uppercase tracking-[2.7px] text-[16px] px-[2rem] py-[.2rem]"
                                onClick={NavCtx.toggleNav}
                                end
                            >
                                <span className="font-bold">01</span>{" "}
                                Destination
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/crew"
                                style={StyleActiveLink}
                                className="block hover:border-r-4 uppercase tracking-[2.7px] text-[16px] px-[2rem] py-[.2rem]"
                                onClick={NavCtx.toggleNav}
                                end
                            >
                                <span className="font-bold">02</span> Crew
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/technology"
                                style={StyleActiveLink}
                                className="block hover:border-r-4 uppercase tracking-[2.7px] text-[16px] px-[2rem] py-[.2rem]"
                                onClick={NavCtx.toggleNav}
                                end
                            >
                                <span className="font-bold">03</span> Technology
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
