import dayjs from "dayjs";
import axios from "axios";

export function OrderSummary({cart, deliveryOptions, GetCart}){
    return(
        <div className="order-summary">
                        {cart.map((cartItem) => {
                            const selectedDeliveryOption = deliveryOptions.
                                find((deliveryOption) => {
                                    return deliveryOption.id === cartItem.deliveryOptionId;
                                })
                                if (!selectedDeliveryOption) {
                                    return null;
                                }
                            return (
                                <>
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
                                                    ₹{cartItem.product.price}
                                                </div>
                                                <div className="product-quantity">
                                                    <span>
                                                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                                    </span>
                                                    <span className="update-quantity-link link-primary">
                                                        Update
                                                    </span>
                                                    <span className="delete-quantity-link link-primary">
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
                                                    async function updateDeliveryOption(){
                                                        await axios.put(`http://localhost:3000/api/cart-items/${cartItem.productId}`, {
                                                            deliveryOptionId:deliveryOption.id
                                                        })
                                                        await GetCart();
                                                    }
                                                    return (
                                                        <div key={deliveryOption.id} className="delivery-option" onClick={updateDeliveryOption}>
                                                            <input type="radio"
                                                                checked={cartItem.deliveryOptionId === deliveryOption.id}
                                                                className="delivery-option-input"
                                                                name={`delivery-option-${cartItem.productId}`}
                                                                onChange={()=>{}}/>
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