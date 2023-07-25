import Header from "../components/Header";
const Home = () => {
    return (
        <div className="App z-[0] text-grey flex flex-col">
            <Header />
            <main className="flex-1 flex">
                <section className="grid grid-rows-[auto_auto_auto_1fr] gap-y-[2rem] justify-center items-center  text-center px-[1.5rem] mt-[3rem] min-h-[100%]">
                    <p className="text-[14px] md-text-[28px] tracking-[4.75px]">
                        SO, YOU WANT TO TRAVEL TO
                    </p>
                    <h1 className="text-[80px] md:text-[150px] leading-[1] font-serif text-gold ">
                        SPACE
                    </h1>
                    <p>
                        Let’s face it; if you want to go to space, you might as
                        well genuinely go to outer space and not hover kind of
                        on the edge of it. Well sit back, and relax because
                        we’ll give you a truly out of this world experience!
                    </p>
                    <div className="self-stretch grid items-center justify-center">
                        <div className="hover:bg-dark-grey rounded-full p-[2rem] transition-bg duration-[.5s] ease">
                            <button className="rounded-full border-0 bg-gold w-[130px] h-[130px] font-serif text-black text-[1.2em] ">
                                EXPLORE
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
