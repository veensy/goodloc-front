import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions";
import { Link } from "react-router-dom";

class Signin extends Component {
  onSubmitSignIn = formProps => {
    this.props.signin(formProps)
  };

  resendNewEmailVerificationLink = () => {
    let email = this.props.email
    this.props.resendEmailLink(email)
  };
  renderNewLink = () => {
    if (this.props.validate[0] === "Your account has not been verified.") {
      return (
        <div>
          If you already register we can resend to you a{" "}
          <span className ="resendEmailVerifLink"onClick={this.resendNewEmailVerificationLink}>new link</span>,
          and you should probalbly check in your spam.
        </div>
      );
    }
  };
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
        <form onSubmit={handleSubmit(this.onSubmitSignIn)}>
          <h3 className="uk-card-title color-text">
            <span className="color-text">Already register ? Login Me </span>
          </h3>

          <div className="uk-card-body">
            <Field
              name="email"
              component={inputUiKitEmail("icon: mail", "Email", "email")}
              ref="email"
              withRef
            />
            <Field
              name="password"
              component={inputUiKitEmail("icon: lock", "Password", "password")}
              type="password"
              ref="password"
              withRef
            />
            <div className="uk-margin">
              <div className="uk-inline">
                <button className="uk-button uk-button-default color-button">
                  Log In
                </button>
              </div>
            </div>
            <Link to="/forgotpassword" style={{ textDecoration: "none" }}>
              <span className="color-text">forgot password ?</span>
            </Link>
          </div>
          <div className="uk-alert-primary uk-text-center messageBox" uk-alert>
            {this.notif()}
            {this.renderNewLink()}
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessageSignIn,
    validate: state.auth.validatedSignIn,
    email: state.auth.email
  };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signin" })
)(Signin);
