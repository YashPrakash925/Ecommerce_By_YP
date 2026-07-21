import './HomePage.css';
import { Header } from '../../components/header';
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';

export function HomePage({cart,GetCart}) {
  const [products, setProducts]=useState([]);
  async function GetData(){
    const response=await fetch("http://localhost:3000/api/products");
    const data=await response.json(); 
    setProducts(data);
  }

  useEffect(()=>{
    GetData();},[]
  );

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