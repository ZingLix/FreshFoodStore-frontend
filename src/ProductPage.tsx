import * as React from "react";
import { Row, Col, Typography, List, Button } from "antd";

const { Title } = Typography;

interface props {
  id: number;
}

export class ProductPage extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    productInfo: {
      name: "番茄",
      description: "description",
      unit: "斤",
      img: "test.png"
    },
    merchantList: [
      {
        merchant_id: 1,
        location: "XX路1号",
        price: 3.3,
        description: "123",
        date: "2019-3-18",
        record_id: 12
      },
      {
        merchant_id: 2,
        location: "XX路3号",
        price: 3.5,
        description: "321",
        date: "2019-3-19",
        record_id: 15
      }
    ]
  };

  public render() {
    return (
      <Row gutter={24} style={{ padding: "24px 0", background: "#fff" }}>
        <Col span={8}>
          <img
            src={"/img/" + this.state.productInfo.img}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={16}>
          <Title level={2}>{this.state.productInfo.name}</Title>
          <Title level={4} style={{ marginTop: "3px" }}>
            {this.state.productInfo.description}
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={this.state.merchantList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={item.location} description={item.date} />
                <div style={{ paddingRight: "10px" }}>
                  {item.price} 元 / {this.state.productInfo.unit}
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
