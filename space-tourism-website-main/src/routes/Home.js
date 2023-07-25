const Home = () => {
    return (
        <section className="grid grid-rows-[auto_auto_auto_1fr] gap-y-[2rem] justify-center items-center  text-center px-[1.5rem] mt-[1rem] min-h-[100%]">
            <p className="text-sm+ md-text-[28px] tracking-[2.75px]">
                SO, YOU WANT TO TRAVEL TO
            </p>
            <h1 className="text-[95px] md:text-[150px] leading-[1] font-serif text-gold ">
                SPACE
            </h1>
            <p className="text-sm">
                Let’s face it; if you want to go to space, you might as well
                genuinely go to outer space and not hover kind of on the edge of
                it. Well sit back, and relax because we’ll give you a truly out
                of this world experience!
            </p>
            <div className="self-stretch grid items-center justify-center mt-[2rem]">
                <div className="hover:bg-dark-grey rounded-full p-[2rem] transition-bg duration-[.5s] ease">
                    <button className="rounded-full border-0 bg-gold w-[130px] h-[130px] font-serif text-black text-[1.2em] ">
                        EXPLORE
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Home;
