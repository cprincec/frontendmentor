import React, { useState, useContext, useEffect } from "react";
import DataContext from "../context/pageData";

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
                <div className="mt-[1rem] mb-[2rem] lg:max-w-[80%] lg:mx-auto lg:mt-[2rem] lg:w-[100%]">
                    <p className="text-sm+ md-text-[28px] tracking-[4.75px] text-center md:text-start md:py-[1rem] md:px-[3rem] text-gold">
                        <span className="text-grey opacity-50 font-[900]">
                            01
                        </span>{" "}
                        PICK YOUR DESTINATION
                    </p>
                    <section className="grid justify-center mt-[2rem] text-gold grid gap-y-[1.75rem] grid-rows-[auto_auto_auto] justify-center items-center text-center lg:grid-cols-[1fr_1fr] lg:rows-[auto_auto] lg:justify-items-start">
                        <picture className="max-w-[200px] justify-self-center md:max-w-[250px] md:mb-[1rem] lg:col-[1/2] lg:row-[1/3] lg:max-w-[350px]">
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
                        <ul className="flex gap-[1rem] justify-center lg:col-[2/3] lg:row-[1/2] ">
                            {DataCtx.data.data.destinations.map((dest) => (
                                <li key={dest.name}>
                                    <button
                                        className={`uppercase pb-[.3rem] text-sm tracking-[2.7px] ${
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
                        <article className="text-center flex flex-col gap-[1rem] md:grid md:rows-[auto_auto_auto-auto] md:cols-[1fr 1fr] lg:col-[2/3] lg:-row-[2/3] lg:justify-items-start lg:justify-start lg:text-left">
                            <h1 className="text-center uppercase text-[50px] leading-[1] font-serif text-gold md:text-[100px] md:row[1/2] md:col-[1/3] lg:ml-[-.5rem]">
                                {currentDestination
                                    ? currentDestination.name
                                    : DataCtx.data.data.destinations[0]
                                          .name}{" "}
                            </h1>
                            <p className="text-sm mt-[-.5rem] text-grey tracking-[1px] px-[2rem] md:px-[5rem] md:mt-[0] md:col-[1/3] md:row-[2/3] lg:p-[0] lg:max-w-[450px]">
                                {currentDestination
                                    ? currentDestination.description
                                    : DataCtx.data.data.destinations[0]
                                          .description}
                            </p>
                            <hr className="my-[1rem] text-dark-grey mx-[1.5rem] md:mx-[5rem] md:col-[1/3] " />
                            <div className="md:row-[4/5] md:justify-self-end md:self-center md:mr-[2rem] lg:justify-self-start">
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
                            <div className="mt-[1rem] md:row-[4/5] md:justify-self-start self-center md:mt-[0] md:ml-[2rem] lg:justify-self-start lg:ml-[0]">
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
