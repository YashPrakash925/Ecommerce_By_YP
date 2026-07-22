import './orders.css';
import { Header } from '../../components/header';
import BuyAgainIcon from '../../assets/images/icons/buy-again.png';
import { useEffect, useState } from 'react';
import { OrdersGrid } from './OrdersGrid';

export function OrdersPage({ cart ,GetCart}) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/orders?expand=products")
            .then(response => response.json())
            .then(data => setOrders(data))
    }, [])

    return (
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" to="orders-favicon.png" />
            <Header cart={cart} />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrdersGrid orders={orders} BuyAgainIcon={BuyAgainIcon} GetCart={GetCart}/> 
            </div>
        </>
    );
}