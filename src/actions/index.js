import axios from "axios";
import {
  AUTH_USER,
  AUTH_ERROR_SIGNIN,
  AUTH_ERROR_SIGNUP,
  AUTH_FORGOT_PASSWORD,
  AUTH_RESET_PASSWORD
} from "./types";

const l = "http://localhost:3090/";
export const resetPassword = (newToken, callback) => async dispatch => {
  try {
    console.log("test", newToken);
    await axios
      .get(`${l}resetpassword`, { params: newToken  })
      .then(response => {
        console.log("response data", response);
        if (response.data === "Password reset link is ok") {
          console.log(response.data);

          dispatch({
            type: AUTH_USER,
            email: response.data.email,
            validatedResetPassword: "Password reset link is ok",
            update: false,
            isLoading: false,
            errorMessageResetPassword: false
          });
        } else {
          dispatch({
            type: AUTH_RESET_PASSWORD,
            update: false,
            isLoading: false,
            errorMessageResetPassword: true
          });
        }
      });
  } catch (error) {
    console.log("if error params :", newToken, "error :", error);
  }
};
export const forgotPassword = (formProps, callback) => async dispatch => {
  try {
    console.log("first log", formProps);
    console.log("-----------------------------------");

    const response = await axios.post(`${l}forgotpassword`, formProps);
    console.log("secon log", response);
    console.log("-----------------------------------");

    if (response.data === "Email not in db") {
      dispatch({
        type: AUTH_FORGOT_PASSWORD,
        errorMessageForgotPassword:
          "This email is not register, please verify the email you provide or go back the sign up page "
      });
    } else if (response.data === "Recovery email sent") {
      dispatch({
        type: AUTH_USER,
        validatedForgotPassword: "Recovery email sent"
      });
    } else if (response.data === "You must provide an email") {
      dispatch({
        type: AUTH_FORGOT_PASSWORD,
        errorMessageForgotPassword: "You must provide an email"
      });
    } else if (response.data === "The email you provide is not valid") {
      dispatch({
        type: AUTH_USER,
        validatedForgotPassword: "The email you provide is not valid"
      });
    }
  } catch (error) {
    if (!formProps.email) {
      console.log("third log", formProps);
      console.log("-----------------------------------");

      dispatch({
        type: AUTH_FORGOT_PASSWORD,
        errorMessageForgotPassword: "You must provide an email"
      });
    }
  }
};

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${l}signup`, formProps);
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
      if (!form.firstName) {
        message = [...message, "You must provide your firstname"];
      }
      if (!form.lastName) {
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
    const response = await axios.post(`${l}signin`, formProps);
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
