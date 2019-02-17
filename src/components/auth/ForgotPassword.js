import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions";
import { Link } from "react-router-dom";
import "../Styles/welcome.css";

class ForgotPassword extends Component {
  onSubmitForgotPassword = formProps => {
    this.props.forgotPassword(formProps);
  };

  notif = () => {
    if (!this.props.validate && !this.props.errorMessage) {
      return <span data-uk-spinner="" />;
    } else if (this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>;
    } else
      return (
        <div>
          <span data-uk-spinner="" />
          <br />
          {this.props.validate}
          <br />
          You will be redirected to the login page
        </div>
      );
  };
  resetPage = () => {
    if (this.props.validate) {
      setTimeout(() => this.props.history.push("/"), 8000);
    }
  };
  render() {
    this.resetPage();
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
        <div className="uk-flex uk-flex-center uk-position-center">
          <div className="uk-card uk-card-default uk-card-body">
            <form onSubmit={handleSubmit(this.onSubmitForgotPassword)}>
              <h3 className="uk-card-title color-text ">
                <span className="color-text ">forgot password ? </span>
              </h3>

              <div className="uk-card-body">
                <Field
                  name="email"
                  component={inputUiKitEmail("icon: mail", "Email", "email")}
                  ref="email"
                  withRef
                />

                <div className="uk-margin">
                  <div className="uk-inline">
                    <button className="uk-button uk-button-default color-button">
                      Send Password Reset Email
                    </button>
                  </div>
                </div>
                <p>
                  If you do not need to reset your password, go to the{" "}
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="color-text">Sign page</span>
                  </Link>
                </p>
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
const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessageForgotPassword,
    validate: state.auth.validatedForgotPassword
  };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "forgotPassword" })
)(ForgotPassword);
