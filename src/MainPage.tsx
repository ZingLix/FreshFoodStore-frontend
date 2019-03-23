import * as React from "react";
import "./App.css";
import { Layout, Menu } from "antd";
import { Item } from "./Item";
import { ShoppingCartAffix } from "./ShoppingCart";
const { Header, Footer, Sider, Content } = Layout;

export class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    productCategory: [
      { id: 1, name: "新鲜水果" },
      { id: 2, name: "时令蔬菜" },
      { id: 3, name: "海鲜水产" },
      { id: 4, name: "肉禽蛋品" }
    ],
    productList: [
      {
        id: 1,
        name: "番茄",
        minprice: 3.3,
        unit: "斤",
        img: "test.png",
        category: 1
      },
      {
        id: 2,
        name: "黄瓜",
        minprice: 4.6,
        unit: "斤",
        img: "test.png",
        category: 2
      },
      {
        id: 3,
        name: "黄瓜",
        minprice: 4.6,
        unit: "斤",
        img: "test.png",
        category: 2
      },
      {
        id: 4,
        name: "黄瓜",
        minprice: 4.6,
        unit: "斤",
        img: "test.png",
        category: 2
      },
      {
        id: 5,
        name: "黄瓜",
        minprice: 4.6,
        unit: "斤",
        img: "test.png",
        category: 2
      },
      {
        id: 6,
        name: "黄瓜",
        minprice: 4.6,
        unit: "斤",
        img: "test.png",
        category: 2
      },
      {
        id: 7,
        name: "黄瓜",
        minprice: 4.6,
        unit: "斤",
        img: "test.png",
        category: 2
      }
    ],
    currentCategory: 0
  };

  public render() {
    return (
      <div>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["0"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
            >
              {this.state.productCategory.map(c => (
                <Menu.Item
                  key={c.id}
                  onClick={() => {
                    this.setState({ currentCategory: c.id });
                  }}
                >
                  {c.name}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {this.state.productList.map(c => {
              if (
                this.state.currentCategory === 0 ||
                c.category === this.state.currentCategory
              ) {
                return (
                  <div
                    style={{
                      float: "left",
                      margin: "20px 20px 20px 20px"
                    }}
                    key={c.id}
                  >
                    <Item data={c} />
                  </div>
                );
              } else {
                return " ";
              }
            })}
          </Content>
        </Layout>
        <ShoppingCartAffix />
      </div>
    );
  }
}
