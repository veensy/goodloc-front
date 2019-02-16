import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "../Styles/welcome.css";

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
class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = { modalIsOpen: false };
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
  onSubmitForgotPassword = formProps => {
    this.props.forgotPassword(formProps, () => {});
  };
  renderErrorMessage = () => {
    return (
      <div>
        {this.props.validate ? this.props.validate : this.props.errorMessage}
      </div>
    );
  };
  resetPage = () => {
    if (this.props.validate && this.state.modalIsOpen === false) {
      this.props.history.push("/");
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
                    <button
                      onClick={this.openModal}
                      className="uk-button uk-button-default color-button"
                    >
                      Send Password Reset Email
                    </button>
                    <Modal
                      isOpen={this.state.modalIsOpen}
                      onRequestClose={this.closeModal}
                      style={customStyles}
                      contentLabel=""
                    >
                      <button
                        className="close-button"
                        onClick={this.closeModal}
                      >
                        <b>X</b>
                      </button>

                      {this.renderErrorMessage()}
                    </Modal>
                  </div>
                </div>
                <p>
                  If you do not need to reset your password, go to the{" "}
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="color-text">Sign page</span>
                  </Link>
                </p>
              </div>

              <div />
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
