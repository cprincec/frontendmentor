import { useState, useEffect } from "react";
import "./App.css";
import Comment from "./components/Comment";
import Form from "./components/Form";
const url =
    "https://raw.githubusercontent.com/cprincec/frontendmentor/main/interactive-comments-section-main/src/data.json";
function App() {
    const [commentList, setCommentList] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function () {
        async function fetchData() {
            try {
                const result = await fetch(url);
                if (result.ok) {
                    const data = await result.json();
                    setCommentList([...data.comments]);
                    setCurrentUser({ ...data.currentUser });
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch (error) {
                console.error(error);
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
                    <ul className="comments-container">
                        {commentList.map((data) => {
                            console.log(currentUser);
                            return <Comment key={data.id} comment={data} />;
                        })}
                    </ul>
                )}
                <Form user={currentUser} />
            </main>
        </div>
    );
}

export default App;
