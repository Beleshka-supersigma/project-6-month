import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { useAuthStore } from "../store/authStore";
import { Typography } from "antd";

const { Title } = Typography;

const AppRouter = () => {
  const { isAuth } = useAuthStore();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          isAuth ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
              }}
            >
              <Title level={2}>Welcome🥳</Title>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default AppRouter;
