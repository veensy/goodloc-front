import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions";
import "../Styles/Sign.css";

export class ResetPassword extends Component {
  async componentDidMount() {
    const newToken = this.props.match.params.newToken;
    this.props.resetPassword({ newToken: newToken });
  }
  notif = () => {
    if (!this.props.validate && !this.props.errorMessage) {
      return <span data-uk-spinner="" />;
    } else {
      return (
        <div>
          {this.props.validate ? this.props.validate : this.props.errorMessage}
        </div>
      );
    }
  };
  onSubmitReset = formProps => {
    this.props.updatePassword(formProps);
  };
  redirected = () => {
    if (this.props.validate) {
      setTimeout(() => this.props.history.push("/"), 8000);
    }
  };
  render() {
    this.redirected();
    const { handleSubmit } = this.props;
    const inputUiKitEmail = (icon, placeholder, type) => ({ input }) => {
      return (
        <div className="uk-margin">
          <div className="uk-inline">
            <span className="uk-form-icon color-icon" uk-icon={icon} />
            <input
              className="uk-input color-input"
              type={type}
              {...input}
              placeholder={placeholder}
            />
          </div>
        </div>
      );
    };
    if (this.props.error) {
      return (
        <div>
          <div className="uk-flex uk-flex-center uk-position-center">
            <div className="uk-card uk-card-default uk-card-body">
              <h4>
                Problem resetting password. Please send another reset link.
              </h4>
              <div className="uk-flex uk-flex-center uk-flex-wrap">
                <Link to="/forgotpassword">
                  <button className="uk-button uk-button-default color-button">
                    Resend a link
                  </button>
                </Link>

                <Link to="/">
                  <button className="uk-button uk-button-default color-button">
                    SignIn/SignUp
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.isLoading) {
      return (
        <div className="uk-flex uk-flex-center uk-position-center">
          <div className="uk-card uk-card-default uk-card-body">
            <div uk-spinner />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="uk-flex uk-flex-center uk-position-center">
            <div className="uk-card uk-card-default uk-card-body">
              <form onSubmit={handleSubmit(this.onSubmitReset)}>
                <Field
                  name="email"
                  component={inputUiKitEmail("icon: email", "email", "email")}
                  type="password"
                  ref="password"
                  withRef
                />
                <Field
                  name="password"
                  component={inputUiKitEmail(
                    "icon: lock",
                    "Password",
                    "password"
                  )}
                  type="password"
                  ref="password"
                  withRef
                />
                <div className="uk-margin">
                  <div className="uk-inline">
                    <button className="uk-button uk-button-default color-button">
                      Update password
                    </button>
                  </div>
                </div>
                <div className="uk-alert-primary uk-text-center" uk-alert>
                  <p>{this.notif()}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessageResetPassword,
    validate:
      state.auth.validatedResetPassword || state.auth.validatedUpdatePassword
  };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "resetPassword" })
)(ResetPassword);
