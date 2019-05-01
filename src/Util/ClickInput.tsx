import * as React from "react";
import { Input, Icon, Typography } from "antd";
const { Paragraph } = Typography;

export class ClickInput extends React.Component<
  { data: string; submit: any },
  {}
> {
  constructor(props) {
    super(props);
    this.state = {
      str: this.props.data
    };
  }
  state: {
    str: string;
  };

  componentWillReceiveProps(props) {
    this.setState({
      inputvalue: props.data
    });
  }

  onChange = str => {
    console.log(str);
    this.setState({
      str: str
    });
    this.props.submit(str);
  };

  render() {
    return (
      <div>
        <Paragraph editable={{ onChange: this.onChange }}>
          {this.state.str.toString()}
        </Paragraph>
      </div>
    );
  }
}
