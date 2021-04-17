import React, { Component } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { connect } from "react-redux";
import { userRegisterAction } from "../../Action/authenticationActions";
import { decryption, encryption } from "../../Utils/decryption";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { password,confirmPassword } from "../../Utils/validation";

class RegisterComponent extends Component {
  state = {
    loading: false,
  };

  /***
   * This function submit data, When click on Save Button
   * ** */
  onFinish = (values) => {
    // console.log("Received values of form: ", values);
    let str = window.location.search;
    let res = str.split("=");
    const payload = {
      email: values.email,
      password: values.password.trim(), //encryption(values.password),
      recordId: res[2],
    };
    this.setState({ loading: true });
    setTimeout(() => {
      this.props.userRegisterAction(payload);
    }, 2000);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.register !== this.props.register) {
      if (
        this.props.register.loading === false &&
        this.props.register.response.message ===
          "Sign up has been successfully."
      ) {
        message.success("Password Generated Successfully");
        this.setState({ loading: false });
        this.props.history.push("/");
      }
      if (
        this.props.register.loading === false &&
        this.props.register.response.message ===
          "Cannot read property 'data' of undefined"
      ) {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    let str = window.location.search;
    let res = str.split("$");
    let decryptedRes = decryption(res[1]);
    // console.log(">>>>>>>", this.props.register);
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
            fields={[
              {
                name: ["email"],
                value: decryptedRes,
              },
            ]}
            onFinish={this.onFinish}
          >
            <h2 className="logo">
              <span>logo</span>
            </h2>
            <Form.Item
              name={"email"}
              //   rules={[
              //     {
              //       required: true,
              //       // message: "Please input your Username!",
              //       type: "email",
              //     },
              //   ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                disabled={true}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={password}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              rules={confirmPassword}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="login-form-button"
                loading={this.state.loading}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({ register: state.auth.register });
const mapDispatchToProps = {
  userRegisterAction: userRegisterAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
