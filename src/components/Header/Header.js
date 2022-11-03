import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/Logo.svg";
import { AuthContext } from '../context/UserContext';
import './Header.css'
const Header = () => {
    const {user, logOut} = useContext(AuthContext)
    const logOutHandle = () => {
        logOut()
        .then( () => {})
        .catch(() => {})
    }
    return (
      <nav className="header">
        <img src={logo} alt="" />
        <div>
          <Link to="/">Shop</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/about">About</Link>
          {user?.uid ? (
            <button onClick={logOutHandle} className='logout-btn'>Log out</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
    );
};

export default Header;