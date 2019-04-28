import * as React from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  message,
  Button,
  AutoComplete
} from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
interface Props {
  form: WrappedFormUtils;
}

class UserInfoForm extends React.Component<Props, {}> {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  componentDidMount() {
    var id = localStorage.getItem("user_id");
    if (id == null) message.error("请重新登录");
    else
      fetch("/api/user/" + id + "/info")
        .then(r => {
          return r.json();
        })
        .then(info => {
          delete info.id;
          this.props.form.setFieldsValue(info);
        });
  }

  handleSubmit = e => {
    e.preventDefault();
    var id = localStorage.getItem("user_id");
    if (id == null) message.error("请重新登录");
    else {
      const form = this.props.form;
      var reqbody = {
        email: form.getFieldValue("email"),
        address: form.getFieldValue("address"),
        nickname: form.getFieldValue("nickname"),
        phone: form.getFieldValue("phone"),
        realname: form.getFieldValue("realname")
      };
      fetch("/api/user/" + id + "/info", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(reqbody)
      }).then(message.success("已修改"));
    }
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 3
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="邮箱" labelCol={{ span: 3 }}>
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input style={{ width: "100%", maxWidth: "500px" }} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              昵称&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          labelCol={{ span: 3 }}
        >
          {getFieldDecorator("nickname", {
            rules: []
          })(<Input style={{ width: "100%", maxWidth: "500px" }} />)}
        </Form.Item>
        <Form.Item label="详细地址" labelCol={{ span: 3 }}>
          {getFieldDecorator("address", {
            rules: []
          })(<Input style={{ width: "100%", maxWidth: "500px" }} />)}
        </Form.Item>
        <Form.Item label="电话" labelCol={{ span: 3 }}>
          {getFieldDecorator("phone", {
            rules: []
          })(
            <Input
              addonBefore={prefixSelector}
              style={{ width: "100%", maxWidth: "500px" }}
            />
          )}
        </Form.Item>
        <Form.Item label="真实姓名" labelCol={{ span: 3 }}>
          {getFieldDecorator("realname", {
            rules: []
          })(<Input style={{ width: "100%", maxWidth: "500px" }} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ float: "left" }}>
            更新
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const UserInfomationForm = Form.create({ name: "register" })(
  UserInfoForm
);
