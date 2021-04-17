import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Checkbox, Row, Col, message } from "antd";
import { loginUserAction } from "../../Action/authenticationActions";
import { encryption } from "../../Utils/decryption";
import { setCookie } from "../../Utils/cookies";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { email } from "../../Utils/validation";

class ForgotPassword extends Component {
  state = {
    loading: false,
  };

  /***
   * This function login user to Application, When click on login Button
   * ** */
  onFinish = (values) => {
    console.log("Received values of form: ", values);
    // const payload = {
    //   email: values.user,
    //   password: values.password.trim(), // encryption(values.password.trim()),
    // };
    this.setState({ loading: true });
    setTimeout(() => {
      //this.props.loginUserAction(payload);
    }, 1000);
  };

  componentDidUpdate(prevProps) {
    //  debugger;
    if (prevProps.login !== this.props.login) {
      if (
        this.props.login.loading === false &&
        this.props.login.response.message === "Login successfully."
      ) {
        message.success("Login successfully.");
        setCookie(
          "token",
          this.props.login.response.result
            ? this.props.login.response.result.authToken
            : ""
        );
        this.props.history.push("/dashboard");
        this.setState({ loading: false });
      }
      if (
        this.props.login.loading === false &&
        this.props.login.response.message ===
          "Cannot read property 'data' of undefined"
      ) {
        this.setState({ loading: false });
      }
    }
  }
  render() {
    return (
      <Row
        className="login-row"
        type="flex"
        justify="space-around"
        align="middle"
      >
        <Col span="8">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <h2 className="logo">
              <span>logo</span>
            </h2>
            <Form.Item
              name={"user"}
              rules={email}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            {/* <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item> */}
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="login-form-button"
                loading={this.state.loading}
              >
                Forgot Password
              </Button>
              {/* Or <a href="">register now!</a> */}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({ login: state.auth.login });
const mapDispatchToProps = {
  loginUserAction: loginUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
