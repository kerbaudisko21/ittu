import React, { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import "./login.css";
import Navbar from "../../components/navbar/Navbar";
// import Input from "../../components/input/Input";

const Login = () => {
  const [isRegistered, setStatus] = useState(false);
  const { register, handleSubmit } = useForm();
  // const methods = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };

  // window.addEventListener("scroll", setRegist);

  return (
    <div className="main">
      <Navbar />
      <div className="subMain">
        <div className="subMainImage"></div>
        <div className="formSide">
          <div className="container">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <p className="LoginTitle"> ITTU </p>
              <div className="in">
                <label for="user" class="label">
                  Username
                </label>
                <input type="text" {...register("username")} placeholder="Username" />
              </div>
              {!isRegistered && (
                <div className="in">
                  <label for="user" class="label">
                    Email
                  </label>
                  <input type="text" {...register("email")} placeholder="Email" />
                </div>
              )}
              <div className="in">
                <label for="user" class="label">
                  Password
                </label>
                <input type="password" {...register("password")} placeholder="Password" />
              </div>

              <div className="formFooter">
                <button className="btnSubmit" type="submit">
                  {isRegistered ? "Login" : "Sign Up"}
                </button>
              </div>
            </form>
            <p>
              {!isRegistered ? "Already have account ? " : "Don’t have account ? "}
              <button className="btnAccount" onClick={() => setStatus(!isRegistered)}>
                {!isRegistered ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
