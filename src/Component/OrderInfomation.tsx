import * as React from "react";
import {
  Layout,
  Typography,
  Popover,
  Avatar,
  List,
  Card,
  Tabs,
  Menu,
  Timeline,
  Collapse,
  Button,
  Row,
  Modal,
  message,
  Input,
  Empty,
  Skeleton
} from "antd";

import { OrderDetail } from "../Util/View";
import { formatTime } from "../Util/Util";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const { Title } = Typography;

interface OrderInfo {
  order: OrderDetail;
  seller: boolean;
}

export class OrderInfomationList extends React.Component<
  { fetch: any; seller: boolean },
  {}
> {
  constructor(props) {
    super(props);
    this.state = {
      current: "1",
      orderList: [],
      loading: true
    };
  }

  componentDidMount() {
    var list = this.props.fetch();
    if (list != {})
      list.then(r => {
        this.setState({
          orderList: r,
          loading: false
        });
      });
  }

  state: {
    current: string;
    orderList: OrderDetail[];
    loading: boolean;
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  renderList = status => {
    var render = () => {
      var count = 0;
      var arr = this.state.orderList.reverse();
      var tmp = arr.map(item => {
        if (item.status == status) {
          count++;
          return (
            <div key={item.id}>
              <Order order={item} seller={this.props.seller} />
            </div>
          );
        } else {
          return "";
        }
      });
      if (count == 0) return <Empty description={"暂无订单"} />;
      else return tmp;
    };

    return (
      <div>
        <Skeleton loading={this.state.loading} active>
          {render()}
        </Skeleton>
      </div>
    );
  };

  public render() {
    return (
      <Tabs defaultActiveKey="2" onChange={this.handleClick}>
        {/* <TabPane tab="待付款" key="1">
          {this.renderList(1)}
        </TabPane> */}
        <TabPane tab="待发货" key="2">
          {this.renderList(2)}
        </TabPane>
        <TabPane tab="配送中" key="3">
          {this.renderList(3)}
        </TabPane>
        <TabPane tab="已完成" key="4">
          {this.renderList(4)}
        </TabPane>
      </Tabs>
    );
  }
}

class DeliveryInfoModal extends React.Component<
  { user_id: number; order_id: number },
  {}
> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      info: ""
    };
  }
  input;
  state: {
    visible: boolean;
    info: string;
  };
  setref = e => (this.input = e);
  public hide = () => {
    this.setState({ visible: false });
  };
  public show = () => {
    this.setState({ visible: true });
  };
  addDeliveryInfo = () => {
    var msg = this.state.info;
    var order_id = this.props.order_id;
    var userid = this.props.user_id;
    var request = {
      operation: 2,
      message: msg
    };
    fetch("/api/seller/" + userid + "/order/" + order_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(request)
    });
  };

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title="订单详情"
        onCancel={this.hide}
        onOk={this.addDeliveryInfo}
      >
        物流信息：
        <Input
          ref={this.setref}
          value={this.state.info}
          onChange={e => this.setState({ info: e.target.value })}
        />
      </Modal>
    );
  }
}

