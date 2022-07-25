import React from 'react';
import './Product.css'
import { FaStar } from "react-icons/fa";
import {useStateValue} from './StateProvider';



function Product({id, title, image, price, rating}) {

  const [{basket} , dispatch] = useStateValue();

  const addToBasket = () =>{
    console.log("hello");
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
      title: title,
      image: image,
      price: parseFloat(price).toFixed(2),
      rating: rating
      }
    })
  }
  return (
    <div className = "product">
        <div className="product__info">
            <p id='title'>{title}</p>
            <p className="product__price">
                <small>$</small>
                <p>{parseFloat(price).toFixed(2)}</p>

            </p>
            <p style={{color:'green', fontSize:'13px'}}>in stock</p>
            <div className="product__rating">
                {Array(rating).fill().map(()=><FaStar/>)}
            </div>
        </div>
        <img src={image} alt="" />
        <button onClick={addToBasket}>Add to basket</button>
    </div>
  )
}

export default Product