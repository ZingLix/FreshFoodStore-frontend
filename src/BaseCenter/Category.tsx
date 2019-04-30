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
  Spin,
  InputNumber,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Checkbox,
  Tag,
  Modal
} from "antd";

export class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      inputVisible: false,
      inputValue: "",
      loading: true
    };
  }

  state: {
    category: {
      id: number;
      typename: string;
    }[];
    inputVisible: false;
    inputValue: string;
    loading: boolean;
  };
  input;

  componentDidMount() {
    this.getCategory();
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => (this.input = input);

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    if (this.state.inputValue != "") {
      fetch("/api/products/category", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ typename: this.state.inputValue })
      })
        .then(res => res.json())
        .then(res => {
          var tmp = this.state.category;
          tmp.push(res);
          this.setState({
            category: tmp
          });
        });
    }

    this.setState({
      inputValue: "",
      loading: false
    });
  };

  getCategory() {
    fetch("/api/products/category")
      .then((response: any) => response.json())
      .then(r => {
        this.setState({
          category: r,
          loading: false
        });
      });
  }

  deleteCategory(id) {
    fetch("/api/products/category/" + id, {
      method: "DELETE"
    });
  }
  forMap = c => {
    const tagElem = (
      <Tag closable onClose={() => this.deleteCategory(c.id)}>
        {c.typename}
      </Tag>
    );
    return (
      <span key={c.id} style={{ display: "inline-block", marginBottom: "6px" }}>
        {tagElem}
      </span>
    );
  };
  public render() {
    const { inputVisible, inputValue } = this.state;
    const tagChild = this.state.category.map(this.forMap);
    return (
      <div>
        <Row>
          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag
              onClick={this.showInput}
              style={{ background: "#fff", borderStyle: "dashed" }}
            >
              <Icon type="plus" /> 添加分类
            </Tag>
          )}
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Spin spinning={this.state.loading}>{tagChild}</Spin>{" "}
        </Row>
      </div>
    );
  }
}
