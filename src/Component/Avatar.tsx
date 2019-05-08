import * as React from "react";
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
  message,
  Input,
  Empty,
  Form,
  Dropdown,
  Modal
} from "antd";
import { LoginWindow } from "src/Component/LoginWindow";
import { bhistory } from "../index";

export class LoginAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginWindow: {
        visible: false,
        loading: false
      },
      login: false
    };
  }
  componentDidMount() {
    this.refreshLoginStatus();
  }
  state: {
    loginWindow: {
      visible: boolean;
      loading: boolean;
    };
    login: boolean;
  };
  private loginWindow;

  loginWindowOpen = () => {
    this.loginWindow.open();
  };

  logout = () => {
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_id");
    localStorage.removeItem("shoppingcart");
    this.refreshLoginStatus();
    bhistory.push("/");
    window.location.reload();
  };
  menu = (
    <Menu>
      <Menu.Item style={{ width: "120px", textAlign: "center" }}>
        <a onClick={this.logout}>注销</a>
      </Menu.Item>
    </Menu>
  );

  refreshLoginStatus = () => {
    var type = localStorage.getItem("user_type");
    if (type == undefined) this.setState({ login: true });
    else this.setState({ login: false });
  };

  clickAvatar = () => {
    var type = localStorage.getItem("user_type");
    if (type == undefined) this.loginWindowOpen();
    else if (type == "1") bhistory.push("/userCenter");
    else if (type == "2") bhistory.push("/sellerCenter");
    else if (type == "3") bhistory.push("/baseCenter");
  };
  render() {
    return (
      <div style={{ cursor: "pointer" }}>
        <Dropdown overlay={this.menu} disabled={this.state.login}>
          <div onClick={this.clickAvatar}>
            <Avatar size={40} icon="user" style={{ marginRight: "12px" }} />
          </div>
        </Dropdown>
        <LoginWindow
          ref={r => {
            this.loginWindow = r;
          }}
        />
      </div>
    );
  }
}

export class ChangeableAvatar extends React.Component{

  constructor(props){
    super(props)
    this.state={
      img:""
    }
  }

  state:{
    img:string
  }

  render(){
    return (<div>
      {this.state.img==""&&
      <Avatar size={64} icon="user" ></Avatar>
      }{
        this.state.img!=""&&
        <Avatar size={64} src={this.state.img}></Avatar>
      }
      </div>)
  }
}