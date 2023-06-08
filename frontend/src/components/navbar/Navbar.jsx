import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';


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

  const { dispatch } = useContext(AuthContext);

  const handleClickLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Log out successfull!',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      window.location.href = '/login';
    })
  };

  const toHome = () => {
    window.location.href = '/';
  }

  return (
    <div className="navbar">
      <div className={fix ? 'navContainer fixed' : 'navContainer'}>
        <span>
          <Link onClick={toHome} className="logo">
            ITTU
          </Link>
        </span>
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
