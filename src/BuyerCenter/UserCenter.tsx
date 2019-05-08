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
  Modal,
  message,
  Form,
  InputNumber,
  Select,
  Spin
} from "antd";
import { Route, Link } from "react-router-dom";
import { UserInfomationForm } from "../Component/UserInfomationForm";
import { OrderInfomationList } from "../Component/OrderInfomation";
import { FundGadget, FundList } from "src/Component/Fund";
import { getUserId } from "src/Util/Util";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "用户名",
      loadingusername: true,
      loadingstatistic: true,
      orderstatistic: { "2": 0, "3": 0 }
    };
  }

  state: {
    username: string;
    loadingusername: boolean;
    loadingstatistic: boolean;
    orderstatistic: any;
  };

  componentWillMount() {
    var userid = getUserId();
    if (userid == null) return;

    fetch("/api/user/" + userid + "/info")
      .then(r => r.json())
      .then(r =>
        this.setState({
          username: r.nickname,
          loadingusername: false
        })
      );
    fetch("/api/user/" + userid + "/overview")
      .then(r => r.json())
      .then(r => {
        this.setState({
          orderstatistic: r,
          loadingstatistic: false
        });
      });
  }

  showAvatar=()=>{}

  public render() {
    return (
      <div>
        <Spin
          spinning={this.state.loadingusername || this.state.loadingstatistic}
        >
          <Row type="flex" align="middle" style={{ marginTop: "60px" }}>
            <Col>
            <div onClick={this.showAvatar}>
                <Avatar size={64} icon="user" /></div>
            </Col>
            <Col>
              {" "}
              <Title level={4} style={{ marginLeft: "40px" }}>
                {this.state.username}
              </Title>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "16px" }}>
            <Col span={4}>
              <FundGadget />
            </Col>
            <Col span={4}>
              <Statistic
                title="待发货订单"
                value={this.state.orderstatistic["2"]}
              />
            </Col>
            <Col span={4}>
              <Statistic
                title="配送中订单"
                value={this.state.orderstatistic["3"]}
              />
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

class UserInfomation extends React.Component {
  public render() {
    return (
      <div style={{ marginTop: "40px" }}>
        <Title level={4}>个人信息</Title>
        <Divider />
        <UserInfomationForm />
      </div>
    );
  }
}

class OrderInfomation extends React.Component {
  public render() {
    return (
      <div style={{ marginTop: "40px" }}>
        <Title level={4}>订单管理</Title>
        <Divider />
        <OrderInfomationList
          fetch={() => {
            var user_id = localStorage.getItem("user_id");
            if (user_id == undefined) {
              message.warn("请重新登录");
              return {};
            } else
              return fetch("/api/user/" + user_id + "/order").then(r =>
                r.json()
              );
          }}
          seller={false}
        />
      </div>
    );
  }
}

export class UserCenter extends React.Component {
  private renderUserInfo() {
    return (
      <div>
        <Overview />
        <UserInfomation />
      </div>
    );
  }

  public render() {
    return (
      <Layout style={{ padding: "24px 0", background: "#fff" }}>
        <Sider width={200} style={{ background: "#fff" }}>
          <Title level={3} style={{ marginLeft: "10px" }}>
            个人中心
          </Title>
          <Affix offsetTop={72}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
            >
              <Menu.Item key="1">
                <Link to="/userCenter">个人信息</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/userCenter/orderInfomation">订单管理</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/userCenter/fund">资金变动</Link>
              </Menu.Item>
            </Menu>
          </Affix>
        </Sider>
        <Content
          style={{ padding: "0 24px", minHeight: 280, marginLeft: "16px" }}
        >
          <Route
            exact
            path="/userCenter"
            render={(props: any) => {
              return this.renderUserInfo();
            }}
          />
          <Route
            path="/userCenter/orderInfomation"
            component={OrderInfomation}
          />
          <Route path="/userCenter/fund" component={FundList} />
        </Content>
      </Layout>
    );
  }
}
