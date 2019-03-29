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

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }
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
            <Statistic title="待发货订单" value={4} />
          </Col>
          <Col span={4}>
            <Statistic title="配送中订单" value={3} />
          </Col>
        </Row>
        <Divider />
        <UserInfomationForm />
      </div>
    );
  }
}

class OrderList extends React.Component {
  constructor(props) {
    super(props);
  }
  state: {
    current: string;
    waitingOrder: order[];
    deliveringOrder: order[];
    finishedOrder: order[];
  };

  testOrder = {
    id: 5497,
    seller_id: 123,
    seller_name: "卖家名",
    total_price: 123,
    status: 1,
    time: "2019-3-20",
    address: "地址",
    phone: "13888888888",
    products: [
      {
        id: 213,
        img: "fish.png",
        name: "鱼",
        unit: "条",
        price: 123,
        count: 3
      }
    ],
    delivery: [
      {
        time: "2019-3-19 15:28:26",
        info: "打包送出",
        status: 1
      },
      {
        time: "2019-3-19 19:38:41",
        info: "抵达配送站",
        status: 2
      }
    ]
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  renderWaitingOrder() {
    return (
      <Row gutter={24} type="flex" justify="center" align="middle">
        <Col span={21}>
          <Order order={this.testOrder} />
        </Col>
        <Col span={3}>
          <Button>发货</Button>
        </Col>
      </Row>
    );
  }

  renderDeliveringOrder() {
    return (
      <Row gutter={24} type="flex" justify="center" align="middle">
        <Col span={21}>
          <Order order={this.testOrder} />
        </Col>
        <Col span={3}>
          <Button>更新物流</Button>
        </Col>
      </Row>
    );
  }
  renderFinishedOrder() {
    return (
      <Row gutter={24} type="flex" justify="center" align="middle">
        <Col span={24}>
          <Order order={this.testOrder} />
        </Col>
      </Row>
    );
  }
  public render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.handleClick}>
        <TabPane tab="待发货" key="1">
          {this.renderWaitingOrder()}
        </TabPane>
        <TabPane tab="配送中" key="2">
          {this.renderDeliveringOrder()}
        </TabPane>
        <TabPane tab="已完成" key="3">
          {this.renderFinishedOrder()}
        </TabPane>
      </Tabs>
    );
  }
}

class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    inventory: [
      {
        id: 1,
        name: "番茄",
        unit: "斤",
        inventory: [
          {
            recordid: 2,
            date: "2019-3-18",
            remain: 139,
            price: 3.3
          }
        ]
      },
      {
        id: 2,
        name: "黄瓜",
        unit: "斤",
        inventory: [
          {
            recordid: 5,
            date: "2019-3-14",
            remain: 129,
            price: 0.3
          },
          {
            recordid: 7,
            date: "2019-3-16",
            remain: 15,
            price: 2.3
          }
        ]
      }
    ]
  };

  tableColumn = [
    {
      title: "商品名",
      render: item => <a href={"/product/" + item.id}>{item.name}</a>,
      key: "name"
    },
    { title: "单位", dataIndex: "unit", key: "unit" }
  ];
  subTableColumn = [
    {
      title: "入库日期",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "剩余数量",
      dataIndex: "remain",
      key: "remain"
    },
    {
      title: "当前价格",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: () => (
        <span className="table-operation">
          <Button style={{ marginRight: "10px" }}>舍弃</Button>
          <Button>调价</Button>
        </span>
      )
    }
  ];

  subTable = (record, index, indent, expanded) => {
    return (
      <Table
        columns={this.subTableColumn}
        dataSource={this.state.inventory[index].inventory}
        pagination={false}
        rowKey={record => record.recordid.toString()}
      />
    );
  };

  public render() {
    return (
      <Table
        columns={this.tableColumn}
        expandedRowRender={this.subTable}
        dataSource={this.state.inventory}
        rowKey={record => record.id.toString()}
      />
    );
  }
}

class Stock extends React.Component {
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

class StockList extends React.Component {
  public render() {
    return <OrderInfomationList />;
  }
}

export class SellerCenter extends React.Component {
  public render() {
    return (
      <Layout style={{ padding: "24px 0", background: "#fff" }}>
        <Sider width={200} style={{ background: "#fff" }}>
          <Title level={3} style={{ marginLeft: "10px" }}>
            卖家中心
          </Title>
          <Affix offsetTop={72}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
            >
              <Menu.Item key="1">
                <Link to="/sellerCenter">卖家信息</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/sellerCenter/productList">货品管理</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/sellerCenter/order">订单管理</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/sellerCenter/stock">进货</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/sellerCenter/stockList">进货管理</Link>
              </Menu.Item>
            </Menu>
          </Affix>
        </Sider>
        <Content
          style={{ padding: "0 24px", minHeight: 280, marginLeft: "16px" }}
        >
          <Route exact path="/sellerCenter" component={Overview} />
          <Route path="/sellerCenter/productList" component={ProductList} />
          <Route path="/sellerCenter/order" component={OrderList} />
          <Route path="/sellerCenter/stock" component={Stock} />
          <Route path="/sellerCenter/stockList" component={StockList} />
        </Content>
      </Layout>
    );
  }
}
