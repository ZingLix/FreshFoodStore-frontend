import * as React from "react";
import "./App.css";
import { Layout, Menu, Icon, Avatar, Dropdown } from "antd";
import { Route, Link } from "react-router-dom";
import { LoginWindow } from "./LoginWindow";
import { MainPage } from "./MainPage";
import { ShoppingCartAffix } from "./ShoppingCart";
import { UserCenter } from "./UserCenter";
import { ProductPage } from "./ProductPage";
const { Header, Footer, Sider, Content } = Layout;

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
      <Menu.Item style={{ width: "120px", textAlign: "center" }}>
        <Link to="/userCenter">个人中心</Link>
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
            <Link to="/">
              <div
                className="logo"
                style={{
                  float: "left",
                  display: "inline-block",
                  color: "#000000"
                }}
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
            </Link>
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
            <Route exact path="/" component={MainPage} />
            <Route path="/userCenter" component={UserCenter} />
            <Route path="/product/:id" component={ProductPage} />
          </Content>
          <Footer style={{ textAlign: "center" }} />
        </Layout>
      </div>
    );
  }
}

export default App;
