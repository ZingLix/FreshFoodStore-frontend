import * as React from "react";
import "./App.css";
import { Layout, Menu, Icon, Avatar, Dropdown, Popover, Input } from "antd";
import { Route, Link } from "react-router-dom";
import { LoginWindow } from "./LoginWindow";
import { MainPage } from "./MainPage";
import { BaseCenter } from "./BaseCenter";
import { UserCenter } from "./UserCenter";
import { ProductPage } from "./ProductPage";
import { SellerCenter } from "./SellerCenter";
import { ShoppingCartAffix, setshoppingcartref } from "./ShoppingCart";
import { bhistory } from "./index";

const { Header, Footer, Sider, Content } = Layout;
const Search = Input.Search;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginWindow: {
        visible: false,
        loading: false
      },
      login: false
    };
  }
  state: {
    loginWindow: {
      visible: boolean;
      loading: boolean;
    };
    login: boolean;
  };
  componentDidMount() {
    this.refreshLoginStatus();
  }
  loginWindowOpen = () => {
    this.loginWindow.open();
  };

  logout = () => {
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_id");
    this.refreshLoginStatus();
    bhistory.push("/");
    window.location.reload();
  };

  menu = (
    <Menu>
      <Menu.Item style={{ width: "120px", textAlign: "center" }}>
        <a onClick={this.logout}>注销</a>
      </Menu.Item>
    </Menu>
  );

  search = (
    <Search
      placeholder="input search text"
      onSearch={value => console.log(value)}
      enterButton
    />
  );

  private loginWindow;

  refreshLoginStatus = () => {
    var type = localStorage.getItem("user_type");
    if (type == undefined) this.setState({ login: true });
    else this.setState({ login: false });
  };

  clickAvatar = () => {
    var type = localStorage.getItem("user_type");
    if (type == undefined) this.loginWindowOpen();
    else if (type == "1") bhistory.push("/userCenter");
    else if (type == "2") bhistory.push("/sellerCenter");
    else if (type == "3") bhistory.push("/baseCenter");
  };

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
            <div style={{ float: "right", cursor: "pointer" }}>
              <Dropdown overlay={this.menu} disabled={this.state.login}>
                <div onClick={this.clickAvatar}>
                  <Avatar
                    size={40}
                    icon="user"
                    style={{ marginRight: "12px" }}
                  />
                </div>
              </Dropdown>
              <LoginWindow
                ref={r => {
                  this.loginWindow = r;
                }}
              />
            </div>{" "}
            <div
              style={{
                float: "right",
                marginRight: "20px",
                marginTop: "6px"
              }}
            >
              <Popover content={this.search} placement="bottom">
                <Icon type="search" style={{ fontSize: "24px" }} />
              </Popover>
            </div>
            <div
              style={{
                float: "right",
                marginRight: "20px",
                marginTop: "6px"
              }}
            >
              <Icon type="star" style={{ fontSize: "24px" }} />
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
            <Route path="/sellerCenter" component={SellerCenter} />
            <Route path="/baseCenter" component={BaseCenter} />
            <ShoppingCartAffix ref={setshoppingcartref} />
          </Content>
          <Footer style={{ textAlign: "center" }} />
        </Layout>
      </div>
    );
  }
}

export default App;
