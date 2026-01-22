import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Alert } from "antd";
import { useRegister } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = () => {
    registerMutation.mutate(form, {
      onSuccess: () => navigate("/login"),
    });
  };

  return (
    <Card title="Register" style={{ width: 400, margin: "100px auto" }}>
      {registerMutation.isError && (
        <Alert
          type="error"
          message={
            registerMutation.error.response?.data?.message || "Register failed"
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
          loading={registerMutation.isLoading}
          block
        >
          Register
        </Button>
      </Form>
    </Card>
  );
};

export default Register;
