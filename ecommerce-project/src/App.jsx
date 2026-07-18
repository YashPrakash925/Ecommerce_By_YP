import { HomePage } from "./pages/HomePage";
import { Route, Routes } from "react-router";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { ErrorPage } from "./pages/404Page";

function App() {
    return(
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="tracking" element={<TrackingPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default App
