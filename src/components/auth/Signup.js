import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions";
import Modal from "react-modal";

import "../Styles/Sign.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class Signup extends Component {
  constructor() {
    super();
    this.state = { modalIsOpen: false, value: {} };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentWillMount() {
    Modal.setAppElement("body");
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onSubmitSignUp = formProps => {
    console.log("signup");

    this.props.signup(formProps, () => {
      this.props.history.push("/feature");
    });
  };

  renderErrorMessage = () => {
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
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
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
              autoCorrect="off"
              spellCheck="off"
              autoComplete="off"
            />
            <Field
              name="lastName"
              component={inputUiKitEmail("icon: user", "Lastname", "text")}
              autoCorrect="off"
              spellCheck="off"
              autoComplete="off"
            />
            <Field
              name="email"
              component={inputUiKitEmail("icon: mail", "Email", "email")}
              autoCorrect="off"
              spellCheck="off"
              autoComplete="Email"
            />
            <Field
              name="password"
              component={inputUiKitEmail("icon: lock", "Password", "password")}
              autoComplete="off"
              
            />
            <Field
              name="confirm_password"
              component={inputUiKitEmail(
                "icon: lock",
                "Confirm Password",
                "password"
              )}
              autoComplete="off"
            />

            <div className="uk-margin">
              <div className="uk-inline">
                <button
                  className="uk-button uk-button-default color-button"
                  onClick={this.openModal}
                >
                  Join Us
                </button>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel=""
                >
                  <button className="close-button" onClick={this.closeModal}>
                    <b>X</b>
                  </button>

                  {this.renderErrorMessage()}
                </Modal>
              </div>
            </div>
          </div>

          <div />
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
