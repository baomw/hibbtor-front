import React from 'react';
import './register.css'
import {Button, Col, Form, Input, message, Row} from "antd";
import {Link} from "react-router-dom";
import createCheckCodeButton from "../../components/create-check-code-button";

const CheckCodeButton = createCheckCodeButton()

export default class Resister extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      mobile: '',
      verificationCode: '',
      password: '',
      confirmPassword: '',
    }
  }

  onRegister = () => {
    message.success("注册成功")
  }

  onSend = () => {
    message.success("发送了")
  }

  render() {
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 16},
    };
    const formTailLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 16, offset: 5},
    };
    return (
      <div className="register-container">
        <Form {...formItemLayout}>
          <Form.Item
            {...formItemLayout}
            label="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}>
            <Input
              value={this.state.userName}
              onChange={e => {
                this.setState({
                  userName: e.target.value
                })
              }}
              placeholder="请输入用户名"/>
          </Form.Item>
          <Form.Item {...formItemLayout} label="手机号">
            <Input
              value={this.state.mobile}
              onChange={e => {
                this.setState({
                  mobile: e.target.value
                })
              }}/>
          </Form.Item>
          <Form.Item {...formItemLayout} label="验证码">
            <Row>
              <Col span={15}>
                <Input
                  value={this.state.verificationCode}
                  onChange={e => {
                    this.setState({
                      verificationCode: e.target.value
                    })
                  }}/>
              </Col>
              <Col span={8} push={1}>
                <CheckCodeButton block onClick={this.onSend}/>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...formItemLayout} label="密码">
            <Input
              type="password"
              value={this.state.password}
              onChange={e => {
                this.setState({
                  password: e.target.value
                })
              }}
              placeholder="请输入密码"/>
          </Form.Item>
          <Form.Item {...formItemLayout} label="确认密码">
            <Input
              type="password"
              value={this.state.confirmPassword}
              onChange={e => {
                this.setState({
                  confirmPassword: e.target.value
                })
              }}
              placeholder="请确认密码"/>
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button type="primary">
              <Link to="/register" onClick={this.onRegister}>注册</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
