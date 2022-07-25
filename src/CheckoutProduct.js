import React from 'react'
import './CheckoutProduct.css';
import { FaStar } from "react-icons/fa";
import {useStateValue} from './StateProvider';



function CheckoutProduct({id, title, image, price, rating}) {
  const [{basket} , dispatch] = useStateValue();

  const removeFromBasket = () =>{
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id
    })
  };
  return (
    <>
    <div className='checkoutProduct'>
        <img className='checkoutProduct__image' src= {image} alt="" />
        <div className="checkoutProduct__info">
            <p className="checkoutProduct__title">{title}</p>
            <div >
                <p style={{color:'green', fontSize:'15px',margin:'.5rem 0'}}>in stock</p>
            </div>
            <div className="product__rating">
                {Array(rating).fill().map(()=><FaStar/>)}
            </div>
            <button onClick={removeFromBasket}>Remove from Basket</button>
        </div>
        <div className="checkoutProduct__price">
                <p>{price}</p>
                {/* {console.log(typeof(price))} */}
                <p>$</p>
            </div>
    </div>
    <hr/>
    </>
  );
}

export default CheckoutProduct