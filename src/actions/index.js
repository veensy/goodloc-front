import axios from "axios";
import { AUTH_USER, AUTH_ERROR_SIGNIN, AUTH_ERROR_SIGNUP } from "./types";

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signup",
      formProps
    );
    dispatch({
      type: AUTH_USER,
      status: response.data.token,
      validatedSignUp: "Inscription Validée"
    });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR_SIGNUP,
      errorMessageSignUp:
        "You must provide an email and the same password for both field"
    });
  }
};
export const signout = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    payload: ""
  };
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signin",
      formProps
    );
    dispatch({
      type: AUTH_USER,
      status: response.data.token,
      validatedSignIn: "Identification Validée"
    });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR_SIGNIN,
      errorMessageSignIn: "Invalid login credentials"
    });
  }
};
