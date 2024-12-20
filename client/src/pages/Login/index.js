import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/users";
// import { axiosInstance } from "../../api";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        console.log(response.message);
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
      } else {
        console.log(response.message);
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };
  return (
    <>
      <main className="App-header">
        <h1>Login to Book My Show</h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input id="email" type="text" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input
                id="password"
                type="pasword"
                placeholder="Enter your password"
              />
            </Form.Item>
            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              New User ? <Link to="/Register">Register</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;