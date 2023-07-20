import { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import Comments from "./components/Comments";
import Form from "./components/Form";
import CommentsContext from "./store/comments";
const url =
    "https://raw.githubusercontent.com/cprincec/frontendmentor/main/interactive-comments-section-main/src/data.json";
function App() {
    const [commentList, setCommentList] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState("");
    const [formText, setFormText] = useState("");

    const initialCommentRef = useRef(null);

    let activeCommentId;

    function voteComment(commentId, up = true) {
        setCommentList((prevValue) => {
            const updatedComments = prevValue.map((comment) => {
                if (comment.id === commentId) {
                    if (!up) {
                        return {
                            ...comment,
                            score: comment.score - 1, // Increment the score by 1
                        };
                    }
                    return {
                        ...comment,
                        score: comment.score + 1, // Increment the score by 1
                    };
                }
                return comment;
            });

            localStorage.setItem(
                "commentsData",
                JSON.stringify(updatedComments)
            ); // Store updated comments in local storage

            return updatedComments; // Update the commentList state
        });
    }

    function updateFormHandler(event) {
        setFormText(event.target.value);
    }
    function resetForm() {
        setFormText("");
    }

    function addComment(event) {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            console.log("invalid");
            setDialogContent(
                <>
                    <div className="backdrop"></div>
                    <dialog className="dialog" open>
                        <h3>Invalid comment!</h3>
                        <p>
                            You cannot post an empty comment. Add a comment and
                            send
                        </p>
                        <button onClick={closeDialog}>Okay</button>
                    </dialog>
                </>
            );
            setShowDialog(true);
            return;
        }

        let newComment = {
            content: formText,
            createdAt: new Date().toString(),
            id: commentList.length + 1,
            replies: [],
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

        setCommentList((prevValue) => {
            let newValue = [...prevValue, newComment];
            localStorage.setItem("commentsData", JSON.stringify(newValue));
            return newValue;
        });
    }

    function confirmDelete(commentId) {
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
                                activeCommentId = commentId;
                                deleteActiveComment();
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

    function deleteActiveComment() {
        console.log(activeCommentId);
        setCommentList((prevValue) => {
            let newCommentsList = prevValue.filter(
                (comment) => comment.id !== activeCommentId
            );
            localStorage.setItem(
                "commentsData",
                JSON.stringify(newCommentsList)
            );
            return newCommentsList;
        });
    }

    function closeDialog() {
        setShowDialog(false);
    }

    function deleteReply(commentId, replyId) {
        setCommentList((prevValue) => {
            let parentComment;
            prevValue.filter((comment) => comment.id === commentId);
        });
    }

    function sortComments(commentList) {}

    useEffect(function () {
        async function fetchData() {
            try {
                let currentUserData;
                let commentsData;
                if (
                    localStorage.getItem("commentsData") &&
                    localStorage.getItem("currentUserData")
                ) {
                    currentUserData = JSON.parse(
                        localStorage.getItem("currentUserData")
                    );
                    commentsData = JSON.parse(
                        localStorage.getItem("commentsData")
                    );
                } else {
                    let fetchResult = await fetch(url);
                    if (fetchResult.ok) {
                        const data = await fetchResult.json();
                        localStorage.setItem(
                            "commentsData",
                            JSON.stringify(data.comments)
                        );
                        localStorage.setItem(
                            "currentUserData",
                            JSON.stringify(data.currentUser)
                        );
                        currentUserData = data.currentUser;
                        commentsData = data.comments;
                    } else {
                        throw new Error("Failed to fetch data");
                    }
                }

                const comments = commentsData.sort((a, b) => b.score - a.score);

                setCommentList([...comments]);
                setCurrentUser({ ...currentUserData });
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="App">
            <main>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Comments
                        commentList={commentList}
                        currentUser={currentUser}
                        confirmDelete={confirmDelete}
                        voteComment={voteComment}
                        setCommentList={setCommentList}
                    />
                )}
                <Form
                    textAreaRef={initialCommentRef}
                    addComment={addComment}
                    currentUser={currentUser}
                    updateFormHandler={updateFormHandler}
                    formText={formText}
                />
                {showDialog &&
                    createPortal(
                        <div>{dialogContent}</div>,
                        document.getElementById("dialogs")
                    )}
            </main>
        </div>
    );
}

export default App;
