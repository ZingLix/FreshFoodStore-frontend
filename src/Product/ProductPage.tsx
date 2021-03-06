import * as React from "react";
import { Row, Col, Typography, List, Button, Breadcrumb, Icon } from "antd";
import { Product, UserInfo, InventoryItem } from "../Util/View";
import { addItem } from "../Component/ShoppingCart";
import { formatTime } from "src/Util/Util";
const { Title } = Typography;

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
    fetch("/api/products/" + productid + "/inventory")
      .then(r => r.json())
      .then(r =>
        this.setState({
          inventory_list: r
        })
      );
    fetch("/api/products/" + productid)
      .then(r => r.json())
      .then(r => this.setState({ product_info: r }));
  }

  public render() {
    return (
      <div>
        {/* <Breadcrumb>
          <Breadcrumb.Item href="/">
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>时令蔬菜</span>
          </Breadcrumb.Item>
        </Breadcrumb> */}
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
              src={"/img/products/" + this.state.product_info.img}
              style={{ width: "100%", padding: "20px" }}
            />
          </Col>
          <Col span={10}>
            <Title level={2}>{this.state.product_info.name}</Title>
            <List
              itemLayout="vertical"
              dataSource={this.state.inventory_list}
              renderItem={(item: InventoryInfo) => (
                <List.Item style={{ marginLeft: "10px" }}>
                  <Title level={4}>{item.sellerInfo.nickname}</Title>
                  <List
                    itemLayout="horizontal"
                    dataSource={item.inventoryList}
                    renderItem={(item: InventoryItem) => (
                      <List.Item
                        style={{ marginLeft: "10px" }}
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
                          {formatTime(item.time)}
                          <br />
                          剩余：{item.count}
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
