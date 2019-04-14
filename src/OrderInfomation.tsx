import * as React from "react";
import "./App.css";
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
  Collapse
} from "antd";
import { number } from "prop-types";
import { baseUrl } from "./Setting";
import { OrderDetail } from "./View";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const { Title } = Typography;

interface OrderInfo {
  order: OrderDetail;
}

export class OrderInfomationList extends React.Component<{ fetch: any }, {}> {
  constructor(props) {
    super(props);
    this.state = {
      current: "1",
      orderList: []
    };
  }

  componentDidMount() {
    var list = this.props.fetch();
    if (list != {})
      list.then(r => {
        this.setState({
          orderList: r
        });
      });
  }

  state: {
    current: string;
    orderList: OrderDetail[];
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  renderList = status => {
    return this.state.orderList.map(item => {
      if (item.status == status) {
        return (
          <div key={item.id}>
            <Order order={item} />
          </div>
        );
      } else {
        return "";
      }
    });
  };

  public render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.handleClick}>
        {/* <TabPane tab="待付款" key="1">
          {this.renderList(1)}
        </TabPane> */}
        <TabPane tab="待发货" key="2">
          {this.renderList(2)}
        </TabPane>
        <TabPane tab="运输中" key="3">
          {this.renderList(3)}
        </TabPane>
        <TabPane tab="已完成" key="4">
          {this.renderList(4)}
        </TabPane>
      </Tabs>
    );
  }
}

export class Order extends React.Component<OrderInfo, {}> {
  constructor(props) {
    super(props);
  }

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
            {d.time}
            <br />
            {d.info}
          </Timeline.Item>
        ))}
      </Timeline>
    );
  }

  private renderDeliveryInfo() {
    return (
      <Popover
        placement="leftBottom"
        content={this.diliveryTimeline()}
        trigger="hover"
      >
        物流信息
      </Popover>
    );
  }

  public render() {
    var Order = this.props.order;
    return (
      <Card
        title={Order.time}
        extra={this.renderDeliveryInfo()}
        style={{ width: "100%", marginTop: "4px" }}
      >
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
        <Title level={4} style={{ float: "right" }}>
          合计：{Order.total_price} 元
        </Title>
      </Card>
    );
  }
}
