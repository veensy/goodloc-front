import React from "react";
import Signup from "./auth/Signup";
import "./Styles/welcome.css";
import { Link } from "react-router-dom";
import Signin from "./auth/Signin";

export default function Welcome() {
  return (
    <div>
      
      <Link to="/" style={{ textDecoration: "none" }}>
        <h3 className="welcome">Welcome to GoodLoc</h3>
      </Link>
      <p className="uk-text-center">
        Come join the GoodLoc community! Let's set up your account.
      </p>

      
        <div className="uk-flex uk-flex-center">
          <div className="uk-card uk-card-default uk-card-body">
            <Signup />
          </div>
          <div className="uk-card uk-card-default uk-card-body">
            <Signin />
          </div>
          </div>
        <p className="uk-text-small uk-text-center">
          By submitting this form, you agree to GoodLoc{" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="color-text">Terms and Services.</span>
          </Link>
        </p>
      

    </div>
  );
}
