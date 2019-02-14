import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions";
import Modal from "react-modal";
import { Link } from 'react-router-dom'

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

class Signin extends Component {
  constructor() {
    super();
    this.state = { modalIsOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
  
    
    console.log(this.refs.email)
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
  onSubmitSignIn = formProps => {
    console.log(formProps, "test1");

    this.props.signin(formProps, () => {
      this.props.history.push("/feature");
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
              ref="email"  withRef
 
            />
            <Field
              name="password"
              component={inputUiKitEmail("icon: lock", "Password", "password")}
              type="password"
              ref="password" withRef
  
            />
            <div className="uk-margin">
              <div className="uk-inline">
                <button
                  onClick={this.openModal}
                  className="uk-button uk-button-default color-button"
                >
                  Log In
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
            <Link to="/forgotPassword" style={{ textDecoration: "none" }}>
            <span className="color-text">forgot password ?</span>
          </Link>
          </div>

          <div />
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
