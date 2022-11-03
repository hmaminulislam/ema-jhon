import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ReviewProduct.css'

const ReviewProduct = ({product, productDeleteBtnHandle}) => {
    const {img, name, price, quantity, id} = product;
    return (
        <div>
            <div className='order-review-container'>
                <div>
                    <img src={img} alt="" />
                </div>
                <div className="order-review-details-container">
                    <div>
                        <p>{name}</p>
                        <p>${price}</p>
                        <p>Quantity: {quantity}</p>
                    </div>
                    <div>
                        <button onClick={()=> productDeleteBtnHandle(id)} className='btn-delete'>
                            <FontAwesomeIcon className='icon-delete' icon={faTrashAlt}></FontAwesomeIcon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewProduct;