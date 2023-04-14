import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Navbar = () => {
  const [fix, setFix] = useState(false);
  const navigate = useNavigate();

  function setFixed() {
    if (window.scrollY >= 550) {
      setFix(true);
    } else {
      setFix(false);
    }
  }
  window.addEventListener('scroll', setFixed);
  const { user } = useContext(AuthContext);

  const {dispatch } = useContext(AuthContext);

  const handleClickLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.reload('true');
    alert('you are log out');
    dispatch({ type: 'LOGOUT' });
  };


  return (
    <div className="navbar">
      <div className={fix ? 'navContainer fixed' : 'navContainer'}>
        <span className="logo">ITTU</span>
        {user ? (
          <div className="navItems">
            <button className="navButton">{user.username}</button>
            <button className="navButton" onClick={handleClickLogout}>
              Log out
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">
              <a href="/register">Register</a>
            </button>
            <button className="navButton">
              <a href="/login">Login</a>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
