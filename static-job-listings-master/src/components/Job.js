function Job({ data }) {
    return (
        <section id={data.id}>
            <div>
                <picture>
                    <img src={data.logo} alt={data.company} />
                </picture>
                <h2>{data.company}</h2>
                {data.new && <span className="new">New!</span>}
                {data.featured && <span className="new">Featured</span>}
            </div>
            <h3>{data.position}</h3>
            <div className="info">
                <span>{data.postedAt}</span>
                <span>{data.contract}</span>
                <span>{data.location}</span>
            </div>
            <hr />
            <div className="details">
                <button>{data.role}</button>
                <button>{data.level}</button>
                {data.languages &&
                    data.languages.map((language) => (
                        <button>{language}</button>
                    ))}
                <div>
                    {data.tools &&
                        data.tools.map((tool) => {
                            console.log(tool);
                            return <button>here</button>;
                        })}
                </div>
            </div>
        </section>
    );
}

export default Job;
