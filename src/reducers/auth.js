import {
  AUTH_USER,
  AUTH_ERROR_SIGNIN,
  AUTH_ERROR_SIGNUP,
  AUTH_FORGOT_PASSWORD
} from "../actions/types";

export const INITIAL_STATE = {
  authenticated: "",
  errorMessageSignIn: [],
  errorMessageSignUp: [],
  validatedSignIn: "",
  validatedSignUp: "",
  validatedForgotPassword: "",
  errorMessageForgotPassword: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.status,
        validatedSignUp: action.validatedSignUp,
        validatedSignIn: action.validatedSignIn,
        validatedForgotPassword: action.validatedForgotPassword
      };
    case AUTH_ERROR_SIGNIN:
      return { ...state, errorMessageSignIn: action.errorMessageSignIn };
    case AUTH_ERROR_SIGNUP:
      return { ...state, errorMessageSignUp: action.errorMessageSignUp };
    case AUTH_FORGOT_PASSWORD:
      return { ...state, errorMessageForgotPassword: action.errorMessageForgotPassword };
    default:
      return state;
  }
};
