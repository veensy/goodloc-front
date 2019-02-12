import {
  AUTH_USER,
  AUTH_ERROR_SIGNIN,
  AUTH_ERROR_SIGNUP
} from "../actions/types";

const INITIAL_STATE = {
  authenticated: "",
  errorMessageSignIn: "",
  errorMessageSignUp: "",
  validatedSignIn: "",
  validatedSignUp: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.status,
        validatedSignUp: action.validatedSignUp,
        validatedSignIn: action.validatedSignIn
      };
    case AUTH_ERROR_SIGNIN:
      return { ...state, errorMessageSignIn: action.errorMessageSignIn };
    case AUTH_ERROR_SIGNUP:
      return { ...state, errorMessageSignUp: action.errorMessageSignUp };
    default:
      return state;
  }
};
