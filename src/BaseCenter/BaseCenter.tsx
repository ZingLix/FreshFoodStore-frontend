import * as React from "react";
import "../App.css";
import {
  Layout,
  Menu,
  Typography,
  Statistic,
  Row,
  Col,
  Button,
  Avatar,
  Divider,
  Affix,
  Tabs,
  Table,
  InputNumber,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Checkbox,
  Tag,
  Modal
} from "antd";
import { Route, Link } from "react-router-dom";
import { UserInfomationForm } from "../Component/UserInfomationForm";
import { Order, OrderInfomationList } from "../Component/OrderInfomation";
import { OrderDetail } from "../Util/View";
import Column from "antd/lib/table/Column";
import { FundList } from "src/Component/Fund";
import { Product } from "./ProductList";
import { Category } from './Category';
import { OrderInfo } from './OrderList';
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const TabPane = Tabs.TabPane;





export class BaseCenter extends React.Component {
  public render() {
    return (
      <Layout style={{ padding: "24px 0", background: "#fff" }}>
        <Sider width={200} style={{ background: "#fff" }}>
          <Title level={3} style={{ marginLeft: "10px" }}>
            采买基地
          </Title>
          <Affix offsetTop={72}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
            >
              <Menu.Item key="1">
                <Link to="/baseCenter">库存管理</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/baseCenter/category">产品分类</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/baseCenter/order">进货信息</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/baseCenter/fund">资金变动</Link>
              </Menu.Item>
            </Menu>
          </Affix>
        </Sider>
        <Content
          style={{
            padding: "44px 24px",
            minHeight: 280,
            marginLeft: "16px"
          }}
        >
          <Route exact path="/baseCenter" component={Product} />
          <Route exact path="/baseCenter/category" component={Category} />
          <Route path="/baseCenter/order" component={OrderInfo} />
          <Route path="/baseCenter/fund" component={FundList} />
        </Content>
      </Layout>
    );
  }
}
