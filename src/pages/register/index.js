import React from 'react';
import './register.css'
import {Button, Col, Form, Input, message, Row, Select} from "antd";
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

    const { Option } = Select;

    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select
          style={{
            width: 70,
          }}
        >
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      </Form.Item>
    );

    return (
      <div className="register-container">
        <Form {...formItemLayout}
              onFinish={this.onRegister}
              initialValues={{
                prefix: '86'
              }}>
          <Form.Item
            {...formItemLayout}
            label="用户名"
            name="userName"
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
          <Form.Item
            {...formItemLayout}
            label="手机号"
            name="mobile"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
            ]}>
            <Input
              addonBefore={prefixSelector}
              value={this.state.mobile}
              onChange={e => {
                this.setState({
                  mobile: e.target.value
                })
              }}/>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="验证码"
            name="verificationCode"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}>
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
          <Form.Item
            {...formItemLayout}
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}>
            <Input.Password
              value={this.state.password}
              onChange={e => {
                this.setState({
                  password: e.target.value
                })
              }}
              placeholder="请输入密码"/>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="确认密码"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: '请确认密码',
              },
            ]}>
            <Input.Password
              value={this.state.confirmPassword}
              onChange={e => {
                this.setState({
                  confirmPassword: e.target.value
                })
              }}
              placeholder="请确认密码"/>
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button type="primary" htmlType="submit">注册</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
