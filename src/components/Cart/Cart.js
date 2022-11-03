import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Cart.css'

const Cart = ({cart, clearCartBtnHandle, children}) => {
    let quantity = 0;
    let totalPrice = 0;
    let shipping = 0;
    for(const product of cart) {
        quantity = quantity + product.quantity;
        totalPrice = totalPrice + product.price * product.quantity;
        shipping = shipping + product.shipping
    }
    const tax = parseFloat((totalPrice * 0.1).toFixed(2));
    const grandTotal = totalPrice + shipping + tax;
    return (
        <div className='order-info-container'>
            <h3 className='order-summary-title'>Order Summary</h3>
            <p>Item added: {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Shipping Charge: ${shipping}</p>
            <p>Tax: ${tax}</p>
            <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
            <button onClick={clearCartBtnHandle} className='clear-cart-btn'>
                Clear Cart
                <FontAwesomeIcon className='clear-cart-icon' icon={faTrashAlt}></FontAwesomeIcon>
            </button>
            {children}
        </div>
    );
};

export default Cart;