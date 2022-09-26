import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
const Product = ({addToCartHandle, product}) => {
    const {name, img, seller, ratings, price} = product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <p className='product-name'>{name}</p>
                <p className='product-price'>Price: ${price}</p>
                <p>Manufacturer: {seller}</p>
                <p>{ratings} Rating</p>
            </div>
            <button onClick={ () => addToCartHandle(product)} className='btn-cart'>
                <p>Add to Cart</p>
                <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;