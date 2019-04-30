import * as React from "react";
import { getUserId } from "src/Util/Util";
import { OrderInfomationList } from "src/Component/OrderInfomation";

export class OrderList extends React.Component {
  constructor(props) {
    super(props);
  }

  fetch = () => {
    var userid = getUserId();
    if (userid == null) return {};
    var res = {};
    return fetch("/api/seller/" + userid + "/order").then(r => r.json());
  };

  public render() {
    return <OrderInfomationList fetch={this.fetch} seller={true} />;
  }
}
