import "../css/comment.module.css";
import binIcon from "../images/icon-delete.svg";
import editIcon from "../images/icon-edit.svg";
import backArrow from "../images/icon-reply.svg";
import minusIcon from "../images/icon-minus.svg";
import plusIcon from "../images/icon-plus.svg";
import { formatDistanceToNow } from "date-fns";
import Reply from "./Reply";
import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import Form from "./Form";
function Comments({
    currentUser,
    commentList,
    setCommentList,
    confirmDelete,
    voteComment,
}) {
    const [isReplying, setIsReplying] = useState(false);
    const [userReplyingTo, setUserReplyingTo] = useState("");
    const [commentReplyingTo, setCommentReplyingTo] = useState({});
    const [replyFormText, setReplyFormText] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateFormText, setUpdateFormText] = useState("");
    const editBtnRef = useRef(null); // Ref to keep track of the edit button

    useEffect(() => {
        setReplyFormText(userReplyingTo);
    }, [isReplying]);

    const commentFormRef = useRef();

    function addReply(event) {
        event.preventDefault();
        let reply = replyFormText.replace(userReplyingTo.trim(), "");
        reply = reply.trim();
        if (reply === "") {
            setDialogContent(
                <>
                    <div className="backdrop"></div>
                    <dialog className="dialog" open>
                        <h3>Invalid reply!</h3>
                        <p>
                            You cannot post an empty reply. Add a reply and send
                        </p>
                        <button onClick={closeDialog}>Okay</button>
                    </dialog>
                </>
            );
            setShowDialog(true);
            return;
        }
        function findMaxId(replies) {
            let max = 0;
            console.log(replies);
            for (let reply of replies) {
                if (reply.id > max) max = reply.id;
            }
            console.log(max);
            return max;
        }

        const newReply = {
            content: reply,
            createdAt: new Date(),
            id: findMaxId(commentReplyingTo.replies) + 1,
            replyingTo: userReplyingTo.replace("@", ""),
            score: 0,
            user: {
                image: {
                    png: `./images/avatars/image-${currentUser.username}.png`,
                    webp: `./images/avatars/image-${currentUser.username}.webp`,
                },
                username: currentUser.username,
            },
        };

        resetForm();

        setCommentReplyingTo((prevValue) => ({
            ...prevValue,
            replies: [...prevValue.replies, newReply],
        }));

        setCommentList((prevValue) => {
            const updatedComments = prevValue.map((comment) => {
                if (comment.id === commentReplyingTo.id) {
                    return {
                        ...comment,
                        replies: [newReply, ...comment.replies],
                    };
                }
                return comment;
            });
            localStorage.setItem(
                "commentsData",
                JSON.stringify(updatedComments)
            );
            return updatedComments;
        });
    }

    function closeDialog() {
        setShowDialog(false);
    }

    function replyToComment(comment) {
        setIsReplying((prevValue) => !prevValue);
        setCommentReplyingTo(comment);
        const username = `@${comment.user.username} `;
        setUserReplyingTo(username);
    }

    function updateFormHandler(event, formType) {
        if (formType === "update") {
            setUpdateFormText(event.target.value);
        } else {
            setReplyFormText(event.target.value);
        }
    }
    function resetForm() {
        setReplyFormText("");
        setIsReplying((prevValue) => (prevValue = !prevValue));
    }

    function formatTimeAgo(date) {
        let distance;
        try {
            distance = formatDistanceToNow(new Date(date), {
                addSuffix: true,
            });
        } catch (error) {
            return date;
        }

        if (distance === "less than a minute ago") {
            return "just now";
        } else if (distance.includes("about")) {
            distance = distance.replace("about", "");
        }

        // Extract the number of minutes from the distance string
        const minutes = parseInt(distance, 10);

        // Determine whether to use "min" or "mins" based on the number of minutes
        const unit = minutes === 1 ? "min" : "mins";

        // Replace the number in the distance string with the updated unit
        return distance.replace(/^\d+/, minutes).replace(/minutes?/, unit);
    }

    function startCommentUpdate(comment) {
        if (editBtnRef.current !== comment.id) {
            setIsUpdating(true);
        } else {
            setIsUpdating((prevValue) => !prevValue);
        }
        setUpdateFormText(comment.content);
        editBtnRef.current = comment.id;
    }

    function updateComment(e, comment) {
        e.preventDefault();
        console.log(comment);

        const newObject = {
            ...comment,
            content: updateFormText,
        };
        setCommentList((prevValue) => {
            const updatedList = prevValue.map((c) =>
                c.id === comment.id ? newObject : c
            );
            localStorage.setItem("commentsData", JSON.stringify(updatedList));
            return updatedList;
        });
        setIsUpdating(false);
    }

    return (
        <ul className="comments-container">
            {commentList.map((comment) => (
                <li key={comment.id} id={comment.id} className="comment">
                    <section
                        className={`${
                            comment.user.username === currentUser.username &&
                            "user-single-comment"
                        } single-comment rounded`}
                    >
                        <picture>
                            <img
                                src={comment.user.image.png}
                                alt={comment.user.username}
                            />
                        </picture>
                        <h2>{comment.user.username}</h2>
                        <div className="you-at">
                            {currentUser.username === comment.user.username && (
                                <span className="you">you</span>
                            )}
                            <span className="created-at">
                                {comment.user.username !== currentUser.username
                                    ? comment.createdAt
                                    : formatTimeAgo(comment.createdAt)}
                            </span>
                        </div>
                        {isUpdating && comment.id === editBtnRef.current ? (
                            <form
                                className="update-form"
                                onSubmit={(e) => {
                                    updateComment(e, comment);
                                }}
                            >
                                <textarea
                                    className="update-text"
                                    value={updateFormText}
                                    onChange={(e) => {
                                        updateFormHandler(e, "update");
                                    }}
                                ></textarea>
                                <button>Update</button>
                            </form>
                        ) : (
                            <p className="main-comment">{comment.content}</p>
                        )}
                        <div className="votes">
                            {comment.user.username !== currentUser.username ? (
                                <button
                                    onClick={voteComment.bind(null, comment.id)}
                                >
                                    <img src={plusIcon} alt="minus icon" />
                                </button>
                            ) : (
                                <button>
                                    <img src={plusIcon} alt="minus icon" />
                                </button>
                            )}
                            <span>{comment.score}</span>

                            {comment.user.username !== currentUser.username ? (
                                <button
                                    onClick={voteComment.bind(
                                        null,
                                        comment.id,
                                        false
                                    )}
                                >
                                    <img src={minusIcon} alt="minus icon" />
                                </button>
                            ) : (
                                <button>
                                    <img src={minusIcon} alt="minus icon" />
                                </button>
                            )}
                        </div>

                        {currentUser.username === comment.user.username ? (
                            <div className="delete-edit">
                                <button
                                    className="delete"
                                    onClick={confirmDelete.bind(
                                        null,
                                        comment.id
                                    )}
                                >
                                    <img src={binIcon} alt="delete" />
                                    Delete
                                </button>
                                <button
                                    className="edit"
                                    onClick={startCommentUpdate.bind(
                                        null,
                                        comment
                                    )}
                                    id={comment.id}
                                    ref={editBtnRef}
                                >
                                    <img src={editIcon} alt="edit" />
                                    Edit
                                </button>
                            </div>
                        ) : (
                            <button
                                className="reply-btn"
                                onClick={replyToComment.bind(null, comment)}
                            >
                                <img src={backArrow} alt="reply icon" />
                                Reply
                            </button>
                        )}
                    </section>
                    {isReplying &&
                    comment.user.username ===
                        userReplyingTo.trim().substring(1) ? (
                        <Form
                            currentUser={currentUser}
                            addComment={addReply}
                            textAreaRef={commentFormRef}
                            updateFormHandler={updateFormHandler}
                            formText={replyFormText}
                            userReplyingTo={userReplyingTo}
                            isReplying={isReplying}
                        />
                    ) : null}
                    {comment.replies.length > 0 && (
                        <Reply
                            formatTimeAgo={formatTimeAgo}
                            currentUser={currentUser}
                            comment={comment}
                            commentList={commentList}
                            setCommentList={setCommentList}
                        />
                    )}
                </li>
            ))}
            {showDialog &&
                createPortal(
                    <div>{dialogContent}</div>,
                    document.getElementById("dialogs")
                )}
        </ul>
    );
}

export default Comments;
