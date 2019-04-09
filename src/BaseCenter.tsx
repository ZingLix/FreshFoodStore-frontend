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
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Checkbox,
  AutoComplete,
  Modal
} from "antd";
import { Route, Link } from "react-router-dom";
import { UserInfomationForm } from "./UserInfomationForm";
import { Order, order, OrderInfomationList } from "./OrderInfomation";
import { baseUrl } from "./Setting";
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const TabPane = Tabs.TabPane;

interface product {
  id: number;
  name: string;
  unit: string;
  category_id: number;
  img: string;
}

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
          <Button style={{ marginRight: "10px" }}>入库</Button>
          <Button>调价</Button>
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

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      products: [],
      modal: false
    };
  }

  state: {
    products: product[];
    category: {
      [id: number]: string;
    };
    modal: boolean;
  };
  column = [
    {
      title: "示例图",
      key: "img",
      render: item => (
        <img src={"/img/" + item.img} style={{ width: "100px" }} />
      )
    },
    {
      title: "名称",
      key: "name",
      dataIndex: "name"
    },
    {
      title: "分类",
      key: "category",
      render: item => <div>{this.state.category[item.category_id]}</div>
    },
    {
      title: "单位",
      key: "unit",
      dataIndex: "unit"
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (text, record, index) => (
        <span className="table-operation">
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => this.showModalwithProduct(index)}
          >
            修改信息
          </Button>
        </span>
      )
    }
  ];

  private form;

  componentWillMount() {
    fetch(baseUrl + "/api/products/category")
      .then((response: any) => response.json())
      .then((d: any) => {
        var tmp = {};
        d.forEach(element => {
          tmp[element.id] = element.typename;
        });
        this.setState({
          category: tmp
        });
      });
    fetch(baseUrl + "/api/products")
      .then((Response: any) => Response.json())
      .then((r: any) => {
        this.setState({
          products: r
        });
      });
  }

  showModal = () => {
    this.setState({
      modal: true
    });
  };

  hideModal = () => {
    this.setState({
      modal: false
    });
  };

  submitProduct = () => {
    this.form.submit();
    this.hideModal();
  };

  showModalwithProduct = idx => {
    this.showModal();
    this.form.setProduct(this.state.products[idx]);
  };

  public render() {
    return (
      <div>
        <Modal
          visible={this.state.modal}
          title="货物信息"
          onCancel={this.hideModal}
          onOk={this.submitProduct}
          forceRender
        >
          <ProductInfoForm ref={comp => (this.form = comp)} />
        </Modal>
        <Button
          type="primary"
          style={{ marginBottom: "10px" }}
          onClick={() => {
            this.form.clearProduct();
            this.showModal();
          }}
        >
          新增
        </Button>
        <Table
          dataSource={this.state.products}
          rowKey={item => item.id.toString()}
          columns={this.column}
        />
      </div>
    );
  }
}

class ProductInfoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productinfo: {
        id: 0,
        name: "",
        unit: "",
        category_id: 0,
        img: ""
      }
    };
  }

  state: {
    productinfo: product;
  };

  public setProduct(p: product) {
    this.setState({
      productinfo: p
    });
  }

  public clearProduct() {
    this.setState({
      productinfo: {
        id: 0,
        name: "",
        unit: "",
        category_id: 0,
        img: ""
      }
    });
  }

  public submit() {
    if (this.state.productinfo.id == 0) {
      fetch(baseUrl + "/api/products", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.state.productinfo)
      });
    } else {
      fetch(baseUrl + "/api/products/" + this.state.productinfo.id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(this.state.productinfo)
      });
    }
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };

    return (
      <Form {...formItemLayout}>
        <Form.Item label="名称">
          <Input
            value={this.state.productinfo.name}
            onChange={e => {
              var tmp = this.state.productinfo;
              tmp.name = e.target.value;
              this.setState({
                productinfo: tmp
              });
            }}
          />
        </Form.Item>
        <Form.Item label="单位">
          <Input
            value={this.state.productinfo.unit}
            onChange={e => {
              var tmp = this.state.productinfo;
              tmp.unit = e.target.value;
              this.setState({
                productinfo: tmp
              });
            }}
          />
        </Form.Item>
        <Form.Item label="分类">
          <Input
            value={this.state.productinfo.category_id}
            onChange={e => {
              var tmp = this.state.productinfo;
              tmp.category_id = parseInt(e.target.value);
              this.setState({
                productinfo: tmp
              });
            }}
          />
        </Form.Item>
        <Form.Item label="示例图">
          <Input
            value={this.state.productinfo.img}
            onChange={e => {
              var tmp = this.state.productinfo;
              tmp.img = e.target.value;
              this.setState({
                productinfo: tmp
              });
            }}
          />
        </Form.Item>
      </Form>
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
                <Link to="/baseCenter">库存管理</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/baseCenter/product">商品管理</Link>
              </Menu.Item>
            </Menu>
          </Affix>
        </Sider>
        <Content
          style={{ padding: "44px 24px", minHeight: 280, marginLeft: "16px" }}
        >
          <Route exact path="/baseCenter" component={Inventory} />
          <Route path="/baseCenter/product" component={Product} />
        </Content>
      </Layout>
    );
  }
}
