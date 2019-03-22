import * as React from "react";
import "./App.css";
import { Layout, Menu } from "antd";
import { Item } from "./Item";
import { ShoppingCartAffix } from "./ShoppingCart";
const { Header, Footer, Sider, Content } = Layout;

export function MainPage(props: any) {
  return (
    <div>
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
      <ShoppingCartAffix />
    </div>
  );
}
