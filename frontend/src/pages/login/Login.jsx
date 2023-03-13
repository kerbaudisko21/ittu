import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendar } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/navbar/Navbar";
import Input from "../../components/input/Input";

const Login = (props) => {
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
    // (props.isRegistered = true),
  ]);

  return (
    <div className="main">
      <Navbar />
      <div className="subMain">
        <div className="subMainImage"></div>
        <div className="formSide">
          <div className="container">
            <form className="form">
              <p className="headerTitle"> ITTU </p>
              <Input label="Username" type="text" placeholder="Username" />
              {!props.isRegistered && <Input label="Email" type="email" placeholder="Email@email.com" />}
              <Input label="Password" type="password" placeholder="Password" />
              <div className="formFooter">
                <button type="submit">{props.isRegistered ? "Login" : "Sign Up"}</button>
                <p>
                  {!props.isRegistered ? "Already have account ? " : "Don’t have account ? "}
                  {!props.isRegistered ? <a href="/login">Log in</a> : <a href="/regis">Sign up</a>}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
