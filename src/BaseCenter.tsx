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
  Tabs,
  Table,
  InputNumber
} from "antd";
import { Route, Link } from "react-router-dom";
import { UserInfomationForm } from "./UserInfomationForm";
import { Order, order, OrderInfomationList } from "./OrderInfomation";
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const TabPane = Tabs.TabPane;

class Inventory extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    productList: [
      {
        id: 1,
        name: "番茄",
        price: 3.3,
        unit: "斤",
        img: "test.png",
        count: 200,
        category: 1
      },
      {
        id: 2,
        name: "黄瓜",
        price: 4.6,
        unit: "斤",
        img: "test.png",
        count: 300,
        category: 2
      }
    ]
  };

  column = [
    {
      title: "货品",
      key: "name",
      render: item => <a href={"/product/" + item.id}>{item.name}</a>
    },
    {
      title: "单价",
      key: "id",
      render: item => (
        <div key={item.id}>
          {item.price}元/{item.unit}
        </div>
      )
    },
    {
      title: "余量",
      dataIndex: "count"
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: () => (
        <span className="table-operation">
          <InputNumber style={{ marginRight: "10px" }} />
          <Button>进货</Button>
        </span>
      )
    }
  ];

  public render() {
    return (
      <Table
        dataSource={this.state.productList}
        columns={this.column}
        rowKey={record => record.id.toString()}
      />
    );
  }
}

export class BaseCenter extends React.Component {
  public render() {
    return (
      <Layout style={{ padding: "24px 0", background: "#fff" }}>
        <Sider width={200} style={{ background: "#fff" }}>
          <Title level={3} style={{ marginLeft: "10px" }}>
            采买基地
          </Title>
          <Affix offsetTop={72}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
            >
              <Menu.Item key="1">
                <Link to="/baseCenter/inventory">库存管理</Link>
              </Menu.Item>
            </Menu>
          </Affix>
        </Sider>
        <Content
          style={{ padding: "0 24px", minHeight: 280, marginLeft: "16px" }}
        >
          <Inventory />
        </Content>
      </Layout>
    );
  }
}
