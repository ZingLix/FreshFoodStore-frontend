import * as React from "react";
import {
  Layout,
  Menu,
  Typography,
  Statistic,
  Row,
  Col,
  Button,
  Avatar,
  Divider,
  Affix,
  Tabs,
  Table,
  InputNumber,
  message,
  Input,
  Empty,
  Form,
  Select,
  Modal
} from "antd";
import { getUserId } from "../Util/Util";

const Option = Select.Option;

export class FundGadget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fund: 0,
      visible: false,
      topupvalue: 0
    };
  }

  componentDidMount() {
    this.refreshFund();
  }

  refreshFund = () => {
    var userid = getUserId();
    if (userid == null) return;
    fetch("/api/fund/" + userid)
      .then(r => r.json())
      .then(r =>
        this.setState({
          fund: r.count
        })
      );
  };
  state: {
    fund: number;
    visible: boolean;
    topupvalue: number;
  };

  topup = () => {
    var userid = getUserId();
    if (userid == null) return;
    fetch("/api/fund/" + userid, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userid,
        operation: 1,
        count: this.state.topupvalue
      })
    })
      .then(r => r.json())
      .then(r => {
        message.success(r.msg);
        this.refreshFund();
      });
    this.hide();
  };

  show = () => {
    this.setState({
      visible: true
    });
  };

  hide = () => {
    this.setState({
      visible: false
    });
  };

  handleNumberChange = num => {
    this.setState({
      topupvalue: num
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 }
    };
    return (
      <div>
        <Statistic title="余额 (RMB)" value={this.state.fund} precision={2} />
        <Button style={{ marginTop: 16 }} type="primary" onClick={this.show}>
          充值
        </Button>
        <Modal
          title="充值"
          visible={this.state.visible}
          onOk={this.topup}
          onCancel={this.hide}
        >
          <Form>
            <Form.Item {...formItemLayout} label="金额">
              <InputNumber
                value={this.state.topupvalue}
                onChange={this.handleNumberChange}
                style={{ width: 160 }}
              />
            </Form.Item>
            <Form.Item {...formItemLayout} label="支付方式">
              <Select defaultValue="alipay" style={{ width: 160 }}>
                <Option value="alipay">支付宝</Option>
                <Option value="wechat">微信</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
