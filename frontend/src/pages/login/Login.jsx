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

  const imageToFile = async (apiFetch) => {
    const returnData = null;
    await fetch(`${apiFetch}`)
      .then((response) => {
        // Check if the request was successful
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('Failed to retrieve the image.');
        }
      })
      .then((blob) => {
        const reader = new FileReader();

        // Define a callback function for when the file is loaded
        reader.onloadend = () => {
          // Use the FileReader's result as the image source
          const link = reader.result;
        };

        // Start reading the blob as a data URL
        reader.readAsDataURL(blob);
        console.log(blob);
        credentials['imageProfile'] = blob;
      })
      .catch((error) => {
        console.error(error);
      });
    return returnData;
  };

  const handleClickRegis = async (e) => {
    e.preventDefault();
    dispatch({ type: 'REGIS_START' });
    try {
      await imageToFile(`https://ui-avatars.com/api/?name=${credentials.username}&background=random&format=png`);

      console.log(credentials, credentials.imageProfile);
      const res = await axios.post(
        '/auth/register',
        {
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
          imageProfile: credentials.imageProfile,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('user has been created!');
      // window.location.href = '/login';
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
      await imageToFile(`https://ui-avatars.com/api/?name=${user.displayName}&background=random&format=png`);

      console.log(user, credentials);

      const response = await axios.post('/auth/regisAndLogin', {
        email: user.email,
        username: `${user.displayName}`,
        password: user.uid,
        imageProfile: credentials.imageProfile,
      });

      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.details });
      // window.location.href = '/';
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
    <div className="mainLogin">
      {console.log(React.version)}

      {credentials?.imageProfile ? <img src={credentials?.imageProfile} alt="" /> : ''}
      <Navbar />
      <div className="subMainLogin">
        <div className="subMainImageLogin"></div>
        <div className="formSideLogin">
          <div className="containerLogin">
            <form className="formLogin">
              <div className="headLogin">
                <p className="LoginTitle"> ITTU </p>
              </div>
              <div>
                <div>
                  <label>Username</label>
                  <input label="Username" type="text" id="username" onChange={handleChange} placeholder="Username" />
                </div>
                {!isRegistered && (
                  <div>
                    <label>Email</label>
                    <input label="Email" type="text" id="email" onChange={handleChange} placeholder="Email" />
                  </div>
                )}
                <div>
                  <label>Password</label>
                  <input label="Password" type="password" id="password" onChange={handleChange} placeholder="Password" />
                </div>
                {/* <p className="error">{errors.password?.type === 'required' && 'Password is required'}</p> */}
              </div>
              <div className="formFooterLogin">
                {isRegistered ? (
                  <button className="btnSubmitLogin" disabled={loading} onClick={handleClickLogin}>
                    Login
                  </button>
                ) : (
                  <button className="btnSubmitLogin" disabled={loading} onClick={handleClickRegis}>
                    Register
                  </button>
                )}
                <button className="btnSubmitLogin google" disabled={loading} onClick={handleClickLoginGoogle}>
                  {isRegistered ? 'Login with Google' : 'Register with Google'}
                  <FcGoogle size={'24px'} />
                </button>
              </div>
              {error && <span>{error.message}</span>}
              <p className="messageLogin">
                {!isRegistered ? 'Already have account ? ' : 'Don’t have account ? '}
                <Link className="linkAneh" to={'/login'}>
                  <button className="btnAccountLogin" onClick={() => setStatus(!isRegistered)}>
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
