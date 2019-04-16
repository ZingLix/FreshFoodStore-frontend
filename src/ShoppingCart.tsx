import * as React from "react";
import {
  Affix,
  Button,
  Checkbox,
  Drawer,
  Icon,
  InputNumber,
  Layout,
  List,
  Typography,
  Row,
  Col,
  Collapse,
  Table,
  Modal,
  Statistic,
  Badge,
  message
} from "antd";
import "./App.css";
import { Product } from "./View";
import { ClickInput } from "./Util";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const Panel = Collapse.Panel;

interface shoppingcart {
  [seller_id: number]: {
    id: number;
    count: number;
  }[];
}

interface item {
  id: number;
  inventory_id: number;
  name: string;
  unit: string;
  price: number;
  count: number;
  img: string;
}

interface entry {
  seller_name: string;
  item: item[];
}

class CheckOutModal extends React.Component<{ data: any }, {}> {
  constructor(props) {
    super(props);
    this.state = {
      phone: "未设定",
      realname: "123",
      address: "未设定"
    };
  }

  state: {
    phone: string;
    realname: string;
    address: string;
  };

  componentDidMount() {
    var id = localStorage.getItem("user_id");
    if (id == undefined) message.warn("请重新登录");
    else
      fetch("/api/user/" + id + "/info")
        .then(r => r.json())
        .then(r =>
          this.setState({
            phone: r.phone,
            realname: r.realname,
            address: r.address
          })
        );
  }

  public getInfo() {
    return {
      phone: this.state.phone,
      realname: this.state.realname,
      address: this.state.address
    };
  }

  columns = [
    {
      title: "商品名称",
      render: item => (
        <div>
          {
            this.props.data.product[
              this.props.data.inventory[item.id].productId
            ].name
          }
        </div>
      ),
      key: "name"
    },
    {
      title: "单价",
      key: "price",
      render: item => {
        const inv = this.props.data.inventory[item.id];
        const prod = this.props.data.product[inv.productId];
        return (
          <div>
            {inv.price}元/{prod.unit}
          </div>
        );
      }
    },
    {
      title: "数量",
      dataIndex: "count",
      key: "count"
    },
    {
      title: "总价",
      render: item => {
        const inv = this.props.data.inventory[item.id];
        const prod = this.props.data.product[inv.productId];
        return <div>{(inv.price * item.count).toFixed(2)}</div>;
      }
    }
  ];

  public renderTable(item: item[]) {
    return (
      <Table
        columns={this.columns}
        dataSource={item}
        pagination={false}
        rowKey={record => record.id.toString()}
      />
    );
  }

  public render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={3}>姓名：</Col>
          <Col span={8}>
            <ClickInput
              data={this.state.realname}
              submit={s => this.setState({ realname: s })}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={3}>电话：</Col>
          <Col span={8}>
            <ClickInput
              data={this.state.phone}
              submit={s => this.setState({ phone: s })}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={3}>地址：</Col>
          <Col span={8}>
            <ClickInput
              data={this.state.address}
              submit={s => this.setState({ address: s })}
            />
          </Col>
        </Row>

        <Collapse bordered={false} style={{ marginTop: "20px" }}>
          {Object.keys(this.props.data.shoppingcart).map(seller_id => {
            const seller = this.props.data.seller[seller_id];
            return (
              <Panel
                header={seller.nickname}
                key={seller.nickname}
                style={{
                  paddingTop: "0px"
                }}
              >
                {this.renderTable(this.props.data.shoppingcart[seller_id])}
              </Panel>
            );
          })}
        </Collapse>
      </div>
    );
  }
}

