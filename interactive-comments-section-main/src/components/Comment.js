import { useState } from "react";
import "../css/comment.module.css";

import backArrow from "../images/icon-reply.svg";
import minusIcon from "../images/icon-minus.svg";
import plusIcon from "../images/icon-plus.svg";

function Comment({ comment }) {
    console.log(comment);

    return (
        <li id={comment.id} className="comment">
            <section className="single-comment rounded">
                <picture>
                    <img
                        src={comment.user.image.webp}
                        alt={comment.user.username}
                    />
                </picture>
                <h2>{comment.user.username}</h2>
                <span className="created-at">{comment.createdAt}</span>
                <p className="main-comment">{comment.content}</p>
                <div className="votes">
                    <button>
                        <img src={plusIcon} alt="plus icon" />
                    </button>
                    <span>{comment.score}</span>
                    <button>
                        <img src={minusIcon} alt="minus icon" />
                    </button>
                </div>
                <button className="reply-btn">
                    <img src={backArrow} alt="reply icon" />
                    Reply
                </button>
            </section>

            {comment.replies.length > 0 && (
                <ul className="replies">
                    {comment.replies.map((reply) => (
                        <li
                            key={reply.user.username}
                            className="single-comment reply rounded"
                        >
                            <picture>
                                <img
                                    src={reply.user.image.png}
                                    alt={reply.user.username}
                                />
                            </picture>
                            <h2>{reply.user.username}</h2>
                            <span className="created-at">
                                {reply.createdAt}
                            </span>
                            <p className="main-comment">
                                <span className="replying-to">
                                    @{reply.replyingTo}{" "}
                                </span>
                                {reply.content}
                            </p>
                            <div className="votes">
                                <button>
                                    <img src={plusIcon} alt="plus icon" />
                                </button>
                                <span>{reply.score}</span>
                                <button>
                                    <img src={minusIcon} alt="minus icon" />
                                </button>
                            </div>
                            <button className="reply-btn">
                                <img src={backArrow} alt="reply icon" />
                                Reply
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}

export default Comment;
