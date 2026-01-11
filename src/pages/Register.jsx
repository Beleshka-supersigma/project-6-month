import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, Typography } from "antd";

const { Title } = Typography;

const Register = () => {
  const { isLoading, register, error } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (await register(form)) {
      navigate("/login");
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
        <Form onFinish={submit} layout="vertical">
          <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
            Register
          </Title>

          <Input
            value={form.username}
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            style={{ marginBottom: 16 }}
          />

          <Input
            value={form.email}
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ marginBottom: 16 }}
          />

          <Input
            type="password"
            value={form.password}
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ marginBottom: 16 }}
          />

          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Register
          </Button>

          {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
        </Form>
      </Card>
    </div>
  );
};

export default Register;
