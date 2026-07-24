import { useState } from "react";
import axios from "axios";
import Checkmark from '../../assets/images/icons/checkmark.png';

export function Product({product,GetCart}) {
    const [quantity, setQuantity]=useState(1);
    const [added, setAdded]=useState(false);
    function ShowAdded(){
        setAdded(true);
        setTimeout(()=>{
            setAdded(false);
        },2000);
    }
    return (
        <>
            <div key={product.id} className="product-container">
                <div className="product-image-container">
                    <img className="product-image"
                        src={product.image} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                    {product.name}
                </div>

                <div className="product-rating-container">
                    <img className="product-rating-stars"
                        src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                    <div className="product-rating-count link-primary">
                        {product.rating.count}
                    </div>
                </div>

                <div className="product-price">
                    ₹{product.priceCents}
                </div>

                <div className="product-quantity-container">
                    <select value={quantity} onChange={(event) => {
                        const quantitySelected = Number(event.target.value);
                        setQuantity(quantitySelected);
                    }}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div className="product-spacer"></div>

                <div className="added-to-cart"
                    style={{opacity:added?1:0}}>
                    <img src={Checkmark} />Added
                </div>

                <button className="add-to-cart-button button-primary"
                    onClick={async () => {
                        await axios.post("http://https://ecommerce-by-yp.onrender.com/api/cart-items", {
                            productId: product.id,
                            quantity: quantity
                        });
                        await GetCart();
                        ShowAdded();
                    }}>
                    Add to Cart
                </button>
            </div>
        </>
    );
}