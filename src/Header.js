import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import { FaSistrix } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import {useStateValue} from './StateProvider';

function Header() {
  const [{basket}] = useStateValue();
  return (
    <nav className = "header">
        {/* logo on left */}
        <Link to = "/">
            <img className='header__logo'
             src = 'https://pnggrid.com/wp-content/uploads/2021/05/Amazon-Logo-Transparent-1536x465.png' alt='' />
        </Link>
        {/* search bar */}
        <div className="header__search">
          <input type="" className="header__searchInput" />
          <FaSistrix className='header__searchIcon'/>
        </div>
        {/* 3 links */}
        <div className="header__nav">
          <Link to='/login' className="header__Link">
            <div className="header__option">
              <span className='header__option__firstLine'>Hello,</span>
              <span className='header__option__secondLine'>Sign in</span>
            </div>
          </Link>
          <Link to='/orders' className="header__Link">
            <div className="header__option">
              <span className='header__option__firstLine'>Returns</span>
              <span className='header__option__secondLine'>& Orders</span>
            </div>
          </Link>
          <Link to='/prime' className="header__Link">
            <div className="header__option">
              <span className='header__option__firstLine'>Your</span>
              <span className='header__option__secondLine'>Prime</span>
            </div>
          </Link>
          {/* basket with the number */}
          <Link to='/checkout' className='header__Link'>
            <div className="header__optionBasket">
              <HiOutlineShoppingCart className='header__Basket'/>
              <span className='header__option__secondLine header__basketCount'>{basket?.length}</span>
            </div>
          </Link>
        </div>
    </nav>
  )
}

export default Header