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
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Checkbox,
  Tag,
  Modal
} from "antd";

interface product {
  id: number;
  name: string;
  unit: string;
  category_id: number;
  img: string;
  price: number;
  count: number;
}

export class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      products: [],
      modal: false,
      loading_category: true,
      loading_inventory: true
    };
  }

  state: {
    products: product[];
    category: {
      [id: number]: string;
    };
    modal: boolean;
    loading_inventory: boolean;
    loading_category: boolean;
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
      title: "价格",
      key: "price",
      dataIndex: "price"
    },
    {
      title: "剩余数量",
      key: "count",
      dataIndex: "count"
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (text, record, index) => (
        <span className="table-operation">
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => this.showModalwithProduct(record)}
          >
            修改信息
          </Button>
        </span>
      )
    }
  ];

  private form;

  componentWillMount() {
    fetch("/api/products/category")
      .then((response: any) => response.json())
      .then((d: any) => {
        var tmp = {};
        d.forEach(element => {
          tmp[element.id] = element.typename;
        });
        this.setState({
          category: tmp,
          loading_category: false
        });
      });
    fetch("/api/base/inventory")
      .then((Response: any) => Response.json())
      .then((r: any) => {
        this.setState({
          products: r,
          loading_inventory: false
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

  showModalwithProduct = product => {
    this.showModal();
    this.form.setProduct(product);
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
          loading={this.state.loading_category||this.state.loading_inventory}
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
        img: "",
        price: 0,
        count: 0
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
        img: "",
        price: 0,
        count: 0
      }
    });
  }

  public submit() {
    if (this.state.productinfo.id == 0) {
      fetch("/api/base/inventory", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.state.productinfo)
      });
    } else {
      fetch("/api/base/inventory/" + this.state.productinfo.id, {
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
        <Form.Item label="价格">
          <Input
            value={this.state.productinfo.price}
            onChange={e => {
              var tmp = this.state.productinfo;
              tmp.price = parseInt(e.target.value);
              this.setState({
                productinfo: tmp
              });
            }}
          />
        </Form.Item>
        <Form.Item label="库存">
          <Input
            value={this.state.productinfo.count}
            onChange={e => {
              var tmp = this.state.productinfo;
              tmp.count = parseInt(e.target.value);
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
