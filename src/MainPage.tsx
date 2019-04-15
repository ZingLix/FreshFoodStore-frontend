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
          name: "烟台红富士苹果",
          minprice: 13.3,
          unit: "4个",
          img: "苹果.jpg",
          category_id: 1
        },
        {
          id: 2,
          name: "越南进口芒果",
          minprice: 21.8,
          unit: "4斤",
          img: "芒果.jpg",
          category_id: 1
        },
        {
          id: 3,
          name: "云南高山蜜柑",
          minprice: 41.9,
          unit: "2kg",
          img: "蜜柑.jpg",
          category_id: 1
        },
        {
          id: 4,
          name: "轮切三文鱼排",
          minprice: 59.9,
          unit: "400g",
          img: "salmon.jpg",
          category_id: 3
        },
        {
          id: 5,
          name: "上海青 小油菜 小青菜",
          minprice: 8.5,
          unit: "斤",
          img: "青菜.jpg",
          category_id: 2
        },
        {
          id: 9,
          name: "徐香绿心猕猴桃",
          minprice: 24.9,
          unit: "12个",
          img: "猕猴桃.jpg",
          category_id: 1
        },
        {
          id: 8,
          name: "绿豆芽",
          minprice: 5.8,
          unit: "斤",
          img: "绿豆芽.jpg",
          category_id: 2
        },
        {
          id: 6,
          name: "猪腿肉",
          minprice: 29.9,
          unit: "袋 400g",
          img: "猪腿肉.jpg",
          category_id: 4
        },
        {
          id: 7,
          name: "东海鲳鱼",
          minprice: 18,
          unit: "450g",
          img: "changyu.jpg",
          category_id: 3
        },
        {
          id: 10,
          name: "冷冻阿根廷红虾",
          minprice: 59.9,
          unit: "500g",
          img: "虾.jpg",
          category_id: 3
        }
      ],
      currentCategory: 0
    };
  }

  componentWillMount() {
    fetch( "/api/products/category")
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
      </div>
    );
  }
}
