import * as React from "react";
import {
  Button,
  Modal,
  Form,
  Icon,
  Input,
  Checkbox,
  message
} from "antd";
import { bhistory } from "../index";
import { WrappedFormUtils } from "antd/lib/form/Form";

interface Props {
  form: WrappedFormUtils;
}

class HorizontalLoginForm extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {
      request: {
        username: "",
        password: ""
      }
    };
  }

  state: {
    request: {
      username: string;
      password: string;
    };
  };

  componentDidMount() {
    // To disabled submit button at the beginning.
    //this.props.form.validateFields();
  }

  login = e => {
    if (this.state.request.username == "" || this.state.request.password == "")
      message.warn("用户名和密码不能为空");
    else
      fetch("/api/user/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.state.request)
      }).then(response => {
        if (response.status == 200) {
          response.json().then(r => {
            message.success("登录成功");
            localStorage.setItem("user_id", r.id);
            localStorage.setItem("user_type", r.type);
            setTimeout(() => {
              bhistory.push("/");
              window.location.reload();
            }, 1000);
          });
        } else {
          response.json().then(r => message.error(r.msg));
        }
      });
  };

  register = e => {
    if (this.state.request.username == "" || this.state.request.password == "")
      message.warn("用户名和密码不能为空");
    else
      fetch("/api/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.state.request)
      }).then(response => {
        if (response.status == 200) {
          var j = response.json().then(r => message.success(r.msg));
        } else {
          message.error(response.json().then(r => r.msg));
        }
      });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError =
      isFieldTouched("userName") && getFieldError("userName");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <Form onSubmit={this.login} className="login-form">
        <Form.Item>
          <Input
            value={this.state.request.username}
            onChange={e => {
              var tmp = this.state.request;
              tmp.username = e.target.value;
              this.setState({
                product: tmp
              });
            }}
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item>
          <Input
            value={this.state.request.password}
            onChange={e => {
              var tmp = this.state.request;
              tmp.password = e.target.value;
              this.setState({
                product: tmp
              });
            }}
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>记住此次登陆</Checkbox>)}
          <a className="login-form-forgot" href="" style={{ float: "right" }}>
            忘记密码
          </a>
          <Button type="primary" onClick={this.login} style={{ width: "100%" }}>
            登陆
          </Button>
          或者 <Button onClick={this.register}>立即注册!</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({
  name: "horizontal_login"
})(HorizontalLoginForm);

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
