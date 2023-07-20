import { useEffect } from "react";
function Form({
    currentUser,
    addComment,
    textAreaRef,
    formText,
    updateFormHandler,
    userReplyingTo,
    isReplying,
}) {
    useEffect(() => {
        if (isReplying) {
            // Focus on the textarea when isReplying is true
            textAreaRef.current.focus();
        }
    }, [isReplying]);
    return (
        <form className="rounded" onSubmit={addComment} noValidate>
            <textarea
                required
                ref={textAreaRef}
                placeholder="Add a comment..."
                onChange={updateFormHandler}
                value={formText}
            ></textarea>
            <button className="send">
                {userReplyingTo ? "Reply" : "Send"}
            </button>
            {currentUser && (
                <picture>
                    <img
                        src={currentUser.image.png}
                        alt={currentUser.username}
                    />
                </picture>
            )}
        </form>
    );
}

export default Form;
