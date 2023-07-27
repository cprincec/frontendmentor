import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section className="lg:w-[100%] grid grid-rows-[auto_auto_auto_1fr] lg:grid-rows-[repeat(3, auto)] gap-y-[2rem] justify-center items-center  text-center px-[1.5rem] mt-[1rem] min-h-[100%] md:mt-[3rem] lg:gap-0 lg:grid-cols-[60%_40%] lg:justify-start lg:text-left lg:max-w-[80%] lg:mx-auto lg:mt-[7rem]">
            <p className="text-sm+ md-text-[28px] tracking-[2.75px] lg:col-[1/2] lg:tracking-[4.75px]">
                SO, YOU WANT TO TRAVEL TO
            </p>
            <h1 className="text-[95px] leading-[1] font-serif text-gold md:text-[150px] lg:col-[1/2] lg:row-[2/3] lg:leading-[1.2] lg:mt-[.5rem] lg:ml-[-.5rem]">
                SPACE
            </h1>
            <p className="text-sm md:text-[27px] md:px-[8rem] lg:col-[1/2] lg:px-[0] lg:max-w-[460px] lg:row-[3/4] lg:self-start">
                Let’s face it; if you want to go to space, you might as well
                genuinely go to outer space and not hover kind of on the edge of
                it. Well sit back, and relax because we’ll give you a truly out
                of this world experience!
            </p>
            <div className="self-stretch grid items-center justify-center lg:col-[2/3] lg:row-[1/4] lg:self-end">
                <div className="hover:bg-dark-grey rounded-full md:p-[80px_40px] transition-bg duration-[.5s] ease">
                    <Link
                        to="/destination"
                        className="rounded-full border-0 bg-gold p-[60px_30px] md:p-[80px_40px] font-serif text-black text-[1.2em] md:text-[1.75em] "
                    >
                        EXPLORE
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Home;
