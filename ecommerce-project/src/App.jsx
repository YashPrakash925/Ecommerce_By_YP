import { HomePage } from "./pages/HomePage";
import { Route, Routes } from "react-router";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";

function App() {
    return(
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="orders" element={<OrdersPage />} />
        </Routes>
    );
}

export default App
