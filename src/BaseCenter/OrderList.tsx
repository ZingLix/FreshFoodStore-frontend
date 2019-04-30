import * as React from "react";
import "../App.css";
import {
  Layout,
  Menu,
  Typography,
  Statistic,
  Row,
  Col,
  Button,
  Avatar,
  Divider,
  Affix,
  Tabs,
  Table,
  InputNumber,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Checkbox,
  Tag,
  Modal,
  message
} from "antd";
import { OrderDetail } from "src/Util/View";
import { format } from "util";
import { formatTime } from "src/Util/Util";

export class OrderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true
    };
  }

  componentDidMount() {
    this.refreshOrders();
  }

  refreshOrders() {
    fetch("/api/base/orders")
      .then(res => res.json())
      .then(r =>
        this.setState({
          orders: r.reverse(),
          loading: false
        })
      );
  }

  deliver = (record, e) => {
    console.log(record);
    fetch("/api/base/orders/" + record.id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ operation: 1, message: "" })
    }).then(r => {
      if (r.status == 200) {
        message.success("交付成功！");
        this.refreshOrders();
      } else r.json().then(r => message.warn(r.msg));
    });
  };
  state: {
    orders: OrderDetail[];
    loading: boolean;
  };

  column = [
    {
      title: "进货卖家",
      key: "seller_name",
      render: (text, record, index) => <div>{record.buyer_info.nickname}</div>
    },
    {
      title: "时间",
      key: "time",
      dataIndex: "time",
      render: time => <div>{formatTime(time)}</div>
    },
    {
      title: "总价",
      key: "price",
      dataIndex: "total_price"
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (text, record, index) => (
        <span className="table-operation">
          <Button
            style={{ marginRight: "10px" }}
            disabled={record.status == 4}
            onClick={e => {
              this.deliver(record, e);
            }}
          >
            交付
          </Button>
        </span>
      )
    }
  ];
  subcolumn = [
    {
      title: "货品名",
      key: "name",
      render: record => {
        return <div>{record.product.name}</div>;
      }
    },
    {
      title: "数量",
      key: "count",
      dataIndex: "count"
    },
    {
      title: "价格",
      key: "price",
      dataIndex: "price"
    }
  ];
  subTableRender = record => {
    return (
      <Table
        columns={this.subcolumn}
        dataSource={record.products}
        rowKey={(record: any) => record.product.id}
        pagination={false}
      />
    );
  };
  render() {
    return (
      <Table
        columns={this.column}
        expandedRowRender={record => this.subTableRender(record)}
        dataSource={this.state.orders}
        rowKey={record => record.id}
        loading={this.state.loading}
      />
    );
  }
}
