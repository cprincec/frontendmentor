import "../css/comment.module.css";
import binIcon from "../images/icon-delete.svg";
import editIcon from "../images/icon-edit.svg";
import backArrow from "../images/icon-reply.svg";
import minusIcon from "../images/icon-minus.svg";
import plusIcon from "../images/icon-plus.svg";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Form from "./Form";

function Reply({
    currentUser,
    formatTimeAgo,
    comment,
    commentList,
    setCommentList,
}) {
    const [isReplying, setIsReplying] = useState(false);
    const [usernameReplyingTo, setUsernameReplyingTo] = useState("");
    const [replyReplyingTo, setReplyReplyingTo] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateFormText, setUpdateFormText] = useState("");
    const [replyFormText, setReplyFormText] = useState("");

    const editBtnRef = useRef(null); // Ref to keep track of the edit button
    const replyFormRef = useRef();
    let activeComment;
    let activeReply;

    useEffect(() => {
        setReplyFormText(usernameReplyingTo);
        // commentF.current.focus();
    }, [isReplying]);

    function replyToReply(reply) {
        setIsReplying((prevValue) => !prevValue);
        setReplyReplyingTo(reply);
        const username = `@${reply.user.username} `;
        setUsernameReplyingTo(username);
    }

    function confirmDelete(comment, reply) {
        console.log(comment, reply);
        setDialogContent(
            <>
                <div className="backdrop"></div>
                <dialog className="dialog" open>
                    <h3>Delete comment</h3>
                    <p>
                        Are you sure you want to delete this comment? This will
                        remove the comment and can't be undone.
                    </p>
                    <div>
                        <button className="cancel" onClick={closeDialog}>
                            No, cancel
                        </button>
                        <button
                            onClick={() => {
                                activeComment = comment;
                                activeReply = reply;
                                deleteReply();
                                closeDialog();
                            }}
                        >
                            Yes, delete
                        </button>
                    </div>
                </dialog>
            </>
        );
        setShowDialog(true);
        return;
    }

    function deleteReply() {
        const updatedReplies = activeComment.replies.filter((item) => {
            return item.id !== activeReply.id;
        });
        let u = { ...comment, replies: updatedReplies };
        setCommentList((prevValue) => {
            const updatedComments = prevValue.map((c) =>
                c.id === comment.id ? u : c
            );
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

    function startReplyUpdate(reply) {
        console.log("clicked");
        if (editBtnRef.current !== reply.id) {
            setIsUpdating(true);
        } else {
            setIsUpdating((prevValue) => !prevValue);
        }
        setUpdateFormText(reply.content);
        editBtnRef.current = reply.id;
    }

    function updateFormHandler(event, formType) {
        if (formType === "update") {
            setUpdateFormText(event.target.value);
        } else {
            setReplyFormText(event.target.value);
        }
    }

    function updateReply(e, comment, reply) {
        e.preventDefault();
        const newObject = {
            ...reply,
            content: updateFormText,
        };
        const updatedReplies = comment.replies.map((r) =>
            r.id === reply.id ? newObject : r
        );

        setCommentList((prevValue) => {
            const updatedList = prevValue.map((c) =>
                c.id === comment.id
                    ? { ...comment, replies: updatedReplies }
                    : c
            );
            localStorage.setItem("commentsData", JSON.stringify(updatedList));
            return updatedList;
        });
        setIsUpdating(false);
    }

    function voteComment(com, reply, up = true) {
        let votedReply;

        up
            ? (votedReply = {
                  ...reply,
                  score: reply.score + 1,
              })
            : (votedReply = {
                  ...reply,
                  score: reply.score - 1,
              });

        const votedReplies = com.replies.map((r) => {
            if (r.id === reply.id) {
                return {
                    ...votedReply,
                };
            }
            return r;
        });

        setCommentList((prevValue) => {
            const updatedComments = prevValue.map((comment) => {
                if (comment.id === com.id) {
                    return {
                        ...comment,
                        replies: votedReplies,
                    };
                }
                return {
                    ...comment,
                };
            });

            localStorage.setItem(
                "commentsData",
                JSON.stringify(updatedComments)
            );
            return updatedComments;
        });
    }

    function addReplyToReply(e) {
        e.preventDefault();
        let reply = replyFormText.replace(usernameReplyingTo.trim(), "");
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
            return max;
        }

        const replyId =
            replyReplyingTo.replies?.length > 0
                ? findMaxId(replyReplyingTo.replies) + 1
                : 1;

        const newReply = {
            content: reply,
            createdAt: new Date(),
            id: replyId,
            replyingTo: usernameReplyingTo.replace("@", "").trim(),
            score: 0,
            replies: [],
            user: {
                image: {
                    png: `./images/avatars/image-${currentUser.username}.png`,
                    webp: `./images/avatars/image-${currentUser.username}.webp`,
                },
                username: currentUser.username,
            },
        };

        resetForm();

        setReplyReplyingTo((prevValue) => {
            return prevValue.replies
                ? {
                      ...prevValue,
                      replies: [newReply, ...prevValue.replies],
                  }
                : {
                      ...prevValue,
                      replies: [newReply],
                  };
        });
    }

    useEffect(() => {
        setCommentList((prevValue) => {
            const updatedComments = prevValue.map((comment) => {
                if (comment.replies) {
                    return {
                        ...comment,
                        replies: comment.replies.map((reply) =>
                            reply.id === replyReplyingTo.id
                                ? replyReplyingTo
                                : reply
                        ),
                    };
                } else {
                    return comment; // Return the original comment if it doesn't have replies
                }
            });

            localStorage.setItem(
                "commentsData",
                JSON.stringify(updatedComments)
            );
            return updatedComments;
            // return prevValue;
        });
    }, [replyReplyingTo]);

    function resetForm() {
        setReplyFormText("");
        setIsReplying((prevValue) => (prevValue = !prevValue));
    }
    return (
        <ul className="replies">
            {comment.replies.map((reply, index) => (
                <li key={reply.id} className="single-comment reply rounded">
                    <picture>
                        <img
                            src={reply.user.image.png}
                            alt={reply.user.username}
                        />
                    </picture>
                    <h2>{reply.user.username}</h2>
                    <div className="you-at">
                        {currentUser.username === reply.user.username && (
                            <span className="you">you</span>
                        )}
                        <span className="created-at">
                            {reply.user.username !== currentUser.username &&
                            index <= 1
                                ? reply.createdAt
                                : formatTimeAgo(reply.createdAt)}
                        </span>
                    </div>
                    {isUpdating && reply.id === editBtnRef.current ? (
                        <form
                            className="update-form"
                            onSubmit={(e) => {
                                updateReply(e, comment, reply);
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
                        <p className="main-comment">
                            <span className="replying-to">
                                @{reply.replyingTo}{" "}
                            </span>
                            {reply.content}
                        </p>
                    )}

                    <div className="votes">
                        {reply.user.username !== currentUser.username ? (
                            <button
                                onClick={() => {
                                    voteComment(comment, reply);
                                }}
                            >
                                <img src={plusIcon} alt="minus icon" />
                            </button>
                        ) : (
                            <button>
                                <img src={plusIcon} alt="minus icon" />
                            </button>
                        )}
                        <span>{reply.score}</span>

                        {reply.user.username !== currentUser.username ? (
                            <button
                                onClick={() => {
                                    voteComment(comment, reply, false);
                                }}
                            >
                                <img src={minusIcon} alt="minus icon" />
                            </button>
                        ) : (
                            <button>
                                <img src={minusIcon} alt="minus icon" />
                            </button>
                        )}
                    </div>
                    {currentUser.username === reply.user.username ? (
                        <div className="delete-edit">
                            <button
                                className="delete"
                                onClick={(event) =>
                                    confirmDelete(comment, reply, event)
                                }
                            >
                                <img src={binIcon} alt="delete" />
                                Delete
                            </button>
                            <button
                                className="edit"
                                onClick={startReplyUpdate.bind(null, reply)}
                                id={reply.id}
                                ref={editBtnRef}
                            >
                                <img src={editIcon} alt="edit" />
                                Edit
                            </button>
                        </div>
                    ) : // (
                    //     <button
                    //         className="reply-btn"
                    //         // id={replies.id}
                    //         onClick={() => {
                    //             replyToReply(reply);
                    //         }}
                    //     >
                    //         <img src={backArrow} alt="reply icon" />
                    //         Reply
                    //     </button>
                    // )
                    null}

                    {/* {isReplying &&
                    reply.user.username ===
                        usernameReplyingTo.trim().substring(1) ? (
                        <Form
                            currentUser={currentUser}
                            addComment={addReplyToReply}
                            textAreaRef={replyFormRef}
                            updateFormHandler={updateFormHandler}
                            formText={replyFormText}
                            userReplyingTo={usernameReplyingTo}
                        />
                    ) : null} */}
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

export default Reply;
