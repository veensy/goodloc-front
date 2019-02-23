import {
  AUTH_USER,
  AUTH_ERROR_SIGNIN,
  AUTH_ERROR_SIGNUP,
  AUTH_FORGOT_PASSWORD,
  AUTH_RESET_PASSWORD,
  AUTH_UPDATE_PASSWORD,
  AUTH_CONFIRM_EMAIL,
  AUTH_RESEND_EMAIL_LINK
} from "../actions/types";

export const INITIAL_STATE = {
  authenticated: "",
  errorMessageSignIn: [],
  errorMessageSignUp: [],
  errorMessageConfirmEmail: [],
  errorMessageForgotPassword: "",
  errorMessageResetPassword: false,
  errorMessageUpdatePassword: "",
  validatedEmail: "",
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
        validatedEmail: action.validatedEmail,
        validatedSignUp: action.validatedSignUp,
        validatedSignIn: action.validatedSignIn,
        validatedForgotPassword: action.validatedForgotPassword,
        validatedResetPassword: action.validatedResetPassword,
        validatedUpdatePassword: action.validatedUpdatePassword,
        validatedResendEmailLink: action.validatedResendEmailLink,
        email: action.email,
        isLoading: action.isLoading,
        update: action.update
      };
    case AUTH_ERROR_SIGNIN:
      return { ...state, errorMessageSignIn: action.errorMessageSignIn };
    case AUTH_CONFIRM_EMAIL:
      return {
        ...state,
        errorMessageConfirmEmail: action.errorMessageConfirmEmail
      };
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
    case AUTH_RESEND_EMAIL_LINK:
      return {
        ...state,
        errorMessageResendEmailLink: action.errorMessageResendEmailLink
      };
    default:
      return state;
  }
};
