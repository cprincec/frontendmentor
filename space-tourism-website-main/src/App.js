import "./css/App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Destination from "./routes/Destination";
import Layout from "./components/Layout";
function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/destination" element={<Destination />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
