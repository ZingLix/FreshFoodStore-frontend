import * as React from "react";
import "./App.css";
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
  Anchor,
  message
} from "antd";
import { Route, Link } from "react-router-dom";
import { UserInfomationForm } from "./UserInfomationForm";
import { OrderInfomationList } from "./OrderInfomation";
import { baseUrl } from "./Setting";
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

class Overview extends React.Component {
  public render() {
    return (
      <div>
        <Row type="flex" align="middle" style={{ marginTop: "60px" }}>
          <Col>
            <Avatar size={64} icon="user" />
          </Col>
          <Col>
            {" "}
            <Title level={4} style={{ marginLeft: "40px" }}>
              用户名
            </Title>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "16px" }}>
          <Col span={4}>
            <Statistic title="余额 (RMB)" value={342} precision={2} />
            <Button style={{ marginTop: 16 }} type="primary">
              充值
            </Button>
          </Col>
          <Col span={4}>
            <Statistic title="待付款订单" value={4} />
          </Col>
          <Col span={4}>
            <Statistic title="待收货订单" value={3} />
          </Col>
          <Col span={4}>
            <Statistic title="待评价订单" value={2} />
          </Col>
        </Row>
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
              return fetch(baseUrl + "/api/user/" + user_id + "/order").then(
                r => r.json()
              );
          }}
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
        </Content>
      </Layout>
    );
  }
}
