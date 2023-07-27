import React, { useState, useContext, useEffect } from "react";
import DataContext from "../context/pageData";

const Crew = () => {
    const DataCtx = useContext(DataContext);
    const [currentCrew, setCurrentCrew] = useState();

    useEffect(() => {
        const fetchPageData = async function () {
            try {
                await DataCtx.fetchData();
                setCurrentCrew((prevValue) => {
                    return DataCtx.data.data?.crew?.[0] ?? null;
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchPageData();
    }, [DataContext.fetchData]);

    function changeCrew(e) {
        console.log(e);
        const crewName = e.target.id.toLowerCase();
        const selectedCrew = DataCtx.data.data.crew.find(
            (member) => member.name.toLowerCase() === crewName
        );
        setCurrentCrew((prevValue) => selectedCrew);
    }
    return (
        <>
            {DataCtx.data.data ? (
                <div className="mt-[1rem] mb-[2rem] md:mb-[0] md:grid lg:grid-rows-[auto_1fr] lg:w-[75%] lg:mx-auto">
                    <p className="text-sm+ md-text-[28px] tracking-[4.75px] text-center text-gold md:text-left md:px-[3rem] lg:text-left lg:px-0 lg:mt-[3rem]">
                        <span className="text-grey opacity-50 font-[900]">
                            02
                        </span>{" "}
                        PICK YOUR CREW
                    </p>
                    <section className="grid justify-center mt-[2rem] text-gold gap-y-[1.75rem] grid-rows-[auto_auto_auto] items-center text-center md:grid-rows-[auto_auto_1fr] md:items-end lg:grid-rows-[3fr_1fr] lg:grid-cols-[1fr_1fr] lg:mt-0">
                        <div className="flex flex-col md:row-[3/4] lg:col-[2/3] lg:row-[1/4]">
                            <picture className="max-w-[180px] justify-self-center self-center md:max-w-[400px] lg:max-w-[450px]">
                                <img
                                    className="block w-[100%]"
                                    src={
                                        currentCrew
                                            ? currentCrew.images.png
                                            : DataCtx.data.data.crew[0].images
                                                  .png
                                    }
                                    alt="destination"
                                />
                            </picture>
                            <hr className="mb-[1rem] text-dark-grey mx-[1.5rem] md:hidden" />
                        </div>

                        <ul className="flex gap-[1rem] justify-center md:row-[2/3] lg:justify-start lg:row-[2/3] lg:self-center">
                            {DataCtx.data.data.crew.map((mem) => (
                                <li
                                    key={mem.name}
                                    id={mem.name}
                                    className={`p-[.4rem] rounded-full ${
                                        currentCrew
                                            ? currentCrew?.name.toLowerCase() ===
                                              mem.name.toLowerCase()
                                                ? "bg-grey"
                                                : "bg-dark-grey"
                                            : DataCtx?.data?.data?.crew[0].name?.toLowerCase() ===
                                              mem.name.toLowerCase()
                                            ? "bg-grey"
                                            : " bg-dark-grey"
                                    } cursor-pointer`}
                                    onClick={changeCrew}
                                ></li>
                            ))}
                        </ul>

                        <article className="text-center flex flex-col gap-[1rem] lg:text-left">
                            <p className="mt-[1rem] tracking-[.5px] uppercase font-sm text-grey opacity-70 font-[100] font-[serif] md:text-[28px]">
                                {currentCrew
                                    ? currentCrew.role
                                    : DataCtx.data.data.crew[0].role}
                            </p>
                            <h1 className="text-center uppercase text-[28px] md:text-[55px] leading-[1] font-serif text-gold lg:text-left">
                                {currentCrew
                                    ? currentCrew.name
                                    : DataCtx.data.data.crew[0].name}
                            </h1>
                            <p className="text-sm mb-[2rem] text-grey tracking-[1px] px-[2rem] md:max-w-[550px] md:leading-[1.75] lg:text-left lg:px-[0]">
                                {currentCrew
                                    ? currentCrew.bio
                                    : DataCtx.data.data.crew[0].bio}
                            </p>
                        </article>
                    </section>
                </div>
            ) : (
                <p>...Loading</p>
            )}
        </>
    );
};

export default Crew;
