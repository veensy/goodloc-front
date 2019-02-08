import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions";

class Signup extends Component {
  onSubmit = formProps => {
    console.log(formProps);
    this.props.signup(formProps, () => {
      this.props.history.push("/feature");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    const inputUiKitEmail = (icon, placeholder) => ({ input }) => {
      return (
        <div className="uk-margin">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon={icon} />
            <input
              className="uk-input my-color"
              type="text"
              {...input}
              placeholder={placeholder}
            />
          </div>
        </div>
      );
    };

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-position-center">
            <h3 className="uk-card-title">Create a New Account</h3>
            <div className="uk-card-body">
              <Field
                name="username"
                type="text"
                component={inputUiKitEmail("icon: user", "Username")}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="off"
              />
              <Field
                name="email"
                type="text"
                component={inputUiKitEmail("icon: mail", "Email")}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="off"
              />
              <Field
                name="password"
                type="password"
                component={inputUiKitEmail("icon: lock", "Password")}
                autoComplete="off"
              />
              <Field
                name="password"
                type="password"
                component={inputUiKitEmail("icon: lock", "Confirm Password")}
                autoComplete="off"
              />
              By submitting this form you agree to GoodLoc{" "}
              <button className="uk-button uk-button-text my-color">
                Terms and Services.
              </button>
              <div className="uk-margin">
                <div className="uk-inline">
                  <button className="uk-button uk-button-default">
                    Join Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>{this.props.errorMessage}</div>
          <button>Sign up</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { errorMessage: state.auth.errorMessage };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signup" })
)(Signup);
