import * as React from "react";
import {
  Affix,
  Button,
  Icon,
  Drawer,
  List,
  Avatar,
  Checkbox,
  InputNumber,
  Layout
} from "antd";
import "./App.css";

const { Header, Footer, Sider, Content } = Layout;

class ShoppingCartItem extends React.Component {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <Layout>
        <Sider
          style={{
            background: "#FFFFFF",
            paddingRight: "24px"
          }}
          width="auto"
        >
          <Checkbox />
        </Sider>
        <Sider
          style={{
            background: "#FFFFFF",
            paddingRight: "24px"
          }}
          width="auto"
        >
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            style={{ width: "50px", height: "50px" }}
          />
        </Sider>
        <Content
          style={{
            background: "#FFFFFF"
          }}
        >
          <div>
            <div>番茄</div>
            <div>3.3元/斤</div>
          </div>
        </Content>
        <Sider
          style={{
            background: "#FFFFFF"
          }}
          width="auto"
        >
          <InputNumber min={1} defaultValue={1} />
        </Sider>
        <Sider
          style={{
            background: "#FFFFFF",
            paddingLeft: "12px"
          }}
          width="auto"
        >
          <Button shape="circle" icon="close" />
        </Sider>
      </Layout>
    );
  }
}

export class ShoppingCartAffix extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
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
            <Icon
              type="shopping-cart"
              style={{
                fontSize: "45px",
                margin: "13px 10px 50px 8px"
              }}
            />
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
            dataSource={listData}
            renderItem={item => (
              <List.Item key={item.title}>
                <ShoppingCartItem />
              </List.Item>
            )}
          />
        </Drawer>
      </div>
    );
  }
}

const listData: any = [];
for (let i = 0; i < 5; i++) {
  listData.push({
    href: "http://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
  });
}
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
