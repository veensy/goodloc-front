import axios from "axios";
import { AUTH_USER, AUTH_ERROR_SIGNIN, AUTH_ERROR_SIGNUP } from "./types";

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signup",
      formProps
    );
    if (response.data.error === "Email is in use") {
      dispatch({
        type: AUTH_USER,
        status: "",
        validatedSignUp: "This email is already register"
      });
    } else {
      dispatch({
        type: AUTH_USER,
        status: response.data.token,
        validatedSignUp: "Inscription Validée"
      });
      localStorage.setItem("token", response.data.token);
      callback();
    }
  } catch (error) {
    const validation = (form = formProps) => {
      let message = [];
      if (!form.firstname) {
        message = [...message, "You must provide your firstname"];
      }
      if (!form.lastname) {
        message = [...message, "You must provide your lastname"];
      }
      if (!form.email) {
        message = [...message, "You must provide an email"];
      }
      if (!form.password && !form.confirm_password) {
        message = [...message, "You must provide a password"];
      }
      if (
        form.password !== form.confirm_password ||
        !form.password ||
        !form.confirm_password
      ) {
        message = [
          ...message,
          "You must provide the same password for both field"
        ];
      }

      dispatch({
        type: AUTH_ERROR_SIGNUP,
        errorMessageSignUp: message
      });
    };
    validation();
  }
};
export const signout = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    token: ""
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
      validatedSignIn: "Valid login credentials"
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
