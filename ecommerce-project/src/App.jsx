import { HomePage } from "./pages/HomePage";
import { Route, Routes } from "react-router";

function App() {
    return(
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="checkout" element={<div>TEst</div>} />
        </Routes>
    );
}

export default App
