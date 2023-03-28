import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'

const Navbar = () => {

    const [fix, setFix] = useState(false);

    function setFixed(){
        if(window.scrollY >=550){
            setFix(true);
        }else{
            setFix(false);
        }
    }
    window.addEventListener("scroll", setFixed);

  return (
    <div className="navbar" >
        <div className={fix ? 'navContainer fixed' : 'navContainer'}>
          <span className='logo'>ITTU</span>
          <div className='navItems'>
              <button className='navButton'><a href="/register" style={{textDecoration:'none', color:'white', WebkitTextStroke:'0.1px, black'}}>Register</a></button>
              <button className='navButton'><a href="/login" style={{textDecoration:'none', color:'white', WebkitTextStroke:'0.1px, black'}}>Login</a></button>
          </div>
        </div>
    </div>
  )
}
export default Navbar