export class ShoppingCartAffix extends React.Component {
  // public state = { visible: false };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      product: {},
      shoppingcart: {},
      inventory: {},
      seller: {},
      modalVisible: false,
      count: 0
    };
  }

  state: {
    visible: boolean;
    product: {
      [id: number]: Product;
    };
    inventory: {
      [id: number]: {
        id: number;
        sellerId: number;
        productId: number;
        count: number;
        price: number;
        time: string;
      };
    };
    seller: {
      [id: number]: {
        id: number;
        nickname: string;
        phone: string;
        address: string;
      };
    };
    shoppingcart: shoppingcart;
    modalVisible: boolean;
    count: number;
  };
  modal;

  setModal = m => (this.modal = m);

  addSellerInfo(id, userinfo) {
    //  console.log(id);
    var tmp = this.state.seller;
    tmp[userinfo.id] = userinfo;
    this.setState({ seller: tmp });
  }

  addInventoryInfo(id, inventoryinfo) {
    var tmp = this.state.inventory;
    tmp[id] = inventoryinfo;
    this.setState({ inventory: tmp });
  }

  addProductInfo(id, productinfo) {
    var tmp = this.state.product;
    tmp[id] = productinfo;
    this.setState({ product: tmp });
  }

  componentDidMount() {
    this.refreshShoppingCart();
  }

  private showDrawer = () => {
    this.refreshShoppingCart();
    this.setState({
      visible: true
    });
  };

  private onClose = () => {
    this.setState({
      visible: false
    });
  };

  private openModal = () => {
    this.refreshShoppingCart();
    this.setState({
      visible: false,
      modalVisible: true
    });
  };

  private closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  private checkout = () => {
    var user_id = localStorage.getItem("user_id");
    if (user_id == undefined) {
      message.warn("请重新登录");
      return;
    }
    Object.values(this.state.shoppingcart).map(item => {
      var info = this.modal.getInfo();
      var request = {
        id: user_id,
        order: item,
        realname: info.realname,
        address: info.address,
        phone: info.phone
      };
      fetch("/api/order/" + this.state.inventory[item[0].id].sellerId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(request)
      });
      //console.log(this.state.inventory[item[0].id].sellerId);
    });
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "下单成功",
      content: `${secondsToGo} 秒后返回.`
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `${secondsToGo} 秒后返回.`
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
    this.setState({
      modalVisible: false
    });
  };

  public refreshShoppingCart() {
    var cart = localStorage.getItem("shoppingcart");
    if (cart != null) {
      var obj: shoppingcart = JSON.parse(cart);
      for (var i in obj) {
        if (!this.state.seller.hasOwnProperty(i)) {
          this.addSellerInfo(i, {
            id: i,
            name: "...",
            phone: "...",
            address: "..."
          });
          fetch("/api/user/" + i + "/info")
            .then(r => r.json())
            .then(r => {
              this.addSellerInfo(i, r);
            });
        }
        obj[i].map(item => {
          if (!this.state.inventory.hasOwnProperty(item.id)) {
            this.addInventoryInfo(item.id, {
              id: item.id,
              sellerId: i,
              productId: 0,
              count: 0,
              price: 0,
              time: "..."
            });
            fetch("/api/inventory/" + item.id)
              .then(r => r.json())
              .then(r => {
                this.addInventoryInfo(item.id, r);
                if (!this.state.product.hasOwnProperty(r.productId)) {
                  this.addProductInfo(r.productId, {
                    id: r.productId,
                    name: "...",
                    unit: "...",
                    category_id: 0,
                    img: ""
                  });
                  fetch("/api/products/" + r.productId)
                    .then(r => r.json())
                    .then(res => this.addProductInfo(r.productId, res));
                }
              });
          }
        });
      }
      this.setState(
        {
          shoppingcart: JSON.parse(cart)
        },
        () => {
          this.cartcount();
        }
      );
    }
  }

  renderCartList(itemlist) {
    return itemlist.map(item => {
      const inv = this.state.inventory[item.id];
      const prod = this.state.product[inv.productId];
      if (inv == undefined || prod == undefined) return "";
      return (
        <Row
          type="flex"
          justify="space-around"
          align="middle"
          key={item.id}
          style={{ marginBottom: "10px" }}
        >
          <Col
            style={{
              background: "#FFFFFF",
              paddingRight: "24px"
            }}
            span={2}
          >
            <Checkbox />
          </Col>
          <Col
            style={{
              background: "#FFFFFF",
              paddingRight: "24px"
            }}
            span={4}
          >
            <img
              src={"/img/" + prod.img}
              style={{ width: "50px", height: "50px" }}
            />
          </Col>
          <Col
            style={{
              background: "#FFFFFF"
            }}
            span={4}
          >
            <div>
              <div>{prod.name}</div>
              <div>{inv.price + " 元/" + prod.unit}</div>
            </div>
          </Col>
          <Col
            style={{
              background: "#FFFFFF"
            }}
            span={4}
            offset={4}
          >
            <InputNumber
              min={1}
              defaultValue={1}
              value={item.count}
              onChange={e => {
                modifyItem(inv.sellerId, item.id, e);
                this.refreshShoppingCart();
              }}
            />
          </Col>
          <Col
            style={{
              background: "#FFFFFF",
              paddingLeft: "12px"
            }}
            span={2}
          >
            <Button
              shape="circle"
              icon="close"
              onClick={() => {
                removeItem(inv.sellerId, item.id);
                this.refreshShoppingCart();
              }}
            />
          </Col>
        </Row>
      );
    });
  }

  totalprice = () => {
    var price = 0;
    Object.values(this.state.shoppingcart).map((item: any) => {
      for (var i of item) {
        price += i.count * this.state.inventory[i.id].price;
      }
    });
    return price;
  };

  cartcount = () => {
    var count = 0;
    Object.values(this.state.shoppingcart).map(item => {
      count += item.length;
    });
    this.setState({
      count: count
    });
  };

  public render() {
    return (
      <div>
        <Affix offsetBottom={50} style={{ position: "absolute", right: 50 }}>
          <Button
            type="primary"
            shape="circle"
            style={{
              width: "75px",
              height: "75px",
              textAlign: "center"
            }}
            onClick={this.showDrawer}
          >
            <Badge count={this.state.count}>
              <Icon
                type="shopping-cart"
                style={{
                  fontSize: "45px",
                  margin: "13px 10px 50px 8px"
                }}
              />
            </Badge>
          </Button>
        </Affix>
        <Drawer
          title="购物车"
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          width={500}
        >
          <List
            itemLayout="vertical"
            size="large"
            dataSource={Object.values(this.state.shoppingcart)}
            renderItem={item => (
              <List.Item key={item[0].id}>
                <Title level={4}>
                  {
                    this.state.seller[this.state.inventory[item[0].id].sellerId]
                      .nickname
                  }
                </Title>
                {this.renderCartList(item)}
              </List.Item>
            )}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e8e8e8",
              padding: "10px 16px",
              textAlign: "right",
              left: 0,
              background: "#fff",
              borderRadius: "0 0 4px 4px"
            }}
          >
            <Row gutter={16} type="flex" justify="end">
              <Col span={6}>
                <div>总价：{this.totalprice()} 元</div>
              </Col>
              <Col span={6}>
                <Button
                  style={{ marginRight: "10px", paddingRight: "20px" }}
                  onClick={this.openModal}
                  type="primary"
                >
                  下单
                </Button>
              </Col>
            </Row>
          </div>
        </Drawer>
        <Modal
          title="购物车"
          visible={this.state.modalVisible}
          onCancel={this.closeModal}
          width="60%"
          footer={[
            <Button key="back" onClick={this.closeModal}>
              返回
            </Button>,
            <Button key="submit" type="primary" onClick={this.checkout}>
              下单
            </Button>
          ]}
        >
          <CheckOutModal ref={this.setModal} data={this.state} />
        </Modal>
      </div>
    );
  }
}

