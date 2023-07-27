import Header from "./Header";
import NavContext from "../context/nav";
import DataContext from "../context/pageData";
import { useState, useReducer, useCallback, useEffect } from "react";

const initialDataFetchState = {
    data: null,
    isLoading: false,
};

function dataFetchReducer(state, action) {
    if (action.type === "fetch_start") {
        return {
            ...state,
            isLoading: state.data ? false : true,
        };
    }

    if (action.type === "fetch_success") {
        return {
            data: action.payload,
            isLoading: false,
        };
    }
    return initialDataFetchState;
}

const Layout = ({ children }) => {
    const [showNav, setShowNav] = useState();
    const [pageData, dispatch] = useReducer(
        dataFetchReducer,
        initialDataFetchState
    );

    //context value for state of the side nav
    const navCxtValue = {
        showNav: showNav,
        toggleNav: toggleNav,
    };

    function toggleNav() {
        setShowNav((prev) => !prev);
    }

    const fetchPageData = useCallback(async function fetchData() {
        dispatch({ type: "fetch_start" });
        try {
            const response = await fetch("data.json");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            dispatch({ type: "fetch_success", payload: data });
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchPageData();
    }, [fetchPageData]);

    // Context value for page data
    const dataCtxValue = {
        data: pageData,
        fetchData: fetchPageData,
    };

    return (
        <>
            <div
                className={`App z-[0] text-grey flex flex-col relative ${
                    window.location.href.includes("destination")
                        ? "bg-[url('../assets/destination/background-destination-mobile.jpg')]"
                        : window.location.href.includes("crew")
                        ? "bg-[url('../assets/crew/background-crew-mobile.jpg')]"
                        : window.location.href.includes("technology")
                        ? "bg-[url('../assets/technology/background-technology-mobile.jpg')]"
                        : "bg-[url('../assets/home/background-home-mobile.jpg')]"
                }${
                    window.location.href.includes("destination")
                        ? " md:bg-[url('../assets/destination/background-destination-tablet.jpg')]"
                        : window.location.href.includes("crew")
                        ? " md:bg-[url('../assets/crew/background-crew-tablet.jpg')]"
                        : window.location.href.includes("technology")
                        ? " md:bg-[url('../assets/technology/background-technology-tablet.jpg')]"
                        : " md:bg-[url('../assets/home/background-home-tablet.jpg')]"
                } ${
                    window.location.href.includes("destination")
                        ? "lg:bg-[url('../assets/destination/background-destination-desktop.jpg')]"
                        : window.location.href.includes("crew")
                        ? "lg:bg-[url('../assets/crew/background-crew-desktop.jpg')]"
                        : window.location.href.includes("technology")
                        ? "lg:bg-[url('../assets/technology/background-technology-desktop.jpg')]"
                        : "lg:bg-[url('../assets/home/background-home-desktop.jpg')]"
                }`}
            >
                <NavContext.Provider value={navCxtValue}>
                    <Header />
                </NavContext.Provider>

                <DataContext.Provider value={dataCtxValue}>
                    <main
                        onClick={() => {
                            showNav && toggleNav();
                        }}
                        className="flex-1 grid"
                    >
                        {children}
                    </main>
                </DataContext.Provider>
            </div>
        </>
    );
};

export default Layout;
