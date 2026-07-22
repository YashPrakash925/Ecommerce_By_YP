import './HomePage.css';
import { Header } from '../../components/header';
import { ProductsGrid } from './ProductsGrid';

export function HomePage({cart,GetCart, products}) {
  return (
    <>
      <title>Ecommerce by YP</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <Header cart={cart}/>
      <div className="home-page">
        <ProductsGrid products={products} GetCart={GetCart}/>
      </div>
    </>
  );
}