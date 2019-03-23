import * as React from "react";
import { Card, Icon, Avatar } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

interface itemProps {
  data: {
    id: number;
    name: string;
    unit: string;
    minprice: number;
    img: string;
  };
}
export class Item extends React.Component<itemProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <Card
        style={{ width: 300 }}
        cover={
          <Link to={"/product/" + this.props.data.id}>
            <img
              alt="example"
              src={"/img/" + this.props.data.img}
              style={{ width: "100%", height: 300 }}
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
          title={this.props.data.name}
          description={
            this.props.data.minprice + "元/" + this.props.data.unit + " 起"
          }
        />
      </Card>
    );
  }
}
