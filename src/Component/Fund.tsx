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
import { FundItem } from "src/Util/View";

const Option = Select.Option;
const { Title } = Typography;

class WithdrawButton extends React.Component<{ onClose?: any }, {}> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      withdrawvalue: 0
    };
  }

  state: {
    visible: boolean;
    withdrawvalue: number;
  };

  withdraw = () => {
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
        operation: 2,
        count: this.state.withdrawvalue
      })
    })
      .then(r => r.json())
      .then(r => {
        message.success(r.msg);
        if (this.props.onClose != null) this.props.onClose();
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
      withdrawvalue: num
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 }
    };
    return (
      <div>
        {" "}
        <Button style={{ marginTop: 16 }} type="primary" onClick={this.show}>
          提现
        </Button>
        <Modal
          title="提现"
          visible={this.state.visible}
          onOk={this.withdraw}
          onCancel={this.hide}
        >
          <Form>
            <Form.Item {...formItemLayout} label="金额">
              <InputNumber
                value={this.state.withdrawvalue}
                onChange={this.handleNumberChange}
                style={{ width: 160 }}
              />
            </Form.Item>
            <Form.Item {...formItemLayout} label="提现方式">
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

class TopupButton extends React.Component<{ onClose?: any }, {}> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      topupvalue: 0
    };
  }

  state: {
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
        if (this.props.onClose != null) this.props.onClose();
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
        {" "}
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

export class FundGadget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fund: 0
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
  };

  render() {
    return (
      <div>
        <Statistic title="余额 (RMB)" value={this.state.fund} precision={2} />
        <TopupButton onClose={this.refreshFund} />
      </div>
    );
  }
}

export class FundList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log: []
    };
  }

  componentDidMount() {
    var userid = getUserId();
    if (userid == null) return;
    fetch("/api/fundlog/" + userid)
      .then(r => r.json())
      .then(r =>
        this.setState({
          log: r.reverse()
        })
      );
  }

  state: {
    log: FundItem[];
  };

  columns = [
    {
      title: "日期",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "变动情况",
      render: (text, record) => {
        if (record.type == 1) {
          return <div style={{ color: "red" }}>+{record.count}</div>;
        } else {
          return <div style={{ color: "green" }}>-{record.count}</div>;
        }
      },
      key: "count"
    },
    {
      title: "变动原因",
      dataIndex: "msg",
      key: "msg"
    }
  ];

  render() {
    return (
      <div>
        <Row type="flex" align="middle"><Col span={12}>
        <Title level={4} style={{ float: "left",marginTop:"16px" }}>
          变动日志
        </Title></Col><Col span={12}>
        <div style={{ float: "right",marginBottom:"0.5em" }}>
          <WithdrawButton>提现</WithdrawButton>
        </div>
        <div style={{ float: "right", marginRight: "10px",marginBottom:"0.5em" }}>
          <TopupButton>充值</TopupButton>
        </div>
        </Col>
        </Row>
        <Divider style={{marginTop:"0"}}/>
        <Row>
          <Table
            columns={this.columns}
            dataSource={this.state.log}
            rowKey={t => t.id}
          />
        </Row>
      </div>
    );
  }
}
