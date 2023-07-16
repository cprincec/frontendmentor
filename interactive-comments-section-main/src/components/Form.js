import image from "../images/avatars/image-juliusomo.jpg";
https://github.com/cprincec/frontendmentor/blob/793ffb2ee2539e4499d299425b325f17917b6026/interactive-comments-section-main/src/images/avatars/image-juliusomo.png
function Form({ user }) {
    return (
        <form className="rounded">
            <textarea placeholder="Add a comment"></textarea>
            <button className="send">Send</button>
            {user && (
                <picture>
                    <img src={image} alt={user.username} />
                </picture>
            )}
        </form>
    );
}

export default Form;
