import * as React from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import "./App.css";
import { baseUrl } from "./Setting";

interface Props {
  form: WrappedFormUtils;
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
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
    fetch(baseUrl + "/api/user/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state.request)
    }).then(response => {
      if (response.status == 200) {
        response.json().then(r => {
          message.success("登录成功" + r.id);
          localStorage.setItem("user_id", r.id);
        });
      } else {
        response.json().then(r => message.error(r.msg));
      }
    });
  };

  register = e => {
    fetch(baseUrl + "/api/user", {
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

export const WrappedHorizontalLoginForm = Form.create({
  name: "horizontal_login"
})(HorizontalLoginForm);
