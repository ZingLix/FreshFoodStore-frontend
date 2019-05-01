import * as React from "react";
import { Layout, Menu, Typography, Spin, Skeleton, Input, Row } from "antd";
import { Item } from "./Item";
import { ShoppingCartAffix } from "../Component/ShoppingCart";
import { Product } from "../Util/View";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const Search = Input.Search;
export class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productCategory: [],
      productList: [],
      currentCategory: 0,
      loading_category: true,
      loading_products: true,
      search: false,
      searchstr: ""
    };
  }

  componentDidMount() {
    fetch("/api/products/category")
      .then((response: any) => response.json())
      .then((d: any) => {
        this.setState({
          productCategory: d,
          loading_category: false
        });
      });
    fetch("/api/products/mainpage")
      .then(r => r.json())
      .then(r => this.setState({ productList: r, loading_products: false }));
  }

  public search(str: string) {
    if (str == "") {
      this.setState({
        search: false
      });
    } else
      this.setState({
        search: true,
        searchstr: str
      });
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
    loading_category: boolean;
    loading_products: boolean;
    search: boolean;
    searchstr: string;
  };

  public render() {
    return (
      <div>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Sider width={200} style={{ background: "#fff" }}>
            <Spin spinning={this.state.loading_category}>
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
                      this.setState({
                        search: false,
                        currentCategory: c.id
                      });
                    }}
                  >
                    {c.typename}
                  </Menu.Item>
                ))}
              </Menu>
            </Spin>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Row>
              {" "}
              <Search
                placeholder="搜索商品"
                onSearch={value => this.search(value)}
                enterButton
                style={{ width: "200px", float: "right" }}
              />
            </Row>
            <Row>
              <Skeleton active loading={this.state.loading_products}>
                {this.state.search && (
                  <Title level={3}>搜索 {this.state.searchstr}:</Title>
                )}
                {this.state.productList.map(c => {
                  if (this.state.search) {
                    if (c.product.name.match(this.state.searchstr))
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
                    else return "";
                  } else {
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
                  }
                })}
              </Skeleton>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}
