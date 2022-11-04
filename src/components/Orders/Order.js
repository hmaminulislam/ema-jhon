import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewProduct from '../ReviewProduct/ReviewProduct';

const Order = () => {
    const { initialCart } = useLoaderData();
    const [cart, setCart] = useState(initialCart)
    const productDeleteBtnHandle = (id) => {
      const remainingProducts = cart.filter(product => product._id !== id);
      setCart(remainingProducts);
      removeFromDb(id)
    }
    const clearCartBtnHandle = () => {
      setCart([]);
      deleteShoppingCart();
    };
    return (
      <div>
        <div className="products-container">
          <div className="order-container">
            {cart.map((product) => (
              <ReviewProduct
                key={product._id}
                product={product}
                productDeleteBtnHandle={productDeleteBtnHandle}
              ></ReviewProduct>
            ))}
            {cart.length === 0 && <h2>No Porduct Available</h2>}
          </div>
          <div className="order-summary">
            <Cart cart={cart} clearCartBtnHandle={clearCartBtnHandle}></Cart>
            <Link className="btn-shipping-contianer" to="/shipping">
              <button className="btn-shipping">Shipping</button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Order;