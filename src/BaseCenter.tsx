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
      category: {
        0: "全部",
        1: "新鲜水果",
        2: "时令蔬菜",
        3: "海鲜水产",
        4: "肉禽蛋品"
      },
      products: [
        {
          id: 1,
          name: "番茄",
          unit: "斤",
          img: "test.png",
          category_id: 1
        },
        {
          id: 2,
          name: "黄瓜",
          unit: "斤",
          img: "test.png",
          category_id: 2
        }
      ],
      modal: false
    };
  }
  state: {
    products: {
      id: number;
      name: string;
      unit: string;
      category_id: number;
      img: string;
    }[];
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
      render: () => (
        <span className="table-operation">
          <Button style={{ marginRight: "10px" }} onClick={this.showModal}>
            修改信息
          </Button>
        </span>
      )
    }
  ];
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
  public render() {
    return (
      <div>
        <Modal
          visible={this.state.modal}
          title="货物信息"
          onCancel={this.hideModal}
        >
          <ProductInfoForm />
        </Modal>
        <Button
          type="primary"
          style={{ marginBottom: "10px" }}
          onClick={this.showModal}
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
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
  };

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="名称">
          <Input />
        </Form.Item>
        <Form.Item label="单位">
          <Input />
        </Form.Item>
        <Form.Item label="分类">
          <Input />
        </Form.Item>

        <Form.Item label="示例图">
          <Input />
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
