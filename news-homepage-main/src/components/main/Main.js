import bannerMobile from "../../images/image-web-3-mobile.jpg";
import bannerLarge from "../../images/image-web-3-desktop.jpg";
import retroImage from "../../images/image-retro-pcs.jpg";
import laptopImage from "../../images/image-top-laptops.jpg";
import gamePadimage from "../../images/image-gaming-growth.jpg";

function Main() {
    return (
        <>
            <main>
                {/* BANNER STARTS */}
                <div className="hero">
                    <picture>
                        <source
                            media="(min-width:32.5em)"
                            srcSet={bannerLarge}
                        />
                        <img src={bannerMobile} alt="banner" />
                    </picture>
                </div>
                {/* BANNER ENDS */}
                <article className="intro">
                    <h1>The Bright Future of Web 3.0?</h1>
                    <p>
                        We dive into the next evolution of the web that claims
                        to put the power of the platforms back into the hands of
                        the people. But is it really fulfillling its promise?
                    </p>
                    <button className="read-more">READ MORE</button>
                </article>
                <section className="new">
                    <h2>New</h2>
                    <article>
                        <a href="./">
                            <h3>Hydrogen VS Electric Cars</h3>
                            <p>
                                Will hydrogen-fueled cars ever catch up to EVs?
                            </p>
                        </a>
                    </article>
                    <hr />
                    <article>
                        <a href="./">
                            <h3>The Downsides of AI Artistry</h3>
                            <p>
                                What are the possible adverse effects of
                                on-demand AI image generation?
                            </p>
                        </a>
                    </article>
                    <hr />
                    <article>
                        <a href="./">
                            <h3>Is VC Funding Drying Up?</h3>
                            <p>
                                Private funding by VC firms is down 50% YOY. We
                                take a look at what that means.
                            </p>
                        </a>
                    </article>
                </section>
                <section className="last-section">
                    <article>
                        <a href="./">
                            <picture>
                                <img src={retroImage} alt="retro" />
                            </picture>
                            <div>
                                <h2>01</h2>
                                <h3>Reviving Retro PCs</h3>
                                <p>
                                    What happens when old PCs are given modern
                                    upgrade?
                                </p>
                            </div>
                        </a>
                    </article>
                    <article>
                        <a href="./">
                            <picture>
                                <img src={laptopImage} alt="laptop" />
                            </picture>
                            <div>
                                <h2>02</h2>
                                <h3>The Growth of Gaming</h3>
                                <p>
                                    How the pandemic has sparked fresh
                                    opportunities.
                                </p>
                            </div>
                        </a>
                    </article>
                    <article>
                        <a href="./">
                            <picture>
                                <img src={gamePadimage} alt="game pad" />
                            </picture>
                            <div>
                                <h2>03</h2>
                                <h3>Reviving Retro PCs</h3>
                                <p>
                                    What happens when old PCs are given modern
                                    upgrade?
                                </p>
                            </div>
                        </a>
                    </article>
                </section>
            </main>
        </>
    );
}

export default Main;
