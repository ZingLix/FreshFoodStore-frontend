import * as React from "react";
import "./App.css";
import { Layout, Menu, Affix } from "antd";
import { Item } from "./Item";
import { ShoppingCartAffix } from "./ShoppingCart";
import { Product } from "./View";

const { Header, Footer, Sider, Content } = Layout;

export class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productCategory: [],
      productList: [],
      currentCategory: 0
    };
  }

  componentWillMount() {
    fetch("/api/products/category")
      .then((response: any) => response.json())
      .then((d: any) => {
        this.setState({
          productCategory: d
        });
      });
    fetch("/api/products/mainpage")
      .then(r => r.json())
      .then(r => this.setState({ productList: r }));
  }

  state: {
    productCategory: {
      id: number;
      typename: string;
    }[];
    productList: {
      id: number;
      minprice: number;
      product: Product;
    }[];
    currentCategory: number;
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
              <Menu.Item
                key={0}
                onClick={() => {
                  this.setState({ currentCategory: 0 });
                }}
              >
                全部
              </Menu.Item>
              {this.state.productCategory.map(c => (
                <Menu.Item
                  key={c.id}
                  onClick={() => {
                    this.setState({ currentCategory: c.id });
                  }}
                >
                  {c.typename}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {this.state.productList.map(c => {
              if (
                this.state.currentCategory === 0 ||
                c.product.category_id === this.state.currentCategory
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
      </div>
    );
  }
}
