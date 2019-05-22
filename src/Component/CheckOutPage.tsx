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
  Avatar,
  Modal,
  Card,
  message,
  Divider,
  Spin
} from "antd";
import { getUserId } from "src/Util/Util";
import { ClickInput } from "src/Util/ClickInput";
import { shoppingcart, removeItem } from "./ShoppingCart";
import { bhistory } from "src";
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const Panel = Collapse.Panel;
const { Paragraph } = Typography;
interface item {
  id: number;
  inventory_id: number;
  name: string;
  unit: string;
  price: number;
  count: number;
  img: string;
}

export class CheckOutPage extends React.Component<
  { data: any; location?: any },
  {}
> {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      realname: "",
      address: "",
      loading: true
    };
    if (this.props.location.state == undefined) {
      let secondsToGo = 5;
      const modal = Modal.error({
        title: "订单信息已过期，请重新下达。",
        content: `${secondsToGo} 秒后返回.`,
        onCancel: () => {
          bhistory.push("/");
        },
        onOk: () => {
          bhistory.push("/");
        }
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
      this.valid = false;
      return;
    }
    this.valid = true;
    this.data = this.props.location.state.data;
    this.list = this.props.location.state.list;
  }
  data;
  list;
  valid;

  state: {
    phone: string;
    realname: string;
    address: string;
    loading: boolean;
  };

  componentDidMount() {
    var id = getUserId();
    if (id == null) return;
    fetch("/api/user/" + id + "/info")
      .then(r => r.json())
      .then(r =>
        this.setState({
          phone: r.phone,
          realname: r.realname,
          address: r.address,
          loading: false
        })
      );
  }

  totalPrice() {
    var price = 0;
    Object.keys(this.list).map(seller_id => {
      for (var i of this.list[seller_id]) {
        var inv = this.data.inventory[i.id];
        var product = this.data.product[inv.productId];
        price += i.count * inv.price;
      }
    });
    return price;
  }

  public renderTable(item: item[]) {
    return (
      <List
        itemLayout="horizontal"
        key={item[0].id}
        dataSource={item}
        renderItem={i => {
          var inv = this.data.inventory[i.id];
          var product = this.data.product[inv.productId];
          return (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={"/img/products/" + product.img} />}
                title={product.name}
                description={i.count + " * " + product.unit}
                key={i.id}
              />
              <div>{inv.price * i.count} 元</div>
            </List.Item>
          );
        }}
      />
    );
  }
  getInfo() {
    return {
      phone: this.state.phone,
      realname: this.state.realname,
      address: this.state.address
    };
  }
  checkout = () => {
    var user_id = getUserId();
    if (user_id == null) return;
    Object.values(this.list).map((item: any[]) => {
      var info = this.getInfo();
      var sellerid = this.data.inventory[item[0].id].sellerId;
      var request = {
        id: user_id,
        order: item,
        realname: info.realname,
        address: info.address,
        phone: info.phone
      };
      fetch("/api/order/" + sellerid, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(request)
      }).then(r => {
        if (r.status != 200) {
          r.json().then(r => {
            message.warn(r.msg);
          });
        } else {
          for (var i of item) {
            removeItem(sellerid, i.id);
          }
          let secondsToGo = 5;
          const modal = Modal.success({
            title: "订单已提交",
            content: `${secondsToGo} 秒后返回.`,
            onCancel: () => {
              bhistory.push("/userCenter/orderInfomation");
            },
            onOk: () => {
              bhistory.push("/userCenter/orderInfomation");
            }
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
        }
      });
    });
  };

  render() {
    if (this.valid) {
      return (
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Content>
            <Title
              level={4}
              style={{ marginLeft: "20px", marginBottom: "30px" }}
            >
              商品结算
            </Title>
            <Row type="flex" justify="center" align="top">
              <Col span={20}>
                <div
                  style={{
                    border: "1px",
                    borderStyle: "solid",
                    borderColor: "rgb(232, 232, 232)",
                    padding: "10px"
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    收货人信息
                  </div>
                  <div
                    style={{
                      marginLeft: "20px",
                      marginRight: "20px",
                      marginTop: "10px"
                    }}
                  >
                    <Spin spinning={this.state.loading}>
                      <Row gutter={16}>
                        <Col span={2}>姓名：</Col>
                        <Col span={8}>
                          <Paragraph
                            editable={{
                              onChange: str => this.setState({ realname: str })
                            }}
                          >
                            {this.state.realname}
                          </Paragraph>
                        </Col>
                      </Row>{" "}
                      <Row gutter={16}>
                        <Col span={2}>电话：</Col>
                        <Col span={8}>
                          <Paragraph
                            editable={{
                              onChange: str => this.setState({ phone: str })
                            }}
                          >
                            {this.state.phone}
                          </Paragraph>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={2}>地址：</Col>
                        <Col span={8}>
                          <Paragraph
                            editable={{
                              onChange: str => this.setState({ address: str })
                            }}
                          >
                            {this.state.address}
                          </Paragraph>
                        </Col>{" "}
                      </Row>
                    </Spin>
                  </div>
                  <Divider />{" "}
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    货物信息
                  </div>
                  <div style={{ padding: "20px" }}>
                    {Object.keys(this.list).map(seller_id => {
                      const seller = this.data.seller[seller_id];
                      return (
                        <Card
                          title={seller.nickname}
                          key={seller.nickname}
                          size="small"
                          style={{ marginTop: "-1px" }}
                        >
                          {this.renderTable(this.list[seller_id])}
                        </Card>
                      );
                    })}
                  </div>
                  <Divider />{" "}
                  <div style={{ padding: "20px" }}>
                    <Row type="flex" justify="end">
                      <Col
                        span={3}
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px"
                        }}
                      >
                        合计：{this.totalPrice()}元
                      </Col>
                      <Col span={3}>
                        <Button
                          onClick={this.checkout}
                          type="primary"
                          style={{ float: "right" }}
                        >
                          下单
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      );
    } else {
      return "";
    }
  }
}
