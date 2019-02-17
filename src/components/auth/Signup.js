import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions";

import "../Styles/Sign.css";

class Signup extends Component {
  notif = () => {
    if (!this.props.validate && !this.props.errorMessage) {
      return <span data-uk-spinner="" />;
    } else {
      return (
        <div>
          {this.props.validate ? (
            this.props.validate
          ) : (
            <ul>
              {this.props.errorMessage.map(message => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          )}
        </div>
      );
    }
  };

  onSubmitSignUp = formProps => {
    this.props.signup(formProps, () => {
      this.props.history.push("/feature");
    });
  };

  render() {
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

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmitSignUp)}>
          <h3 className="uk-card-title color-text">
            <span className="color-text">Create a New Account</span>
          </h3>

          <div className="uk-card-body">
            <Field
              name="firstName"
              component={inputUiKitEmail("icon: user", "Firstname", "text")}
            />
            <Field
              name="lastName"
              component={inputUiKitEmail("icon: user", "Lastname", "text")}
            />
            <Field
              name="email"
              component={inputUiKitEmail("icon: mail", "Email", "email")}
              autoComplete="Email"
            />
            <Field
              name="password"
              component={inputUiKitEmail("icon: lock", "Password", "password")}
            />
            <Field
              name="confirm_password"
              component={inputUiKitEmail(
                "icon: lock",
                "Confirm Password",
                "password"
              )}
            />

            <div className="uk-margin">
              <div className="uk-inline">
                <button className="uk-button uk-button-default color-button">
                  Join Us
                </button>
              </div>
            </div>
          </div>
          <div className="uk-alert-primary uk-text-center" uk-alert>
            <p>{this.notif()}</p>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessageSignUp,
    validate: state.auth.validatedSignUp
  };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signup" })
)(Signup);
