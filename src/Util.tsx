import * as React from "react";
import { Input } from "antd";

export class ClickInput extends React.Component<
  { data: string; submit: any },
  {}
> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      inputvalue: this.props.data
    };
  }

  InputRef;
  state: {
    visible: boolean;
    inputvalue: string;
  };

  show = () => {
    this.setState(
      {
        visible: true
      },
      () => this.InputRef.focus()
    );
  };
  hide = () => {
    this.setState({
      visible: false
    });
  };
  onChange = e => {
    this.setState({
      inputvalue: e.target.value
    });
  };
  submit = e => {
    this.props.submit(e.target.value);
    this.hide();
  };
  saveInputRef = input => (this.InputRef = input);
  render() {
    return (
      <div>
        {!this.state.visible && (
          <div onClick={this.show}>{this.props.data}</div>
        )}
        {this.state.visible && (
          <Input
            ref={this.saveInputRef}
            value={this.state.inputvalue}
            onBlur={this.submit}
            onPressEnter={this.submit}
            onChange={this.onChange}
          />
        )}
      </div>
    );
  }
}
