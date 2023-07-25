import React, { useState, useContext, useEffect } from "react";
import DataContext from "../context/pageData";
import { NavLink } from "react-router-dom";

const Destination = () => {
    const DataCtx = useContext(DataContext);
    const [currentDestination, setCurrentDestination] = useState();

    useEffect(() => {
        const fetchPageData = async function () {
            try {
                await DataCtx.fetchData();
                setCurrentDestination((prevValue) => {
                    return DataCtx.data.data?.destinations?.[0] ?? null;
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchPageData();
    }, [DataContext.fetchData]);

    function changeDestination(e) {
        const destinationName = e.target.textContent.toLowerCase();
        const selectedDestination = DataCtx.data.data.destinations.find(
            (dest) => dest.name.toLowerCase() === destinationName
        );
        setCurrentDestination((prevValue) => selectedDestination);
    }

    return (
        <>
            {DataCtx.data.data ? (
                <div className="mt-[1rem] mb-[2rem]">
                    <p className="text-sm+ md-text-[28px] tracking-[4.75px] text-center ">
                        <span className="text-dark-grey font-[700]">01</span>{" "}
                        PICK YOUR DESTINATION
                    </p>
                    <section className="grid justify-center mt-[2rem] text-gold grid gap-y-[1.75rem] grid-rows-[auto_auto_auto] justify-center items-center text-center">
                        <picture className="max-w-[200px] justify-self-center">
                            <img
                                className="block w-[100%]"
                                src={
                                    currentDestination
                                        ? currentDestination.images.png
                                        : DataCtx.data.data.destinations[0]
                                              .images.png
                                }
                                alt="destination"
                            />
                        </picture>
                        <ul className="flex gap-[1rem] justify-center">
                            {DataCtx.data.data.destinations.map((dest) => (
                                <li key={dest.name}>
                                    <button
                                        className={`uppercase pb-[.3rem] text-sm tracking-[2.7px] ${
                                            // currentDestination?.name.toLowerCase() ===

                                            currentDestination
                                                ? currentDestination?.name.toLowerCase() ===
                                                  dest.name.toLowerCase()
                                                    ? "border-b-4 text-gold"
                                                    : " text-grey"
                                                : DataCtx?.data?.data?.destinations[0].name?.toLowerCase() ===
                                                  dest.name.toLowerCase()
                                                ? "border-b-4 border-b-[linear-gradient(to right, transparent, gold, transparent)] text-gold"
                                                : " text-grey"
                                        }`}
                                        onClick={changeDestination}
                                    >
                                        {dest.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <article className="text-center flex flex-col gap-[1rem] ">
                            <h1 className="text-center uppercase text-[60px] md:text-[150px] leading-[1] font-serif text-gold ">
                                {currentDestination
                                    ? currentDestination.name
                                    : DataCtx.data.data.destinations[0]
                                          .name}{" "}
                            </h1>
                            <p className="text-sm mt-[-.5rem] text-grey tracking-[1px] px-[2rem]">
                                {currentDestination
                                    ? currentDestination.description
                                    : DataCtx.data.data.destinations[0]
                                          .description}
                            </p>
                            <hr className="my-[1rem] text-dark-grey mx-[1.5rem]" />
                            <div>
                                <h2 className="tracking-[2.5px] text-grey">
                                    AVG. DISTANCE
                                </h2>
                                <h3 className="font-serif uppercase text-[28px] text-gold">
                                    {currentDestination
                                        ? currentDestination.distance
                                        : DataCtx.data.data.destinations[0]
                                              .distance}
                                </h3>
                            </div>
                            <div className="mt-[1rem]">
                                <h2 className="tracking-[2.5px] text-grey">
                                    EST. TRAVEL TIME
                                </h2>
                                <h3 className="font-serif uppercase text-[28px]  text-gold">
                                    {currentDestination
                                        ? currentDestination.travel
                                        : DataCtx.data.data.destinations[0]
                                              .travel}
                                </h3>
                            </div>
                        </article>
                    </section>
                </div>
            ) : (
                <p>...Loading</p>
            )}
        </>
    );
};

export default Destination;
