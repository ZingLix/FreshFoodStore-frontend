import * as React from "react";
import "./App.css";
import { Layout, Menu, Icon, Avatar, Dropdown, Popover, Input } from "antd";
import { Route, Link } from "react-router-dom";
import { MainPage } from "./MainPage/MainPage";
import { BaseCenter } from "./BaseCenter/BaseCenter";
import { UserCenter } from "./BuyerCenter/UserCenter";
import { ProductPage } from "./Product/ProductPage";
import { SellerCenter } from "./SellerCenter/SellerCenter";
import {
  ShoppingCartAffix,
  setshoppingcartref
} from "./Component/ShoppingCart";
import { LoginAvatar } from "./Component/Avatar";
import { CheckOutPage } from "./Component/CheckOutPage";

const { Header, Footer, Sider, Content } = Layout;
const Search = Input.Search;

class App extends React.Component {
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
              <LoginAvatar />
            </div>
            {/* <div
              style={{
                float: "right",
                marginRight: "20px",
                marginTop: "6px"
              }}
            >
              <Icon type="star" style={{ fontSize: "24px" }} />
            </div> */}
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
            <Route path="/checkout" component={CheckOutPage} />
            <ShoppingCartAffix ref={setshoppingcartref} />
          </Content>
          <Footer style={{ textAlign: "center" }} />
        </Layout>
      </div>
    );
  }
}

export default App;
