import { HomePage } from "./pages/HomePage/HomePage";
import { Route, Routes } from "react-router";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage/TrackingPage";
import { ErrorPage } from "./pages/ErrorPage/404Page";
import {useState, useEffect} from 'react';
import axios from "axios";

function App() {
    const [cart, setCart]=useState([]);
    async function GetCart(){
        const response=await axios.get("http://localhost:3000/api/cart-items?expand=product")
        setCart(response.data);
}
    
    useEffect(()=>{
      GetCart();},[]
    );
    return(
        <Routes>
            <Route index element={<HomePage cart={cart} GetCart={GetCart}/>} />
            <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
            <Route path="orders" element={<OrdersPage cart={cart}/>} />
            <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart}/>} />
            <Route path="*" element={<ErrorPage cart={cart}/>} />
        </Routes>
    );
}

export default App
