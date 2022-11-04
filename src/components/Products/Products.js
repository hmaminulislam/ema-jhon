import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Products.css'
const Products = () => {

    const [cart, setCart] = useState([]);
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0)

    useEffect( () => {
      const url = `http://localhost:5000/products?page=${page}&size=${size}`;
      fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setCount(data.count)
      })
    },[page, size])

    const pages = Math.ceil(count / size)

    useEffect( () => {

        const storedCart = getStoredCart();
        const saveCart = []

        for(const id in storedCart) {
            const addedProduct = products.find( product => product._id === id);
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
        const exists = cart.find(product => product._id === SelectedProduct._id);
        if(!exists) {
            SelectedProduct.quantity = 1;
            newCart = [...cart, SelectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== SelectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists]
        }

        setCart(newCart);
        addToDb(SelectedProduct._id)
    }

    const clearCartBtnHandle = () => {
      setCart([]);
      deleteShoppingCart()
    }

    return (
      <div className="products-container">
        <div className="product-container">
          {products.map((product) => (
            <Product
              product={product}
              key={product._id}
              addToCartHandle={addToCartHandle}
            ></Product>
          ))}
        </div>
        <div className="order-summary">
          <Cart cart={cart} clearCartBtnHandle={clearCartBtnHandle}>
            <Link to={"/orders"}>
              <button className="review-order-btn">Review Order</button>
            </Link>
          </Cart>
        </div>
        <div className="pagination">
          {[...Array(pages).keys()].map((number) => (
            <button
              className={page === number && "selected"}
              onClick={() => setPage(number)}
            >
              {number + 1}
            </button>
          ))}
          <div style={{margin: '10px'}}>
            <span>Per page product view: </span>
            <select onChange={(event) => setSize(event.target.value)}>
              <option value="5">5</option>
              <option value="10" selected>
                10
              </option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
            </select>
          </div>
        </div>
      </div>
    );
};

export default Products;