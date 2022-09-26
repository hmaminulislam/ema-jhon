import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
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

    useEffect( () => {
        const storedCart = getStoredCart();
        const saveCart = []
        // console.log(storedCart);
        for(const id in storedCart) {
            // console.log(id)
            const addedProduct = products.find( product => product.id === id);
            // console.log(addedProduct)
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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Products;