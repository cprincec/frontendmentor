import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Job from "./components/Job";

const url =
    "https://raw.githubusercontent.com/cprincec/frontendmentor/main/static-job-listings-master/public/data.json";

// async function getData() {
//     let result = await fetch(url);
//     if (result.ok) {
//         let data = await result.json();
//         return data;
//     }
// }

// function App() {
//     const [jobsList, setJobsList] = useState([]);

//     useEffect(function () {
//         getData().then((jobsLists) => setJobsList(jobsLists));
//     }, []);

//     // console.log(jobsList);

//     return (
//         <div className="App">
//             <header className="App-header"></header>
//             <main>
//                 <h1>Hi</h1>
//                 {jobsList.length > 0 &&
//                     jobsList.forEach((job) => <Job data={job} />)}
//             </main>
//         </div>
//     );
// }

function App() {
    const [jobsList, setJobsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function () {
        async function fetchData() {
            try {
                const result = await fetch(url);
                if (result.ok) {
                    const data = await result.json();
                    setJobsList(data);
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
            <header className="App-header"></header>
            <main>
                <h1>Hi</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    jobsList.map((job) => <Job key={job.id} data={job} />)
                )}
            </main>
        </div>
    );
}

export default App;
