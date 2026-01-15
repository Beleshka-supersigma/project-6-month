import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";

const Login = () => {
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (await login(form)) {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1677ff, #69b1ff)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: 360,
          padding: "30px",
          borderRadius: 12,
        }}
      >
        <Form layout="vertical" onFinish={submit}>
          <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => {
              if (error) clearError();
              setForm({ ...form, email: e.target.value });
            }}
            style={{ marginBottom: 16 }}
          />

          <Input.Password
            placeholder="Password"
            value={form.password}
            onChange={(e) => {
              if (error) clearError();
              setForm({ ...form, password: e.target.value });
            }}
            style={{ marginBottom: 16 }}
          />

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            style={{ marginBottom: 16 }}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
      </Card>
    </div>
  );
};

export default Login;
