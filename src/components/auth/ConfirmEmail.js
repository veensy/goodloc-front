import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions";
import { Link } from "react-router-dom";
import "../Styles/welcome.css";

class ConfirmEmail extends Component {
  onSubmitConfirmEmail = formProps => {

    const TokenForConfirmEmail = this.props.match.params.TokenForConfirmEmail;

    this.props.confirmEmail(formProps, {
      TokenForConfirmEmail: TokenForConfirmEmail
    });
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
  // resetPage = () => {
  //   if (this.props.validate) {
  //     setTimeout(() => this.props.history.push("/"), 8000);
  //   }
  // };
  render() {
    //this.resetPage();
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
            <form onSubmit={handleSubmit(this.onSubmitConfirmEmail)}>
              <h3 className="uk-card-title color-text ">
                <span className="color-text ">Please confirm your email </span>
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
                      Confirm
                    </button>
                  </div>
                </div>
                <p>
                  If you are not register yet, go to the{" "}
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
  console.log(state);
  
  return {
    errorMessage: state.auth.errorMessageConfirmEmail,
    validate: state.auth.validatedEmail
  };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "confirmEmail" })
)(ConfirmEmail);
