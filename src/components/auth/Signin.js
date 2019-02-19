import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions";
import { Link } from "react-router-dom";

class Signin extends Component {
  onSubmitSignIn = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push("/feature");
    });
  };
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
          <div className="uk-alert-primary uk-text-center" uk-alert>
            {this.notif()}
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessageSignIn,
    validate: state.auth.validatedSignIn
  };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signin" })
)(Signin);
