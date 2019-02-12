import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";


class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout">Sign Out</Link>
          <Link to="/feature">Feature</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup"></Link>
          <Link to="/signin"></Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="header">
        <Link to="/"></Link>
        {this.renderLinks()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated };
};
export default connect(
  mapStateToProps,
  actions
)(Header);
