import './checkout-header.css';
import './checkout.css';
import { Link } from 'react-router';
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png';
import Logo from '../../assets/images/icons/logo.png';
import { useEffect, useState } from 'react';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';


export function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);
    useEffect(() => {
        fetch("http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime")
            .then(response => response.json())
            .then(data => setDeliveryOptions(data));
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/api/payment-summary")
            .then(response => response.json())
            .then(data => setPaymentSummary(data))
    }, [])

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <Link to="/">
                            <img className="logo" src={Logo} />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </Link>
                    </div>
                    <div className="checkout-header-middle-section">
                        Checkout (<Link className="return-to-home-link"
                            to="/">3 items</Link>)
                    </div>
                    <div className="checkout-header-right-section">
                        <img src={CheckoutLockIcon} />
                    </div>
                </div>
            </div>
            <div className="checkout-page">
                <div className="page-title">Review your order</div>
                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    );
}