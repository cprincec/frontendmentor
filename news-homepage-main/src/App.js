import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Main from "./components/main/Main";

function App() {
    const [displayNav, setDisplayNav] = useState(false);
    const classList = displayNav ? "app hidden" : "app";

    function handleHamburgerClick() {
        setDisplayNav((prevValue) => {
            return prevValue ? false : true;
        });
    }

    // Hide the side nav when user clicks outside it
    function hideSideNave(event) {
        if (displayNav && !event.target.classList.contains("display")) {
            setDisplayNav((prevValue) => {
                prevValue = false;
                return prevValue;
            });
        }
    }

    return (
        <>
            <div className={classList} onClick={hideSideNave}>
                <Header />
                <Navigation
                    handleHamburgerClick={handleHamburgerClick}
                    displayNav={displayNav}
                />
                <Main />
                <Footer />
            </div>
        </>
    );
}

export default App;
