import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'

const Navbar = () => {

    const [fix, setFix] = useState(false);

    function setFixed(){
        if(window.scrollY >=392){
            setFix(true);
        }else{
            setFix(false);
        }
    }
    window.addEventListener("scroll", setFixed);

  return (
    <div className="navbar" >
        <div className={fix ? 'navContainer fixed' : 'navContainer'}>
          <Link to="/" style={{color:"black", textDecoration:"none"}}><span className='logo'>ITTU</span></Link>
          <div className='navItems'>
              <button className='navButton'>Register</button>
              <button className='navButton'>Login</button>
          </div>
        </div>
    </div>
  )
}
export default Navbar