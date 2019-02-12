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
    this.state = { modalIsOpen: false };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }
  afterOpenModal() {
    // this.subtitle.style.color = "#f00";
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onSubmitSignUp = formProps => {
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
            <span className="uk-form-icon color-icon" uk-icon={icon} />
            <input
              className="uk-input color-input"
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
        <form onSubmit={handleSubmit(this.onSubmitSignUp)}>
          <h3 className="uk-card-title color-text">
            <span className="color-text">Create a New Account</span>
          </h3>

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
              name="confirm_password"
              type="password"
              component={inputUiKitEmail("icon: lock", "Confirm Password")}
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
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel=""
                >
                  
                      <button
                        class="close-button"
                     
                        onClick={this.closeModal}
                       
                      ><b>X</b></button>
               

                  {this.props.validate
                    ? "Well done! " + this.props.validate
                    : "Ooooops! " + this.props.errorMessage}
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
