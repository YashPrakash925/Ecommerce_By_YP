import { Product } from "./Product";

export function ProductsGrid({products,GetCart}) {
    return (
        <div className="products-grid">
            {products.map((product) => {
                return (
                    <Product key={product.id} product={product} GetCart={GetCart}/>
                );
            })}
        </div>
    );
}