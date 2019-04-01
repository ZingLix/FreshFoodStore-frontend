import * as React from "react";
import "./App.css";
import { Layout, Menu, Affix } from "antd";
import { Item } from "./Item";
import { ShoppingCartAffix } from "./ShoppingCart";
const { Header, Footer, Sider, Content } = Layout;

export class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productCategory: [],
      productList: [
        {
          id: 1,
          name: "番茄",
          minprice: 3.3,
          unit: "斤",
          img: "test.png",
          category_id: 1
        },
        {
          id: 2,
          name: "黄瓜",
          minprice: 4.6,
          unit: "斤",
          img: "test.png",
          category_id: 2
        },
        {
          id: 3,
          name: "黄瓜",
          minprice: 4.6,
          unit: "斤",
          img: "test.png",
          category_id: 3
        },
        {
          id: 4,
          name: "黄瓜",
          minprice: 4.6,
          unit: "斤",
          img: "test.png",
          category_id: 2
        },
        {
          id: 5,
          name: "黄瓜",
          minprice: 4.6,
          unit: "斤",
          img: "test.png",
          category_id: 4
        },
        {
          id: 9,
          name: "黄瓜",
          minprice: 4.6,
          unit: "斤",
          img: "test.png",
          category_id: 4
        },
        {
          id: 8,
          name: "黄瓜",
          minprice: 4.6,
          unit: "斤",
          img: "test.png",
          category_id: 4
        },
        {
          id: 6,
          name: "黄瓜",
          minprice: 4.6,
          unit: "斤",
          img: "test.png",
          category_id: 4
        },
        {
          id: 7,
          name: "黄瓜",
          minprice: 4.6,
          unit: "斤",
          img: "test.png",
          category_id: 3
        },
        {
          id: 10,
          name: "黄瓜",
          minprice: 4.6,
          unit: "斤",
          img: "test.png",
          category_id: 3
        }
      ],
      currentCategory: 0
    };
  }

  componentWillMount() {
    fetch("http://127.0.0.1:8080/api/products/category")
      .then((response: any) => response.json())
      .then((d: any) => {
        this.setState({
          productCategory: d
        });
      });
  }

  state: {
    productCategory: {
      id: number;
      typename: string;
    }[];
    productList: {
      id: number;
      name: string;
      minprice: number;
      unit: string;
      img: string;
      category_id: number;
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
                c.category_id === this.state.currentCategory
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
