import * as React from "react";
import { Button, Table, InputNumber, message } from "antd";
import { getUserId } from "src/Util/Util";
import { OrderInfomationList } from "src/Component/OrderInfomation";

class StockButton extends React.Component<{ Productid: number }, {}> {
  constructor(props) {
    super(props);
    this.state = {
      val: 0
    };
  }

  state: {
    val: number;
  };

  placeorder = () => {
    var userid = getUserId();
    if (userid == null) return;
    let list: any[] = [];
    var tmp = {
      id: this.props.Productid,
      count: this.state.val
    };
    list.push(tmp);
    fetch("/api/seller/" + userid + "/products", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(list)
    }).then(res => {
      if (res.status == 400) res.json().then(r => message.error(r.msg));
      else res.json().then(message.success("下单成功！"));
    });
  };

  render() {
    return (
      <span className="table-operation">
        <InputNumber
          value={this.state.val}
          onChange={e => this.setState({ val: e })}
          style={{ marginRight: "10px" }}
        />
        <Button onClick={this.placeorder}>进货</Button>
      </span>
    );
  }
}

export class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      loading: true
    };
  }

  state: {
    productList: {
      id: number;
      name: string;
      unit: string;
      category_id: number;
      img: string;
      price: number;
      count: number;
    }[];
    loading: boolean;
  };
  componentDidMount() {
    fetch("/api/seller/baseProducts")
      .then(response => response.json())
      .then(r => {
        this.setState({
          productList: r,
          loading: false
        });
      });
  }

  column = [
    {
      title: "货品",
      key: "name",
      render: item => <a href={"/product/" + item.id}>{item.name}</a>
    },
    {
      title: "单价",
      key: "id",
      render: item => (
        <div key={item.id}>
          {item.price}元/{item.unit}
        </div>
      )
    },
    {
      title: "余量",
      dataIndex: "count"
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (text, record, index) => {
        let val: number | undefined = 0;
        return (
          <div>
            <StockButton Productid={record.id} />
          </div>
        );
      }
    }
  ];

  public render() {
    return (
      <Table
        dataSource={this.state.productList}
        columns={this.column}
        rowKey={record => record.id.toString()}
        loading={this.state.loading}
      />
    );
  }
}

export class StockList extends React.Component {
  public render() {
    return (
      <OrderInfomationList
        fetch={() =>
          fetch(
            "/api/seller/" + localStorage.getItem("user_id") + "/stock"
          ).then(r => r.json())
        }
        seller={true}
      />
    );
  }
}
