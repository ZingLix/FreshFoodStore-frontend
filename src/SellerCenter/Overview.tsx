import * as React from "react";
import { Typography, Statistic, Row, Col, Avatar, Divider, Spin } from "antd";
import { getUserId } from "src/Util/Util";
import { FundGadget } from "src/Component/Fund";
import { UserInfomationForm } from "src/Component/UserInfomationForm";

const { Title } = Typography;

export class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fund: 0,
      visible: false,
      topupvalue: 0,
      loadingnickname: true,
      loadingstatistic: true,
      orderstatistic: { "2": 0, "3": 0 }
    };
  }

  state: {
    username: string;
    fund: number;
    visible: boolean;
    topupvalue: number;
    loadingnickname: boolean;
    loadingstatistic: boolean;
    orderstatistic: any;
  };

  componentDidMount() {
    var userid = getUserId();
    if (userid == null) return;
    fetch("/api/user/" + userid + "/info").then(r => {
      if (r.status == 200) {
        r.json().then(r =>
          this.setState({
            username: r.nickname,
            loadingnickname: false
          })
        );
      }
    });
    fetch("/api/seller/" + userid + "/overview")
      .then(r => r.json())
      .then(r => {
        this.setState({
          orderstatistic: r,
          loadingstatistic: false
        });
      });
  }

  public render() {
    return (
      <div>
        <Spin spinning={this.state.loadingnickname}>
          <Row type="flex" align="middle" style={{ marginTop: "60px" }}>
            <Col>
              <Avatar size={64} icon="user" />
            </Col>
            <Col>
              {" "}
              <Title level={4} style={{ marginLeft: "40px" }}>
                {this.state.username}
              </Title>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "16px" }}>
            <Col span={4}>
              <FundGadget />
            </Col>
            <Col span={4}>
              <Statistic
                title="待发货订单"
                value={this.state.orderstatistic["2"]}
              />
            </Col>
            <Col span={4}>
              <Statistic
                title="配送中订单"
                value={this.state.orderstatistic["3"]}
              />
            </Col>
          </Row>{" "}
        </Spin>
        <Divider />

        <UserInfomationForm />
      </div>
    );
  }
}
