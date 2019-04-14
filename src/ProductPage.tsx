import * as React from "react";
import { Row, Col, Typography, List, Button, Breadcrumb, Icon } from "antd";
import { Product, UserInfo } from "./View";
import { baseUrl } from "./Setting";
import { addItem } from "./ShoppingCart";
const { Title } = Typography;

interface InventoryItem {
  id: number;
  sellerId: number;
  productId: number;
  count: number;
  price: number;
  time: string;
}

interface InventoryInfo {
  sellerId: number;
  sellerInfo: UserInfo;
  inventoryList: InventoryItem[];
}

export class ProductPage extends React.Component<{ match: any }, {}> {
  constructor(props) {
    super(props);
    this.state = {
      product_info: {
        id: 0,
        name: "",
        unit: "",
        img: "",
        category_id: 0
      },
      inventory_list: []
    };
  }

  state: {
    product_info: Product;
    inventory_list: InventoryInfo[];
  };

  componentDidMount() {
    var productid = this.props.match.params.id;
    fetch(baseUrl + "/api/products/" + productid + "/inventory")
      .then(r => r.json())
      .then(r =>
        this.setState({
          inventory_list: r
        })
      );
    fetch(baseUrl + "/api/products/" + productid)
      .then(r => r.json())
      .then(r => this.setState({ product_info: r }));
  }

  public render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>时令蔬菜</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row
          gutter={24}
          style={{
            padding: "24px 0",
            background: "#fff",
            marginTop: "12px"
          }}
        >
          <Col span={8}>
            <img
              src={"/img/" + this.state.product_info.img}
              style={{ width: "100%", padding: "20px" }}
            />
          </Col>
          <Col span={16}>
            <Title level={2}>{this.state.product_info.name}</Title>
            <List
              itemLayout="vertical"
              dataSource={this.state.inventory_list}
              renderItem={(item: InventoryInfo) => (
                <List.Item>
                  <List.Item.Meta title={item.sellerInfo.nickname} />
                  <List
                    itemLayout="horizontal"
                    dataSource={item.inventoryList}
                    renderItem={(item: InventoryItem) => (
                      <List.Item
                        style={{}}
                        extra={
                          <Button
                            onClick={() => addItem(item.sellerId, item.id)}
                          >
                            添加到购物车
                          </Button>
                        }
                      >
                        <div style={{ paddingRight: "10px", width: "100%" }}>
                          {item.price} 元 / {this.state.product_info.unit}
                          <br />
                          {item.time}
                        </div>
                      </List.Item>
                    )}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
