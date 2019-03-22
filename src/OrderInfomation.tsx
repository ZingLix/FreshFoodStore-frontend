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

export class OrderInfomationList extends React.Component {
  state = {
    current: "mail"
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
  public render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="配送中" key="1">
          <Order />
        </TabPane>
        <TabPane tab="待付款" key="2">
          <Order />
        </TabPane>
        <TabPane tab="已完成" key="3">
          <Order />
        </TabPane>
      </Tabs>
    );
  }
}

export class Order extends React.Component {
  state = {
    date: "2019-3-20",
    id: 54976513,
    price: 123,
    goods: [
      {
        img: "/",
        name: "鱼",
        id: 213,
        count: 3,
        price: 123,
        unit: "条"
      }
    ],
    delivery: [
      {
        seq: 1,
        time: "2019-3-19 15:28:26",
        msg: "打包送出"
      },
      {
        seq: 2,
        time: "2019-3-19 19:38:41",
        msg: "抵达配送站"
      }
    ]
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
        {this.state.delivery.map(d => (
          <Timeline.Item key={d.seq} style={{ paddingBottom: "10px" }}>
            {d.time}
            <br />
            {d.msg}
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
        title={this.state.date}
        extra={this.renderDeliveryInfo()}
        style={{ width: "100%" }}
      >
        <List
          itemLayout="horizontal"
          key={this.state.id}
          dataSource={this.state.goods}
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
          合计：{this.state.price} 元
        </Title>
      </Card>
    );
  }
}
