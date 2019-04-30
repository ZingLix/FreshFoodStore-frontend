import * as React from "react";
import { Layout, Menu, Typography, Affix, Tabs, Input } from "antd";
import { Route, Link } from "react-router-dom";
import { FundGadget, FundList } from "src/Component/Fund";
import { Overview } from "./Overview";
import { OrderList } from "./OrderList";
import { Stock, StockList } from "./Stock";
import { ProductList } from "./ProductList";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

export class SellerCenter extends React.Component {
  public render() {
    return (
      <Layout style={{ padding: "24px 0", background: "#fff" }}>
        <Sider width={200} style={{ background: "#fff" }}>
          <Title level={3} style={{ marginLeft: "10px" }}>
            卖家中心
          </Title>
          <Affix offsetTop={72}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
            >
              <Menu.Item key="1">
                <Link to="/sellerCenter">卖家信息</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/sellerCenter/productList">货品管理</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/sellerCenter/order">订单管理</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/sellerCenter/stock">进货</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/sellerCenter/stockList">进货管理</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/sellerCenter/fund">资金变动</Link>
              </Menu.Item>
            </Menu>
          </Affix>
        </Sider>
        <Content
          style={{ padding: "0 24px", minHeight: 280, marginLeft: "16px" }}
        >
          <Route exact path="/sellerCenter" component={Overview} />
          <Route path="/sellerCenter/productList" component={ProductList} />
          <Route path="/sellerCenter/order" component={OrderList} />
          <Route path="/sellerCenter/stock" component={Stock} />
          <Route path="/sellerCenter/stockList" component={StockList} />
          <Route path="/sellerCenter/fund" component={FundList} />
        </Content>
      </Layout>
    );
  }
}
