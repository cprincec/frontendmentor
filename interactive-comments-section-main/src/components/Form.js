import image from "../images/avatars/image-juliusomo.png";

function Form({ user }) {
    console.log(user);
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
