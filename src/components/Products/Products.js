import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Products.css'
const Products = () => {

    const products = useLoaderData();
    const [cart, setCart] = useState([]);


    useEffect( () => {

        const storedCart = getStoredCart();
        const saveCart = []

        for(const id in storedCart) {
            const addedProduct = products.find( product => product.id === id);
            if(addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct)
            }
        }
        setCart(saveCart)
    }, [products])

    const addToCartHandle = (SelectedProduct) => {
        let newCart = [];
        const exists = cart.find(product => product.id === SelectedProduct.id);
        if(!exists) {
            SelectedProduct.quantity = 1;
            newCart = [...cart, SelectedProduct];
        }
        else {
            const rest = cart.filter(product => product.id !== SelectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists]
        }

        setCart(newCart);
        addToDb(SelectedProduct.id)
    }

    const clearCartBtnHandle = () => {
      setCart([]);
      deleteShoppingCart()
    }
    
    return (
      <div className="products-container">
        <div className="product-container">
          {products.map(product => 
            <Product
              product={product}
              key={product.id}
              addToCartHandle={addToCartHandle}
            ></Product>
          )}
        </div>
        <div className="order-summary">
          <Cart cart={cart} clearCartBtnHandle={clearCartBtnHandle}>
            <Link to={'/orders'}>
              <button className='review-order-btn'>Review Order</button>
            </Link>
          </Cart>
        </div>
      </div>
    );
};

export default Products;