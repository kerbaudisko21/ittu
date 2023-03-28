import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import "./register.css";
import Navbar from "../../components/navbar/Navbar";
const Register = () => {

  return (
    <div className="main">
    <Navbar />
    <div className="subMain">
      <div className="subMainImage"></div>
      <div className="formSide">
        <div className="container">
          <form className="form">
            <p className="LoginTitle"> ITTU </p>
            <input 
              label="Username" 
              type="text"
              id="username"
              placeholder="Username" 
            />
            <input 
              label="Email" 
              type="text"
              id="email"
              placeholder="email" 
            />
            <input 
              label="Password" 
              type="password" 
              id="password"
              placeholder="Password" 
            />
            <div className="formFooter">
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register