import dayjs from "dayjs";
import axios from "axios";
import { useState } from "react";

export function OrderSummary({ cart, deliveryOptions, GetCart }) {
    const [quantity, setQuantity] = useState(1);
    const [showInput, setShowInput] = useState(false);
    return (
        <div className="order-summary">
            {cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.
                    find((deliveryOption) => {
                        return deliveryOption.id === cartItem.deliveryOptionId;
                    })
                if (!selectedDeliveryOption) {
                    return null;
                }
                async function deleteCartItem() {
                    await axios.delete(`https://ecommerce-by-yp.onrender.com/api/cart-items/${cartItem.productId}`)
                    await GetCart();
                }
                function ShowBox() {
                    setShowInput(true);
                }
                async function updateCartItem() {
                    await axios.put(`https://ecommerce-by-yp.onrender.com/api/cart-items/${cartItem.productId}`, {
                        quantity: Number(quantity)
                    })
                    await GetCart();
                    setShowInput(false);
                }
                return (
                    <>
                        {showInput &&
                            <>
                                <input
                                    type='number'
                                    placeholder="Enter quantity"
                                    onChange={(event) => { setQuantity(event.target.value) }}
                                />
                                <button onClick={updateCartItem}>
                                    Save
                                </button>
                            </>
                        }
                        <div key={cartItem.product.id} className="cart-item-container">
                            <div className="delivery-date">
                                Delivery date:{dayjs(selectedDeliveryOption.
                                    estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>

                            <div className="cart-item-details-grid">
                                <img className="product-image"
                                    src={cartItem.product.image} />

                                <div className="cart-item-details">
                                    <div className="product-name">
                                        {cartItem.product.name}
                                    </div>
                                    <div className="product-price">
                                        ₹{cartItem.product.priceCents}
                                    </div>
                                    <div className="product-quantity">
                                        <span>
                                            Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                        </span>
                                        <span className="update-quantity-link link-primary"
                                            onClick={ShowBox}>
                                            Update
                                        </span>
                                        <span className="delete-quantity-link link-primary"
                                            onClick={deleteCartItem}>
                                            Delete
                                        </span>
                                    </div>
                                </div>

                                <div className="delivery-options">
                                    <div className="delivery-options-title">
                                        Choose a delivery option:
                                    </div>
                                    {deliveryOptions.map((deliveryOption) => {
                                        let priceShipping = deliveryOption.priceCents > 0 ? `${deliveryOption.priceCents}- Shipping` : 'FREE Shipping';
                                        async function updateDeliveryOption() {
                                            await axios.put(`https://ecommerce-by-yp.onrender.com/api/cart-items/${cartItem.productId}`, {
                                                deliveryOptionId: deliveryOption.id
                                            })
                                            await GetCart();
                                        }
                                        return (
                                            <div key={deliveryOption.id} className="delivery-option" onClick={updateDeliveryOption}>
                                                <input type="radio"
                                                    checked={cartItem.deliveryOptionId === deliveryOption.id}
                                                    className="delivery-option-input"
                                                    name={`delivery-option-${cartItem.productId}`}
                                                    onChange={() => { }} />
                                                <div>
                                                    <div className="delivery-option-date">
                                                        {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                                    </div>
                                                    <div className="delivery-option-price">
                                                        {priceShipping}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </>
                );
            })}

        </div>
    );
}