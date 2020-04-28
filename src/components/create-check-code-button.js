import React from 'react';
import {Button} from "antd";

export default function createCheckCodeButton(option = {}) {
  option = Object.assign({
    seconds: 5,
    text: '发送验证码'
  }, option);

  const {seconds, text, ...extraProps} = option;

  class CheckCodeButton extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        current: seconds,
        loading: false
      }
    }

    onClick = (e) => {
      if (this.state.loading) return;

      if (typeof this.props.onClick === 'function') {
        this.props.onClick(e);
      }

      if (this._timer) {
        clearInterval(this._timer);
      }

      this._timer = setInterval(() => {
        if (this.state.current > 1) {
          this.setState({
            current: this.state.current - 1
          })
        } else {
          this.setState({
            loading: false,
            current: seconds
          })
          clearInterval(this._timer);
          this._timer = null;
        }
      }, 1000);

      this.setState({
        loading: true,
      })
    }

    componentWillUnmount() {
      if (this._timer) {
        clearInterval(this._timer);
      }
    }

    render() {
      return (
        <Button
          {...this.props}
          disabled={this.state.loading}
          onClick={this.onClick}>
          <span x-if={this.state.loading}>{this.state.current}s</span>
          <span x-else>{text}</span>
        </Button>
      );
    }
  }

  return CheckCodeButton;
}
