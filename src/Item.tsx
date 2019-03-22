import * as React from "react";
import { Card, Icon, Avatar } from "antd";

const { Meta } = Card;

export class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <Icon type="share-alt" />,
          <Icon type="star" />,
          <Icon type="shopping-cart" />
        ]}
      >
        <Meta title="番茄" description="3.3/斤" />
      </Card>
    );
  }
}
