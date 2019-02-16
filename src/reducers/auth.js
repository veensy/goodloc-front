import {
  AUTH_USER,
  AUTH_ERROR_SIGNIN,
  AUTH_ERROR_SIGNUP,
  AUTH_FORGOT_PASSWORD,
  AUTH_RESET_PASSWORD
} from "../actions/types";

export const INITIAL_STATE = {
  authenticated: "",
  errorMessageSignIn: [],
  errorMessageSignUp: [],
  errorMessageForgotPassword: "",
  errorMessageResetPassword: false,
  validatedSignIn: "",
  validatedSignUp: "",
  validatedForgotPassword: "",
  validatedResetPassword: "",
  email: "",
  isLoading: true,
  update: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.status,
        validatedSignUp: action.validatedSignUp,
        validatedSignIn: action.validatedSignIn,
        validatedForgotPassword: action.validatedForgotPassword,
        validatedResetPassword: action.validatedResetPassword,
        email: action.email,
        isLoading: action.isLoading,
        update: action.update
      };
    case AUTH_ERROR_SIGNIN:
      return { ...state, errorMessageSignIn: action.errorMessageSignIn };
    case AUTH_ERROR_SIGNUP:
      return { ...state, errorMessageSignUp: action.errorMessageSignUp };
    case AUTH_FORGOT_PASSWORD:
      return {
        ...state,
        errorMessageForgotPassword: action.errorMessageForgotPassword
      };
    case AUTH_RESET_PASSWORD:
      return {
        ...state,
        errorMessageResetPassword: action.errorMessageResetPassword
      };
    default:
      return state;
  }
};
