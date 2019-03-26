import * as React from "react";
import { Row, Col, Typography, List, Button } from "antd";

const { Title } = Typography;

interface ProductInfo {
  id: number;
  name: string;
  unit: string;
  img: string;
}

interface InventoryInfo {
  id: number;
  seller_id: number;
  seller_name: string;
  count: number;
  price: number;
  time: string;
}

interface props {
  id: number;
}

export class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_info: {
        id: 1,
        name: "番茄",
        unit: "斤",
        img: "test.png"
      },
      inventory_list: [
        {
          id: 321,
          seller_id: 1,
          seller_name: "xx水果店",
          price: 3.3,
          count: 300,
          time: "2019-3-18"
        },
        {
          id: 123,
          seller_id: 2,
          seller_name: "xx超市",
          price: 3.5,
          count: 300,
          time: "2019-3-19"
        }
      ]
    };
  }

  state: {
    product_info: ProductInfo;
    inventory_list: InventoryInfo[];
  };

  public render() {
    return (
      <Row gutter={24} style={{ padding: "24px 0", background: "#fff" }}>
        <Col span={8}>
          <img
            src={"/img/" + this.state.product_info.img}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={16}>
          <Title level={2}>{this.state.product_info.name}</Title>
          <List
            itemLayout="horizontal"
            dataSource={this.state.inventory_list}
            renderItem={(item: InventoryInfo) => (
              <List.Item>
                <List.Item.Meta
                  title={item.seller_name}
                  description={item.time}
                />
                <div style={{ paddingRight: "10px" }}>
                  {item.price} 元 / {this.state.product_info.unit}
                </div>
                <Button>添加到购物车</Button>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  }
}
