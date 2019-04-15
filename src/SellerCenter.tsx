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
  InputNumber,
  message,
  Input
} from "antd";
import { Route, Link } from "react-router-dom";
import { UserInfomationForm } from "./UserInfomationForm";
import { Order, OrderInfomationList } from "./OrderInfomation";
import { OrderDetail } from "./View";
import { ClickInput } from "./Util";

const { Search } = Input;
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
    this.state = {
      current: "1",
      order: []
    };
  }
  state: {
    current: string;
    order: OrderDetail[];
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  componentDidMount() {
    var userid = localStorage.getItem("user_id");
    if (userid == undefined) {
      message.warn("请重新登录");
      return;
    }
    fetch("/api/seller/" + userid + "/order")
      .then(r => r.json())
      .then(r => {
        this.setState({
          order: r
        });
      });
  }

  renderOrder(status) {
    return this.state.order.map(item => {
      if (item.status == status) {
        return <Order key={item.id} order={item} seller={true} />;
      } else {
        return "";
      }
    });
  }

  



  public render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.handleClick}>
        <TabPane tab="待发货" key="1">
          {this.renderOrder(2)}
        </TabPane>
        <TabPane tab="配送中" key="2">
          {this.renderOrder(3)}
        </TabPane>
        <TabPane tab="已完成" key="3">
          {this.renderOrder(4)}
        </TabPane>
      </Tabs>
    );
  }
}

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      countVisible: false
    };
  }
  state: {
    inventory: {
      product_id: number;
      product: {
        id: number;
        name: string;
        unit: string;
        category_id: number;
        img: string;
      };
      inventoryList: {
        id: number;
        sellerId: number;
        productId: number;
        count: number;
        price: number;
        time: string;
      }[];
    }[];
    countVisible: boolean;
  };

  componentWillMount() {
    var id = localStorage.getItem("user_id");
    if (id == undefined) message.error("请重新登录");
    else {
      fetch("/api/seller/" + id + "/inventory")
        .then(r => r.json())
        .then(r =>
          this.setState({
            inventory: r
          })
        );
    }
  }

  updateItem = (item, count, price) => {
    var tmp = this.state.inventory;
    for (var u of tmp) {
      if (u.product_id == item.productId) {
        for (var v of u.inventoryList) {
          if (v.id == item.id) {
            v.count = count;
            v.price = price;
            fetch(
              "/api/seller/" +
                localStorage.getItem("user_id") +
                "/inventory/" +
                item.id,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(v)
              }
            );
          }
        }
      }
    }
    this.setState({
      inventoryList: tmp
    });
  };

  tableColumn = [
    {
      title: "商品名",
      render: item => (
        <a href={"/product/" + item.product_id}>{item.product.name}</a>
      ),
      key: "name"
    },
    {
      title: "单位",
      render: item => <div>{item.product.unit}</div>,
      key: "unit"
    }
  ];
  subTableColumn = [
    {
      title: "入库日期",
      dataIndex: "time",
      key: "time"
    },
    {
      title: "剩余数量",
      render: item => {
        return (
          <ClickInput
            data={item.count}
            submit={t => {
              this.updateItem(item, parseInt(t), item.price);
            }}
          />
        );
      },
      key: "count"
    },
    {
      title: "当前价格",
      render: item => {
        return (
          <ClickInput
            data={item.price}
            submit={t => {
              this.updateItem(item, item.count, parseInt(t));
            }}
          />
        );
      },
      key: "price"
    }
  ];

  subTable = (record, index, indent, expanded) => {
    return (
      <Table
        columns={this.subTableColumn}
        dataSource={record.inventoryList}
        pagination={false}
        rowKey={(record: any) => record.id.toString()}
      />
    );
  };

  public render() {
    return (
      <Table
        columns={this.tableColumn}
        expandedRowRender={this.subTable}
        dataSource={this.state.inventory}
        rowKey={record => record.product_id.toString()}
      />
    );
  }
}

class StockButton extends React.Component<{ Productid: number }, {}> {
  constructor(props) {
    super(props);
    this.state = {
      val: 0
    };
  }

  state: {
    val: number;
  };

  placeorder = () => {
    var id = localStorage.getItem("user_id");
    if (id == undefined) message.error("请重新登录");
    else {
      let list: any[] = [];
      var tmp = {
        id: this.props.Productid,
        count: this.state.val
      };
      list.push(tmp);
      fetch("/api/seller/" + id + "/products", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(list)
      })
        .then(res => res.json())
        .then(r => console.log(r));
    }
  };

  render() {
    return (
      <span className="table-operation">
        <InputNumber
          value={this.state.val}
          onChange={e => this.setState({ val: e })}
          style={{ marginRight: "10px" }}
        />
        <Button onClick={this.placeorder}>进货</Button>
      </span>
    );
  }
}

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: []
    };
  }

  state: {
    productList: {
      id: number;
      name: string;
      unit: string;
      category_id: number;
      img: string;
      price: number;
      count: number;
    }[];
  };
  componentWillMount() {
    fetch("/api/seller/baseProducts")
      .then(response => response.json())
      .then(r => {
        this.setState({
          productList: r
        });
      });
  }

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
      render: (text, record, index) => {
        let val: number | undefined = 0;
        return (
          <div>
            <StockButton Productid={record.id} />
          </div>
        );
      }
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
    return (
      <OrderInfomationList
        fetch={() =>
          fetch(
            "/api/seller/" + localStorage.getItem("user_id") + "/stock"
          ).then(r => r.json())
        }
        seller={true}
      />
    );
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
