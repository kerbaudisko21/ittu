import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './login.css';
import Navbar from '../../components/navbar/Navbar';
// import { IsLoginContext } from '../../context/isLoginContext';

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  // const { isLogin } = useContext(IsLoginContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/auth/login', credentials);
      console.log(res);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
      console.log({ payload: res.data.details });
      navigate('/');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };

  const handleClickRegis = async (e) => {
    e.preventDefault();
    // dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/auth/register', credentials);
      console.log(res);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
      console.log({ payload: res.data.details });
      navigate('/');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };

  // const [isRegistered, setStatus] = useState(isLogin);
  const [isRegistered, setStatus] = useState(props.isLogin);

  return (
    <div className="main">
      {console.log(props)}
      <Navbar />
      <div className="subMain">
        <div className="subMainImage"></div>
        <div className="formSide">
          <div className="container">
            <form className="form">
              <p className="LoginTitle"> ITTU </p>
              <div className="in">
                <label>Username</label>
                <input type="text" id="username" onChange={handleChange} placeholder="Username" />
              </div>
              {!isRegistered && (
                <div className="in">
                  <label>Email</label>
                  <input type="text" id="email" onChange={handleChange} placeholder="Email" />
                </div>
              )}
              <div className="in">
                <label>Password</label>
                <input type="password" id="password" onChange={handleChange} placeholder="Password" />
              </div>
              {/* <p className="error">{errors.password?.type === 'required' && 'Password is required'}</p> */}
              <div className="formFooter">
                {error && <p className="error">{error.message}</p>}
                {isRegistered ? (
                  <button className="btnSubmit" disabled={loading} onClick={handleClickLogin}>
                    Login
                  </button>
                ) : (
                  <button className="btnSubmit" disabled={loading} onClick={handleClickRegis}>
                    Register
                  </button>
                )}
              </div>
            </form>
            <p className="message">
              {!isRegistered ? 'Already have account ? ' : 'Don’t have account ? '}
              <button className="btnAccount" onClick={() => setStatus(!isRegistered)}>
                {!isRegistered ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
