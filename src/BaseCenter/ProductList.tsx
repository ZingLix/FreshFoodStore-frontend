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
  Icon,
  Cascader,
  Select,
  Checkbox,
  Tag,
  Modal,
  Upload,
  message
} from "antd";
import { fileToObject } from "antd/lib/upload/utils";
const Option = Select.Option;
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
        <img src={"/img/products/" + item.img} style={{ width: "100px" }} />
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

  componentDidMount() {
    this.fetchdata();
  }

  fetchdata = () => {
    this.setState({
      loading_category: true
    });
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
  };

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
    if (this.form.submit()) {
      this.hideModal();
    }
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
          <ProductInfoForm
            ref={comp => (this.form = comp)}
            onSubmit={this.fetchdata}
            category={this.state.category}
          />
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
          loading={this.state.loading_category || this.state.loading_inventory}
        />
      </div>
    );
  }
}

class ProductInfoForm extends React.Component<
  {
    onSubmit?: any;
    category: {
      [id: number]: string;
    };
  },
  {}
> {
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
      },
      loading: false
    };
  }

  state: {
    productinfo: product;
    loading: boolean;
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
    var info = this.state.productinfo;
    if (this.state.productinfo.img == "") {
      message.warn("未上传图片！");
      return false;
    }
    if (
      info.category_id == 0 ||
      info.count == 0 ||
      info.name == "" ||
      info.price == 0 ||
      info.unit == ""
    ) {
      message.warn("信息不完整！");
      return false;
    }
    if (this.state.productinfo.id == 0) {
      fetch("/api/base/inventory", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.state.productinfo)
      }).then(r => {
        if (r.status == 200) {
          message.success("添加成功");
          if (this.props.onSubmit != null) this.props.onSubmit();
        }
      });
    } else {
      fetch("/api/base/inventory/" + this.state.productinfo.id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(this.state.productinfo)
      }).then(r => {
        if (r.status == 200) {
          message.success("修改成功");
          if (this.props.onSubmit != null) this.props.onSubmit();
        }
      });
    }
    return true;
  }
  beforeUpload(file) {
    const isJPG = file.type === "image/jpeg";
    const isPNG = file.type === "image/png";
    if (!isJPG && !isPNG) {
      message.error("只能上传jpg或png文件!");
    }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    return isJPG || isPNG;
  }

  handleChange = info => {
    if (info.file.status === "done") {
      var tmp = this.state.productinfo;
      tmp.img = info.file.response["filename"];
      this.setState({
        productinfo: tmp
      });
    }
  };

  handleCategoryChange = val => {
    var tmp = this.state.productinfo;
    tmp.category_id = val;
    this.setProduct(tmp);
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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.productinfo.img;
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
          <Select
            value={this.props.category[this.state.productinfo.category_id]}
            onChange={this.handleCategoryChange}
          >
            <Option value={0} />
            {Object.keys(this.props.category).map(key => (
              <Option key={key} value={key}>
                {this.props.category[key]}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="示例图">
          <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/upload/products"
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl != "" ? (
              <img
                src={"/img/products/" + imageUrl}
                alt="avatar"
                style={{ width: "300px", height: "300px" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
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
