import React, { useState, useContext, useEffect } from "react";
import DataContext from "../context/pageData";

const Technology = () => {
    const DataCtx = useContext(DataContext);
    const [currentTech, setCurrentTech] = useState();

    useEffect(() => {
        const fetchPageData = async function () {
            try {
                await DataCtx.fetchData();
                setCurrentTech((prevValue) => {
                    return DataCtx.data.data?.technology?.[0] ?? null;
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchPageData();
    }, [DataContext.fetchData]);

    function changeTech(e) {
        console.log(e);
        const techName = e.target.id.toLowerCase();
        const selectedTech = DataCtx.data.data.technology.find(
            (tech) => tech.name.toLowerCase() === techName
        );
        setCurrentTech((prevValue) => selectedTech);
    }
    return (
        <>
            {DataCtx.data.data ? (
                <div className="mt-[1rem] mb-[2rem] lg:ml-[10%] lg:grid lg:grid-rows-[auto_1fr] lg:max-h-[80%] ">
                    <p className="text-sm+ md-text-[28px] tracking-[4.75px] text-center md:px-[3rem] md:text-left lg:px-[0] lg:mt-[0rem]">
                        <span className="text-dark-grey font-[700]">03</span>{" "}
                        SPACE LAUNCH 101
                    </p>
                    <section className="grid justify-stretch mt-[2rem] text-gold gap-y-[1.75rem] grid-rows-[auto_auto_auto] items-center text-center lg:grid-cols-[auto_auto_auto] lg:grid-rows-[1fr] lg:gap-[3rem]">
                        <div className="flex flex-col lg:col-[3/4]">
                            <picture className="w-[100%] justify-self-center self-center lg:portrait">
                                <source
                                    media="(min-width: 64em)"
                                    srcSet={
                                        currentTech
                                            ? currentTech.images.portrait
                                            : DataCtx.data.data.technology[0]
                                                  .images.portrait
                                    }
                                />
                                <img
                                    className="block w-[100%] lg:aspect-[1/.7]"
                                    src={
                                        currentTech
                                            ? currentTech.images.landscape
                                            : DataCtx.data.data.technology[0]
                                                  .images.landscape
                                    }
                                    alt="destination"
                                />
                            </picture>
                        </div>

                        <ul className="flex gap-[1rem] justify-center md:mt-[1rem] lg:flex-col lg:row-[1/2]">
                            {DataCtx.data.data.technology.map((tech, index) => (
                                <li key={tech.name}>
                                    <button
                                        id={tech.name}
                                        className={`min-w-[40px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:text-[24px] lg:h-[80px] border-[1.5px] border-dark-grey text-sm min-h-[40px] flex items-center justify-center rounded-full ${
                                            currentTech
                                                ? currentTech?.name.toLowerCase() ===
                                                  tech.name.toLowerCase()
                                                    ? "bg-gold text-black hover:bg-gold hover:text-black"
                                                    : "bg-transparent text-gold"
                                                : DataCtx?.data?.data?.technology[0].name?.toLowerCase() ===
                                                  tech.name.toLowerCase()
                                                ? "bg-gold text-black hover:bg-gold hover:text-black"
                                                : " bg-transparent text-gold"
                                        } hover:bg-grey hover:text-black transition-bg duration-[.5s]`}
                                        onClick={changeTech}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <article className="text-center flex flex-col gap-[1rem] lg:row-[1/2] lg:text-left">
                            <p className="mt-[1rem] tracking-[.5px] uppercase font-[18px] text-dark-grey font-[100] font-[serif] md:text-sm+">
                                THE TERMINOLOGY...
                            </p>
                            <h1 className="text-center uppercase text-[28px] md:text-[55px] leading-[1] font-serif text-gold lg:text-left">
                                {currentTech
                                    ? currentTech.name
                                    : DataCtx.data.data.technology[0].name}
                            </h1>
                            <p className="text-sm mb-[2rem] text-grey tracking-[1px] px-[2rem] md:max-w-[550px] md:leading-[1.75] md:m-auto lg:px-0 lg:m-0">
                                {currentTech
                                    ? currentTech.description
                                    : DataCtx.data.data.technology[0]
                                          .description}
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

export default Technology;
