import './HomePage.css';
import { Header } from '../../components/header';
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function HomePage({cart,GetCart}) {
  const [products, setProducts]=useState([]);
      async function GetData(){
        const response=await fetch("https://ecommerce-by-yp.onrender.com/api/products");
        const data=await response.json(); 
        setProducts(data);
      }
    
    useEffect(()=>{
      GetData();},[]
    );

  const [searchParams]=useSearchParams();
  const search=searchParams.get('search');

  useEffect(()=>{
    const getHomeData=async ()=>{
      const urlPath=search?`https://ecommerce-by-yp.onrender.com/api/products?search=${search}` : 'hthttps://ecommerce-by-yp.onrender.com/api/products';
      const response =await axios.get(urlPath);
      setProducts(response.data);
    };
    getHomeData();
  },[search]);
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