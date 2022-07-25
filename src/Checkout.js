import React from 'react'
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import {useStateValue} from './StateProvider';


function Checkout() {
    const [{basket} , dispatch] = useStateValue();
    const calculateTotal = () =>{
        let total = 0.00;
        { basket.map(item => (
            total +=JSON.parse(item.price)
            ))}
            return JSON.parse(total.toFixed(2))
        }
    const total = calculateTotal();


  return (
    <div className='checkout'>
        <img className='ad' src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/PD22/Prebooking/1500x400_PC_prebooking_header.jpg"  alt="" />
        {basket?.length === 0? (
            <div>
                <h1>Your Shopping Basket is empty</h1>
                <p>You have no items in your basket. To buy one or more items click on 'Add To Basket' next to the item</p>
            </div>
        ):
        (<div className="biller">
        <div className='checkout__basket'>
            <h1 className='checkout__title'>Your Shopping Basket</h1>
            <hr/>
            {basket.map(item => (

                <CheckoutProduct
                    id ={item.id}
                    title = {item.title}
                    image = {item.image}
                    price = {item.price}
                    rating = {item.rating}
                />
            ))}
            <div className="subtotal">
                {/* <p>{console.log(calculateTotal())}</p> */}
                <p style={{marginRight:'6px', display:'flex'}}>Subtotal({basket.length} items) :<p style={{fontWeight:'600'}}> ${total}</p></p>
            </div>
        </div>
        <div className="checkout__card">
        <p style={{fontSize:'13px', fontWeight:'450'}}><span style={{color:'#228871'}}>Your order is eligible for FREE Delivery.</span><p> Select this option at checkout. Details</p></p>
        <div className="subtotal">
            <p style={{marginRight:'6px', display:'flex'}}>Subtotal({basket.length} items) :<p style={{fontWeight:'600'}}>${total}</p></p>
        </div>
        <button>Proceed to Buy</button>
        </div>
        </div>
        )
        };
    </div>
  );
}

export default Checkout