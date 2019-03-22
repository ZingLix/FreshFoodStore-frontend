import * as React from "react";
import { Form, Button, Modal } from "antd";
import { WrappedHorizontalLoginForm } from "./LoginForm";
import "./App.css";

export class LoginWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false
    };
  }
  state = {
    visible: false,
    loading: false
  };

  private loginWindowCancel = () => {
    this.setState({
      visible: false,
      loading: false
    });
  };

  public open = () => {
    this.setState({
      visible: true
    });
  };

  public render() {
    return (
      <Modal
        visible={this.state.visible}
        title="登陆"
        onCancel={this.loginWindowCancel}
        footer={null}
      >
        <WrappedHorizontalLoginForm />
      </Modal>
    );
  }
}
