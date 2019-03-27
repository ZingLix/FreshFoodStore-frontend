import * as React from "react";
import {
  Affix,
  Button,
  Checkbox,
  Drawer,
  Icon,
  InputNumber,
  Layout,
  List,
  Typography,
  Row,
  Col,
  Collapse,
  Table,
  Modal,
  Statistic
} from "antd";
import "./App.css";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const Panel = Collapse.Panel;

interface item {
  id: number;
  inventory_id: number;
  name: string;
  unit: string;
  price: number;
  count: number;
  img: string;
}

interface entry {
  seller_name: string;
  item: item[];
}

class CheckOutModal extends React.Component<{ Item: entry[] }, {}> {
  constructor(props) {
    super(props);
  }

  columns = [
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "单价",
      key: "price",
      render: item => (
        <div>
          {item.price}元/{item.unit}
        </div>
      )
    },
    {
      title: "数量",
      dataIndex: "count",
      key: "count"
    },
    {
      title: "总价",
      render: item => <div>{(item.price * item.count).toFixed(2)}</div>
    }
  ];

  public renderTable(item: item[]) {
    return (
      <Table
        columns={this.columns}
        dataSource={item}
        pagination={false}
        rowKey={record => record.id.toString()}
      />
    );
  }

  public render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="姓名" value={"xxx"} />
          </Col>
          <Col span={12}>
            <Statistic title="电话" value={"1888888888"} />
          </Col>
        </Row>
        <Statistic
          title="地址"
          value={"xxx路xxx号"}
          style={{ marginTop: "20px" }}
        />
        <Button style={{ marginTop: 16 }} type="primary">
          修改
        </Button>
        <Collapse bordered={false} style={{ marginTop: "20px" }}>
          {this.props.Item.map(item => (
            <Panel
              header={item.seller_name}
              key={item.seller_name}
              style={{
                paddingTop: "0px"
              }}
            >
              {this.renderTable(item.item)}
            </Panel>
          ))}
        </Collapse>
      </div>
    );
  }
}

class ShoppingCartItem extends React.Component<{ Item: entry }, {}> {
  constructor(props) {
    super(props);
  }

  public renderItem(item: item) {
    return (
      <Row type="flex" justify="space-around" align="middle" key={item.id}>
        <Col
          style={{
            background: "#FFFFFF",
            paddingRight: "24px"
          }}
          span={2}
        >
          <Checkbox />
        </Col>
        <Col
          style={{
            background: "#FFFFFF",
            paddingRight: "24px"
          }}
          span={4}
        >
          <img
            src={"/img/" + item.img}
            style={{ width: "50px", height: "50px" }}
          />
        </Col>
        <Col
          style={{
            background: "#FFFFFF"
          }}
          span={4}
        >
          <div>
            <div>{item.name}</div>
            <div>{item.price + " 元/" + item.unit}</div>
          </div>
        </Col>
        <Col
          style={{
            background: "#FFFFFF"
          }}
          span={4}
          offset={4}
        >
          <InputNumber min={1} defaultValue={1} />
        </Col>
        <Col
          style={{
            background: "#FFFFFF",
            paddingLeft: "12px"
          }}
          span={2}
        >
          <Button shape="circle" icon="close" />
        </Col>
      </Row>
    );
  }

  public render() {
    return (
      <div>
        <Title level={3}>{this.props.Item.seller_name}</Title>
        {this.props.Item.item.map(item => this.renderItem(item))}
      </div>
    );
  }
}

export class ShoppingCartAffix extends React.Component {
  // public state = { visible: false };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      shoppintcart: {
        1: {
          seller_name: "xx水果店",
          item: [
            {
              id: 1,
              inventory_id: 12,
              name: "番茄",
              unit: "斤",
              price: 2.2,
              count: 3,
              img: "test.png"
            }
          ]
        },
        2: {
          seller_name: "xx超市",
          item: [
            {
              id: 2,
              inventory_id: 13,
              name: "黄瓜",
              unit: "斤",
              price: 2.6,
              count: 4,
              img: "test.png"
            }
          ]
        }
      },
      modalVisible: false
    };
  }

  state: {
    visible: boolean;
    shoppintcart: {
      [seller_id: number]: entry;
    };
    modalVisible: boolean;
  };

  private showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  private onClose = () => {
    this.setState({
      visible: false
    });
  };

  private openModal = () => {
    this.setState({
      visible: false,
      modalVisible: true
    });
  };

  private closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  private checkout = () => {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "下单成功",
      content: `${secondsToGo} 秒后返回.`
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `${secondsToGo} 秒后返回.`
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
    this.setState({
      modalVisible: false
    });
  };

  public render() {
    return (
      <div>
        <Affix offsetBottom={50} style={{ position: "absolute", right: 50 }}>
          <Button
            type="primary"
            shape="circle"
            style={{
              width: "75px",
              height: "75px",
              textAlign: "center"
            }}
            onClick={this.showDrawer}
          >
            <Icon
              type="shopping-cart"
              style={{
                fontSize: "45px",
                margin: "13px 10px 50px 8px"
              }}
            />
          </Button>
        </Affix>
        <Drawer
          title="购物车"
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          width={500}
        >
          <List
            itemLayout="vertical"
            size="large"
            dataSource={Object.values(this.state.shoppintcart)}
            renderItem={item => (
              <List.Item key={item.seller_name}>
                <ShoppingCartItem Item={item} />
              </List.Item>
            )}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e8e8e8",
              padding: "10px 16px",
              textAlign: "right",
              left: 0,
              background: "#fff",
              borderRadius: "0 0 4px 4px"
            }}
          >
            <Row gutter={16} type="flex" justify="end">
              <Col span={6}>
                <div>总价：...</div>
              </Col>
              <Col span={6}>
                <Button
                  style={{ marginRight: "10px", paddingRight: "20px" }}
                  onClick={this.openModal}
                  type="primary"
                >
                  下单
                </Button>
              </Col>
            </Row>
          </div>
        </Drawer>
        <Modal
          title="购物车"
          visible={this.state.modalVisible}
          onCancel={this.closeModal}
          width="60%"
          footer={[
            <Button key="back" onClick={this.closeModal}>
              返回
            </Button>,
            <Button key="submit" type="primary" onClick={this.checkout}>
              下单
            </Button>
          ]}
        >
          <CheckOutModal Item={Object.values(this.state.shoppintcart)} />
        </Modal>
      </div>
    );
  }
}