let shoppingcart;

export let setshoppingcartref = c => {
  shoppingcart = c;
};

export function addItem(seller_id, inventory_id) {
  var tmp = localStorage.getItem("shoppingcart");
  var cart;
  if (tmp != null) cart = JSON.parse(tmp);
  else cart = {};
  var flag = false;
  if (cart.hasOwnProperty(seller_id)) {
    cart[seller_id].map(item => {
      if (item.id == inventory_id) {
        item.count++;
        flag = true;
      }
    });
    if (!flag) {
      cart[seller_id].push({
        id: inventory_id,
        count: 1
      });
    }
  } else {
    cart[seller_id] = [
      {
        id: inventory_id,
        count: 1
      }
    ];
  }
  localStorage.setItem("shoppingcart", JSON.stringify(cart));
  shoppingcart.refreshShoppingCart();
}

export function removeItem(seller_id, inventory_id) {
  var tmp = localStorage.getItem("shoppingcart");
  var cart = {};
  if (tmp != null) {
    cart = JSON.parse(tmp);
    for (var i = 0; i < cart[seller_id].length; ++i) {
      if (cart[seller_id][i].id == inventory_id) {
        cart[seller_id].splice(i, 1);
        if (cart[seller_id].length == 0) {
          delete cart[seller_id];
          break;
        }
      }
    }
  }
  localStorage.setItem("shoppingcart", JSON.stringify(cart));
  shoppingcart.refreshShoppingCart();
}

export function modifyItem(seller_id, inventory_id, count) {
  var tmp = localStorage.getItem("shoppingcart");
  var cart = {};
  if (tmp != null) {
    cart = JSON.parse(tmp);

    for (var i = 0; i < cart[seller_id].length; ++i) {
      // console.log(cart[seller_id].id);
      if (cart[seller_id][i].id == inventory_id) {
        cart[seller_id][i].count = count;
      }
    }
  }
  localStorage.setItem("shoppingcart", JSON.stringify(cart));
  shoppingcart.refreshShoppingCart();
}
