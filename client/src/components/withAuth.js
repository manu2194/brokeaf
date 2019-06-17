import React, { Component } from "react";
import AuthHelperMethods from "../utilities/AuthHelperMethods";

export default function withAuth(AuthComponent) {
  const Auth = new AuthHelperMethods();

  return class AuthWrapped extends Component {
    state = {
      confirm: null,
      loaded: false
    };

    componentDidMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace("/login");
      } else {
        try {
          const confirm = Auth.getConfirm();
          console.log("User id: ", confirm.id);
          this.setState({ confirm: confirm, loaded: true });
        } catch (err) {
          console.log(err);
          Auth.logout();
          this.props.history.replace("/login");
        }
      }
    }

    render() {
      if (this.state.loaded === true) {
        if (this.state.confirm) {
          console.log("Token authenticated");
          return (
            <AuthComponent
              history={this.props.history}
              confirm={this.state.confirm}
            />
          );
        } else {
          console.log("Token not authenticated");
          return null;
        }
      } else {
        return null;
      }
    }
  };
}
