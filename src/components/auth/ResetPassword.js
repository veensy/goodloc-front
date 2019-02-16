import React, { Component } from "react";
import { Link } from "react-router-dom";
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

export class ResetPassword extends Component {
  constructor() {
    super();
    this.state = { modalIsOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  async componentDidMount() {
    const newToken = this.props.match.params.newToken;
    //console.log(newToken);
    this.props.resetPassword({ newToken: newToken });
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
  onSubmitReset = formProps => {
    console.log(formProps, "test1");

    this.props.resetPassword(formProps, () => {
      //this.props.history.push("/feature");
    });
  };
  renderErrorMessage = () => {
    return (
      <div>
        {this.props.validate ? this.props.validate : this.props.errorMessage}
      </div>
    );
  };

  render() {
    console.log(this.props.validate);
    console.log(this.props.errorMessage);

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
      return <div uk-spinner />;
    } else {
      return (
        <div>
          <form onSubmit={handleSubmit(this.onSubmitReset)}>
            <Field
              name="password"
              component={inputUiKitEmail("icon: lock", "Password", "password")}
              type="password"
              ref="password"
              withRef
            />
            <div className="uk-margin">
              <div className="uk-inline">
                <button
                  onClick={this.openModal}
                  className="uk-button uk-button-default color-button"
                >
                  Update password
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
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log(state);

  return {
    errorMessage: state.auth.errorMessageResetPassword,
    validate: state.auth.validatedResetPassword
  };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "resetPassword" })
)(ResetPassword);
