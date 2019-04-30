import * as React from "react";
import { Table, message } from "antd";
import { getUserId } from "src/Util/Util";

import { ClickInput } from "src/Util/ClickInput";

export class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      countVisible: false,
      loading: true
    };
  }
  state: {
    inventory: {
      product_id: number;
      product: {
        id: number;
        name: string;
        unit: string;
        category_id: number;
        img: string;
      };
      inventoryList: {
        id: number;
        sellerId: number;
        productId: number;
        count: number;
        price: number;
        time: string;
      }[];
    }[];
    countVisible: boolean;
    loading: boolean;
  };

  componentDidMount() {
    var userid = getUserId();
    if (userid == null) return;
    fetch("/api/seller/" + userid + "/inventory")
      .then(r => r.json())
      .then(r =>
        this.setState({
          inventory: r,
          loading: false
        })
      );
  }

  updateItem = (item, count, price) => {
    var tmp = this.state.inventory;
    for (var u of tmp) {
      if (u.product_id == item.productId) {
        for (var v of u.inventoryList) {
          if (v.id == item.id) {
            v.count = count;
            v.price = price;
            fetch(
              "/api/seller/" +
                localStorage.getItem("user_id") +
                "/inventory/" +
                item.id,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(v)
              }
            ).then(r=>{
                if(r.status==200) message.success("信息已更新")
                else r.json().then(r=>message.warn(r.msg))
            })
          }
        }
      }
    }
    this.setState({
      inventoryList: tmp
    });
  };

  tableColumn = [
    {
      title: "商品名",
      render: item => (
        <a href={"/product/" + item.product_id}>{item.product.name}</a>
      ),
      key: "name"
    },
    {
      title: "单位",
      render: item => <div>{item.product.unit}</div>,
      key: "unit"
    }
  ];
  subTableColumn = [
    {
      title: "入库日期",
      dataIndex: "time",
      key: "time"
    },
    {
      title: "剩余数量",
      render: item => {
        return (
          <ClickInput
            data={item.count}
            submit={t => {
              this.updateItem(item, parseInt(t), item.price);
            }}
          />
        );
      },
      key: "count"
    },
    {
      title: "当前价格",
      render: item => {
        return (
          <ClickInput
            data={item.price}
            submit={t => {
              this.updateItem(item, item.count, parseInt(t));
            }}
          />
        );
      },
      key: "price"
    }
  ];

  subTable = (record, index, indent, expanded) => {
    return (
      <Table
        columns={this.subTableColumn}
        dataSource={record.inventoryList}
        pagination={false}
        rowKey={(record: any) => record.id.toString()}
      />
    );
  };

  public render() {
    return (
      <Table
        columns={this.tableColumn}
        expandedRowRender={this.subTable}
        dataSource={this.state.inventory}
        rowKey={record => record.product_id.toString()}
        loading={this.state.loading}
      />
    );
  }
}
