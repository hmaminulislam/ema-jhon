import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Products.css'
const Products = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect( () => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])


    const addToCartHandle = (product) => {
        // console.log(product)
        const newCart = [...cart, product];
        setCart(newCart)
    }
    
    return (
        <div className='products-container'>
            <div className="product-container">
                {
                    products.map(product => <Product product={product}
                         key={product.id}
                         addToCartHandle={addToCartHandle}
                         ></Product>)
                }
            </div>
            <div className="order-summary">
                <h3>Order Summary</h3>
                <p>Item added: {cart.length}</p>
            </div>
        </div>
    );
};

export default Products;