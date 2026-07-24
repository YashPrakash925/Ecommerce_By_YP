import './tracking.css';
import { Link, useParams } from 'react-router';
import { Header } from '../../components/header';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        fetch(`https://ecommerce-by-yp.onrender.com//https://ecommerce-by-yp.onrender.com/api/orders/${orderId}?expand=products`)
            .then(response => response.json())
            .then(data => setOrders(data))
    }, [orderId])
    if (!orders) { return null; }
    const orderProduct = orders.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    })

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - orders.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - orders.orderTimeMs;

    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
    deliveryPercent = Math.min(Math.max(deliveryPercent, 0), 100);
    return (
        <>
            <title>Tracking</title>
            <Header cart={cart} />
            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>
                    <div className="delivery-date">
                        Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={`https://ecommerce-by-yp.onrender.com/${orderProduct.product.image}`} />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"
                            style={{width:`${deliveryPercent}%`}}>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}