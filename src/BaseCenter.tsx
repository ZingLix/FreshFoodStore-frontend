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
  Tag,
  Modal
} from "antd";
import { Route, Link } from "react-router-dom";
import { UserInfomationForm } from "./UserInfomationForm";
import { Order, order, OrderInfomationList } from "./OrderInfomation";
import { baseUrl } from "./Setting";
import { TweenOneGroup } from 'rc-tween-one';
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const TabPane = Tabs.TabPane;

interface product {
  id: number;
  name: string;
  unit: string;
  category_id: number;
  img: string;
  price: number;
  count: number;
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
    fetch(baseUrl + "/api/base/inventory")
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
      fetch(baseUrl + "/api/base/inventory", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.state.productinfo)
      });
    } else {
      fetch(baseUrl + "/api/base/inventory/" + this.state.productinfo.id, {
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

class Category extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      category:[],
      inputVisible: false,
      inputValue: '',
    };
  }


  state:{
    category:{
      id:number,
      typename:string
    }[],
    inputVisible:false,
    inputValue:string
  }
  input

componentWillMount(){
  this.getCategory();
}

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  saveInputRef = input => this.input = input

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm=()=>{
    if(this.state.inputValue!=""){
      fetch(baseUrl+ "/api/products/category",{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({typename:this.state.inputValue})
      })
      .then(res=>res.json())
      .then(res=>{
        var tmp=this.state.category
        tmp.push(res)
        this.setState({
          category:tmp
        })
       } )
      
    }
   
    this.setState({
      inputValue:"",
      inputVisible:false
    })
  }

  getCategory(){
    fetch(baseUrl+ "/api/products/category")
    .then((response: any) => response.json())
    .then(r=>{
      this.setState(
        {
          category:r
        }
      )
    })
  }

  deleteCategory(id){
    fetch(baseUrl+ "/api/products/category/"+id,{
      method:"DELETE"
    })
  }
  forMap = (c) => {
    const tagElem = (
      <Tag 
      closable
      
      onClose={()=>this.deleteCategory(c.id)}
     
    >
      {c.typename}
    </Tag>
    );
    return (
      <span key={c.id} style={{ display: 'inline-block',marginBottom:"6px" }}>
        {tagElem}
      </span>
    );
  }
  public render(){
    const { inputVisible, inputValue } = this.state;
    const tagChild = this.state.category.map(this.forMap);
    return(
      <div>
        <Row>        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
             value={inputValue}
             onChange={this.handleInputChange}
             onBlur={this.handleInputConfirm}
             onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> 添加分类
          </Tag>
        )}</Row>
<Row style={{marginTop:"10px"}}>
       { tagChild} </Row></div>
    )
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
                
              </Menu.Item><Menu.Item key="2">
              <Link to="/baseCenter/category">产品分类</Link>
                
              </Menu.Item>
              
            </Menu>
          </Affix>
        </Sider>
        <Content
          style={{ padding: "44px 24px", minHeight: 280, marginLeft: "16px" }}
        >
          <Route exact path="/baseCenter" component={Product} />
          <Route exact path="/baseCenter/category" component={Category} />
        </Content>
      </Layout>
    );
  }
}
