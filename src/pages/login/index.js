import React from 'react';
import {Button, Form, Input} from 'antd';
import {Link} from "react-router-dom";
import './login.css'

export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    }
  }

  onLogin = () => {
    console.log('登陆：', this.state)
  }

  componentDidMount() {
    console.log('挂载完成');
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
      <div className="login-container">
        <Form
          {...formItemLayout}
          onFinish={this.onLogin}>
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
          <Form.Item {...formTailLayout}>
            <Button type="primary" htmlType="submit">登陆</Button>
            <Button style={{marginLeft: 12}} type="default">
              <Link to="/register">注册</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
