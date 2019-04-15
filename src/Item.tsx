import * as React from "react";
import { Card, Icon, Avatar } from "antd";
import { Link } from "react-router-dom";
import { Product } from "./View";

const { Meta } = Card;

interface itemProps {
  data: {
    id: number;
    minprice: number;
    product: Product;
  };
}
export class Item extends React.Component<itemProps, {}> {
  constructor(props) {
    super(props);
  }

  renderPrice = () => {
    if (this.props.data.minprice == 0) {
      return <div>暂时缺货</div>;
    } else {
      return (
        <div>
          {this.props.data.minprice} 元/
          {this.props.data.product.unit} 起
        </div>
      );
    }
  };

  public render() {
    return (
      <Card
        style={{ width: 250 }}
        cover={
          <Link to={"/product/" + this.props.data.id}>
            <img
              alt="example"
              src={"/img/" + this.props.data.product.img}
              style={{ width: "100%", height: 250 }}
            />
          </Link>
        }
        actions={[
          <Icon type="star" />,
          <Link to={"/product/" + this.props.data.id}>
            <Icon type="ellipsis" />
          </Link>,
          <Icon type="shopping-cart" />
        ]}
      >
        <Meta
          title={this.props.data.product.name}
          description={<div>{this.renderPrice()}</div>}
        />
      </Card>
    );
  }
}
