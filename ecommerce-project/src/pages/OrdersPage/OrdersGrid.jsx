import dayjs from "dayjs";
import { Link } from "react-router";
import { Fragment } from "react";
import axios from "axios";

export function OrdersGrid({ orders, BuyAgainIcon, GetCart }) {
    console.log(GetCart);
    return (
        <div className="orders-grid">
            {orders.map((order) => {
                return (
                    <div key={order.id} className="order-container">
                        <div className="order-header">
                            <div className="order-header-left-section">
                                <div className="order-date">
                                    <div className="order-header-label">Order Placed:{dayjs().format('MMMM D, dddd')}</div>
                                    <div></div>
                                </div>
                                <div className="order-total">
                                    <div className="order-header-label">Total:</div>
                                    <div>₹{order.totalCostCents}</div>
                                </div>
                            </div>

                            <div className="order-header-right-section">
                                <div className="order-header-label">Order ID:</div>
                                <div>{order.id}</div>
                            </div>
                        </div>

                        <div className="order-details-grid">
                            {order.products.map((orderProduct) => {
                                        async function AddToCart() {
                                            await axios.post('http://https://ecommerce-by-yp.onrender.com/api/cart-items', {
                                                productId: orderProduct.product.id,
                                                quantity: orderProduct.quantity
                                            });
                                            await GetCart();
                                        }
                                return (
                                    <Fragment key={orderProduct.product.id}>
                                        <div className="product-image-container">
                                            <img src={orderProduct.product.image} />
                                        </div>

                                        <div className="product-details">
                                            <div className="product-name">
                                                {orderProduct.product.name}
                                            </div>
                                            <div className="product-delivery-date">
                                                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                                            </div>
                                            <div className="product-quantity">
                                                Quantity: {orderProduct.quantity}
                                            </div>
                                            <button className="buy-again-button button-primary">
                                                <img className="buy-again-icon" src={BuyAgainIcon} />
                                                <span className="buy-again-message"
                                                    onClick={AddToCart}
                                                >Add to Cart</span>
                                            </button>
                                        </div>

                                        <div className="product-actions">
                                            <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                                                <button className="track-package-button button-secondary">
                                                    Track package
                                                </button>
                                            </Link>
                                        </div>
                                    </Fragment>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}