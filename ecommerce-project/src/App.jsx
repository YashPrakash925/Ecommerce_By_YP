import { HomePage } from "./pages/HomePage";
import { Route, Routes } from "react-router";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { ErrorPage } from "./pages/404Page";
import {useState, useEffect} from 'react';

function App() {
    const [cart, setCart]=useState([]);
    function GetCart(){
    fetch("http://localhost:3000/api/cart-items?expand=product")
    .then(response=>response.json())
    .then(data=>setCart(data));
}
    
    useEffect(()=>{
      GetCart();},[]
    );
    return(
        <Routes>
            <Route index element={<HomePage cart={cart}/>} />
            <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="tracking" element={<TrackingPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default App
