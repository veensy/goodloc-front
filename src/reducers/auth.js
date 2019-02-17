import {
  AUTH_USER,
  AUTH_ERROR_SIGNIN,
  AUTH_ERROR_SIGNUP,
  AUTH_FORGOT_PASSWORD,
  AUTH_RESET_PASSWORD,
  AUTH_UPDATE_PASSWORD
} from "../actions/types";

export const INITIAL_STATE = {
  authenticated: "",
  errorMessageSignIn: [],
  errorMessageSignUp: [],
  errorMessageForgotPassword: "",
  errorMessageResetPassword: false,
  errorMessageUpdatePassword: "",
  validatedSignIn: "",
  validatedSignUp: "",
  validatedForgotPassword: "",
  validatedResetPassword: "",
  validatedUpdatePassword: "",
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
        validatedUpdatePassword: action.validatedUpdatePassword,
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
    case AUTH_UPDATE_PASSWORD:
      return {
        ...state,
        errorMessageUpdatePassword: action.errorMessageUpdatePassword
      };
    default:
      return state;
  }
};
