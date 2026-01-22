import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Alert } from "antd";
import { useLogin } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = () => {
    loginMutation.mutate(form, {
      onSuccess: () => navigate("/"),
    });
  };

  return (
    <Card title="Login" style={{ width: 400, margin: "100px auto" }}>
      {loginMutation.isError && (
        <Alert
          type="error"
          message={
            loginMutation.error.response?.data?.message || "Login failed"
          }
        />
      )}

      <Form layout="vertical" onFinish={submit}>
        <Form.Item label="Email">
          <Input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Password">
          <Input.Password
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loginMutation.isLoading}
          block
        >
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
