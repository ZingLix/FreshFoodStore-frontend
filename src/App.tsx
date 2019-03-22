import * as React from "react";
import "./App.css";
import { Layout, Menu, Icon, Avatar, Dropdown } from "antd";
import * as router from "react-router-dom";
import { LoginWindow } from "./LoginWindow";
import { Item } from "./Item";
import { ShoppingCartAffix } from "./ShoppingCart";

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    loginWindow: {
      visible: false,
      loading: false
    }
  };

  loginWindowOpen = () => {
    this.loginWindow.open();
  };

  menu = (
    <Menu>
      <Menu.Item style={{ width: "120px", textAlign: "center" }}>
        <a onClick={this.loginWindowOpen}>登陆</a>
      </Menu.Item>
    </Menu>
  );

  private loginWindow;

  public render() {
    return (
      <div className="App">
        <Layout>
          <Header
            className="header"
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
              boxShadow: "0 2px 8px #f0f1f2",
              background: "#FFFFFF"
            }}
          >
            <div
              className="logo"
              style={{ float: "left", display: "inline-block" }}
            >
              <Icon
                type="shopping-cart"
                style={{
                  marginRight: "24px",
                  fontSize: "24px",
                  display: "inline"
                }}
              />
              <div
                style={{
                  marginRight: "24px",
                  fontSize: "24px",
                  display: "inline"
                }}
              >
                生鲜商店
              </div>
            </div>
            <div style={{ float: "right" }}>
              <Dropdown overlay={this.menu}>
                <Avatar size={40} icon="user" style={{ marginRight: "12px" }} />
              </Dropdown>
              <LoginWindow
                ref={r => {
                  this.loginWindow = r;
                }}
              />
            </div>
          </Header>
          <Content
            style={{
              padding: "0 0px",
              width: "1500px",
              marginTop: 80,
              maxWidth: "90%",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <Layout style={{ padding: "24px 0", background: "#fff" }}>
              <Sider width={200} style={{ background: "#fff" }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%" }}
                >
                  <Menu.Item key="1">新鲜水果</Menu.Item>
                  <Menu.Item key="2">时令蔬菜</Menu.Item>
                  <Menu.Item key="3">海鲜水产</Menu.Item>
                  <Menu.Item key="4">肉禽蛋品</Menu.Item>
                </Menu>
              </Sider>
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                <div style={{ float: "left", margin: "20px 20px 20px 20px" }}>
                  <Item />
                </div>{" "}
                <div style={{ float: "left", margin: "20px 20px 20px 20px" }}>
                  <Item />
                </div>{" "}
                <div style={{ float: "left", margin: "20px 20px 20px 20px" }}>
                  <Item />
                </div>{" "}
                <div style={{ float: "left", margin: "20px 20px 20px 20px" }}>
                  <Item />
                </div>{" "}
                <div style={{ float: "left", margin: "20px 20px 20px 20px" }}>
                  <Item />
                </div>{" "}
                <div style={{ float: "left", margin: "20px 20px 20px 20px" }}>
                  <Item />
                </div>{" "}
                <div style={{ float: "left", margin: "20px 20px 20px 20px" }}>
                  <Item />
                </div>{" "}
                <div style={{ float: "left", margin: "20px 20px 20px 20px" }}>
                  <Item />
                </div>{" "}
                <div style={{ float: "left", margin: "20px 20px 20px 20px" }}>
                  <Item />
                </div>{" "}
                <div style={{ float: "left", margin: "20px 20px 20px 20px" }}>
                  <Item />
                </div>{" "}
                <div style={{ float: "left", margin: "20px 20px 20px 20px" }}>
                  <Item />
                </div>
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <ShoppingCartAffix />
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
