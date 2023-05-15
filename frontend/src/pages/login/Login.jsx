import axios from 'axios';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './login.css';
import Navbar from '../../components/navbar/Navbar';
import { FcGoogle } from 'react-icons/fc';
import { auth } from './../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const provider = new GoogleAuthProvider();
// import { IsLoginContext } from '../../context/isLoginContext';

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  // const { isLogin } = useContext(IsLoginContext);
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/auth/login', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
      console.log({ payload: res.data.details });
      window.location.href = '/';
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };

  const handleClickRegis = async (e) => {
    e.preventDefault();
    dispatch({ type: 'REGIS_START' });
    try {
      console.log(credentials);
      // const res = await axios.post('/auth/register', credentials);
      // console.log(res);
      // dispatch({ type: 'REGIS_SUCCESS', payload: res.data.details });
      // console.log({ payload: res.data.details });
      alert('user has been created!');
      window.location.href = '/login';
    } catch (err) {
      dispatch({ type: 'REGIS_FAILURE', payload: err.response.data });
    }
  };

  const handleClickLoginGoogle = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      let { user } = await signInWithPopup(auth, provider);

      console.log(user);
      // setCredentials({
      //   email: user.email,
      //   username: `${user.displayName}${user.email}`,
      //   password: user.uid,
      // }); kalo pake set credential, credentialnya undefined pas pertama tekan

      console.log(user, credentials);

      const response = await axios.post('/auth/regisAndLogin', {
        email: user.email,
        username: `${user.displayName}${user.email}`,
        password: user.uid,
      });

      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.details });
      window.location.href = '/';
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };

  const [isRegistered, setStatus] = useState();

  useEffect(() => {
    setStatus(props.isLogin);
  }, []);

  console.log(isRegistered);

  return (
    <div className="main">
      {console.log(React.version)}
      <Navbar />
      <div className="subMain">
        <div className="subMainImage"></div>
        <div className="formSide">
          <div className="container">
            <form className="form">
              <div className="head">
                <p className="LoginTitle"> ITTU </p>
              </div>
              <div className="input">
                <div className="in">
                  <label className="label">Username</label>
                  <input label="Username" type="text" id="username" onChange={handleChange} placeholder="Username" />
                </div>
                {!isRegistered && (
                  <div className="in">
                    <label className="label">Email</label>
                    <input label="Email" type="text" id="email" onChange={handleChange} placeholder="Email" />
                  </div>
                )}
                <div className="in">
                  <label className="label">Password</label>
                  <input label="Password" type="password" id="password" onChange={handleChange} placeholder="Password" />
                </div>
                {/* <p className="error">{errors.password?.type === 'required' && 'Password is required'}</p> */}
              </div>
              <div className="formFooter">
                {isRegistered ? (
                  <button className="btnSubmit" disabled={loading} onClick={handleClickLogin}>
                    Login
                  </button>
                ) : (
                  <button className="btnSubmit" disabled={loading} onClick={handleClickRegis}>
                    Register
                  </button>
                )}
                <button className="btnSubmit google" disabled={loading} onClick={handleClickLoginGoogle}>
                  {isRegistered ? 'Login with Google' : 'Register with Google'}
                  <FcGoogle size={'24px'} />
                </button>
              </div>
              {error && <span>{error.message}</span>}
              <p className="message">
                {!isRegistered ? 'Already have account ? ' : 'Don’t have account ? '}
                <Link className="linkAneh" to={'/login'}>
                  <button className="btnAccount" onClick={() => setStatus(!isRegistered)}>
                    {!isRegistered ? 'Login' : 'Sign Up'}
                  </button>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
