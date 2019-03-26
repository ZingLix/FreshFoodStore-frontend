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

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const { Title } = Typography;
const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </p>
);

export interface order {
  id: number;
  seller_id: number;
  seller_name: string;
  total_price: number;
  status: number;
  time: string;
  address: string;
  phone: string;
  products: {
    id: number;
    img: string;
    name: string;
    unit: string;
    price: number;
    count: number;
  }[];
  delivery: {
    time: string;
    info: string;
    status: number;
  }[];
}

interface OrderInfo {
  order: order;
}

export class OrderInfomationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "1",
      orderList: [
        {
          id: 5497,
          seller_id: 123,
          seller_name: "卖家名",
          total_price: 123,
          status: 1,
          time: "2019-3-20",
          address: "地址",
          phone: "13888888888",
          products: [
            {
              id: 213,
              img: "/",
              name: "鱼",
              unit: "条",
              price: 123,
              count: 3
            }
          ],
          delivery: [
            {
              time: "2019-3-19 15:28:26",
              info: "打包送出",
              status: 1
            },
            {
              time: "2019-3-19 19:38:41",
              info: "抵达配送站",
              status: 2
            }
          ]
        }
      ]
    };
  }

  state: {
    current: string;
    orderList: order[];
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };
  public render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.handleClick}>
        <TabPane tab="待付款" key="1">
          <Order order={this.state.orderList[0]} />
        </TabPane>
        <TabPane tab="待发货" key="2">
          <Order order={this.state.orderList[0]} />
        </TabPane>
        <TabPane tab="运输中" key="3">
          <Order order={this.state.orderList[0]} />
        </TabPane>
        <TabPane tab="已完成" key="4">
          <Order order={this.state.orderList[0]} />
          <Order order={this.state.orderList[0]} />
          <Order order={this.state.orderList[0]} />
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
        {this.props.order.delivery.map(d => (
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
    return (
      <Card
        title={this.props.order.time}
        extra={this.renderDeliveryInfo()}
        style={{ width: "100%", marginTop: "4px" }}
      >
        <List
          itemLayout="horizontal"
          key={this.props.order.id}
          dataSource={this.props.order.products}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.img} />}
                title={item.name}
                description={item.count + item.unit}
                key={item.id}
              />
              <div>{item.price} 元</div>
            </List.Item>
          )}
        />
        <Title level={4} style={{ float: "right" }}>
          合计：{this.props.order.total_price} 元
        </Title>
      </Card>
    );
  }
}
