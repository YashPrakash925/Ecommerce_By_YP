import { HomePage } from "./pages/HomePage";
import { Route, Routes } from "react-router";
import { CheckoutPage } from "./pages/CheckoutPage";

function App() {
    return(
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="checkout" element={<CheckoutPage />} />
        </Routes>
    );
}

export default App