class OrderModal extends React.Component<OrderInfo, {}> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      tabPosition: "1"
    };
  }
  state: {
    visible: boolean;
    tabPosition: string;
  };
  public hide = () => {
    this.setState({ visible: false });
  };
  public show = () => {
    this.setState({ visible: true });
  };
  footerButton = status => {
    var id = 1;
    var buttons = [
      <Button key={id++} onClick={this.hide}>
        关闭
      </Button>
    ];
    if (this.props.seller && status == 3) {
      buttons.push(
        <Button key={id++} onClick={() => this.modal.show()}>
          更新物流
        </Button>
      );
    }
    if (this.props.seller && status == 2) {
      buttons.push(
        <Button key={id++} onClick={this.sendout}>
          发货
        </Button>
      );
    }
    if (!this.props.seller && status == 3) {
      buttons.push(
        <Button key={id++} onClick={this.confirmOrder}>
          确认收货
        </Button>
      );
    }
    return buttons;
  };

  sendout = () => {
    var order_id = this.props.order.id;
    var userid = localStorage.getItem("user_id");
    if (userid == undefined) {
      message.warn("请重新登录");
      return;
    }
    var request = {
      operation: 1,
      message: "卖家发货"
    };
    fetch("/api/seller/" + userid + "/order/" + order_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(request)
    });
  };

  confirmOrder = () => {
    var request = {
      operation: 1,
      message: "买家确认收货"
    };
    fetch(
      "/api/user/" +
        this.props.order.buyer_id +
        "/order/" +
        this.props.order.id,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(request)
      }
    );
  };

  modal;
  setref = m => (this.modal = m);

  render() {
    const order = this.props.order;
    return (
      <Modal
        visible={this.state.visible}
        title="订单详情"
        onCancel={this.hide}
        footer={this.footerButton(order.status)}
      >
        <DeliveryInfoModal
          ref={this.setref}
          order_id={this.props.order.id}
          user_id={this.props.order.seller_id}
        />
        <Tabs tabPosition="left">
          <TabPane tab="订单信息" key="1">
            <div>
              <Title level={4}>收货人信息</Title>
              收货人：{order.realname}
              <br />
              地址：{order.address}
              <br />
              联系电话：{order.phone}
              <br />
              下单时间：{formatTime(order.time)}
              <br />
              <span>
                <div>
                  {order.status == 1 && <div>状态：待付款</div>}
                  {order.status == 2 && <div>状态：待发货</div>}
                  {order.status == 3 && <div>状态：配送中</div>}
                  {order.status == 4 && <div>状态：已完成</div>}
                </div>
              </span>
              <Title level={4} style={{ marginTop: "10px" }}>
                商家信息
              </Title>
              商家名：{order.seller_info.nickname}
              <br />
              地址：{order.seller_info.address}
              <br />
              联系电话：{order.seller_info.phone}
              <br />
            </div>
          </TabPane>
          <TabPane tab="商品列表" key="2">
            <List
              itemLayout="horizontal"
              key={order.id}
              dataSource={order.products}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={"/img/" + item.product.img} />}
                    title={item.product.name}
                    description={item.count + " * " + item.product.unit}
                    key={item.id}
                  />
                  <div>{item.price} 元</div>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="物流信息" key="3">
            <Timeline style={{ margin: "12px 12px 0px 12px" }}>
              {this.props.order.delivery_info.map(d => (
                <Timeline.Item key={d.time} style={{ paddingBottom: "10px" }}>
                  {d.time}
                  <br />
                  {d.info}
                </Timeline.Item>
              ))}
            </Timeline>
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export class Order extends React.Component<OrderInfo, {}> {
  constructor(props) {
    super(props);
  }
  modal;

  setref = e => {
    this.modal = e;
  };

  callback = key => {
    console.log(key);
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  private diliveryTimeline() {
    return (
      <Timeline style={{ margin: "12px 12px 0px 12px" }}>
        {this.props.order.delivery_info.map(d => (
          <Timeline.Item key={d.time} style={{ paddingBottom: "10px" }}>
            {formatTime(d.time)}
            <br />
            {d.info}
          </Timeline.Item>
        ))}
      </Timeline>
    );
  }

  private renderDeliveryInfo() {
    return (
      <div>
        <Button onClick={() => this.modal.show()}>详情</Button>{" "}
      </div>
    );
  }

  public render() {
    var Order = this.props.order;
    return (
      <Card
        title={formatTime(Order.time)}
        extra={this.renderDeliveryInfo()}
        style={{ width: "100%", marginTop: "4px" }}
      >
        <OrderModal
          ref={this.setref}
          order={this.props.order}
          seller={this.props.seller}
        />
        <Row>
          <div style={{ float: "left" }}>商品列表：</div>
          <div style={{ float: "right" }}>
            <Popover
              placement="leftBottom"
              content={this.diliveryTimeline()}
              trigger="hover"
            >
              <div>物流信息</div>
            </Popover>
          </div>
        </Row>
        <div style={{ marginLeft: "10px" }}>
          <List
            itemLayout="horizontal"
            key={Order.id}
            dataSource={Order.products}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={"/img/" + item.product.img} />}
                  title={item.product.name}
                  description={item.count + " * " + item.product.unit}
                  key={item.id}
                />
                <div>{item.price} 元</div>
              </List.Item>
            )}
          />
        </div>
        <Title level={4} style={{ float: "right" }}>
          合计：{Order.total_price} 元
        </Title>
      </Card>
    );
  }
}
