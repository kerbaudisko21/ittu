import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import "./login.css";
import Navbar from "../../components/navbar/Navbar";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username:undefined,
    password:undefined
})

const {loading,error,dispatch} = useContext(AuthContext)
const navigate = useNavigate()

const handleChange = (e) => {
    setCredentials((prev) => ({...prev, [e.target.id]: e.target.value }))
}

const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details});
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

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
                onChange={handleChange}
                placeholder="Username" 
              />
              <input 
                label="Password" 
                type="password" 
                id="password"
                onChange={handleChange}
                placeholder="Password" 
              />
              <div className="formFooter">
                <button disabled={loading} onClick={handleClick} >Login</button>
              </div>
                {error && <span>{error.message}</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;