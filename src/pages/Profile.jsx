import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Typography,
  List,
  Input,
  Form,
  Space,
  message,
} from "antd";
import { UserOutlined, LogoutOutlined, PlusOutlined } from "@ant-design/icons";
import { useAuthStore } from "../store/authStore";
import { useCategoryStore } from "../store/categoryStore";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, logout } = useAuthStore();
  const {
    categories,
    getCategories,
    createCategory,
    isLoading: categoriesLoading,
  } = useCategoryStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      message.warning("Введите название категории");
      return;
    }

    setLoading(true);
    try {
      await createCategory(newCategory);
      setNewCategory("");
      message.success("Категория добавлена");
    } catch (e) {
      message.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Text type="secondary">Загрузка профиля...</Text>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <Avatar size={80} icon={<UserOutlined />} />
          <div>
            <Title level={4} style={{ margin: 0 }}>
              {user.name}
            </Title>
            <Text type="secondary">{user.email}</Text>
          </div>
        </div>

        <Text>
          <b>Роль:</b> {user.role || "user"}
        </Text>

        <div style={{ marginTop: 24 }}>
          <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </Card>

      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={4} style={{ margin: 0 }}>
              Мои категории
            </Title>
            <Text type="secondary">Всего: {categories?.length || 0}</Text>
          </div>
        }
      >
        <Form onFinish={handleAddCategory} style={{ marginBottom: 24 }}>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="Название новой категории"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              disabled={loading || categoriesLoading}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              htmlType="submit"
              loading={loading}
            >
              Добавить
            </Button>
          </Space.Compact>
        </Form>

        {categoriesLoading ? (
          <Text type="secondary">Загрузка категорий...</Text>
        ) : categories?.length ? (
          <List
            dataSource={categories}
            renderItem={(category, index) => (
              <List.Item>
                <List.Item.Meta
                  title={`${index + 1}. ${category.title || category.name}`}
                  description={`ID: ${category.id}`}
                />
              </List.Item>
            )}
          />
        ) : (
          <Text type="secondary">Категорий пока нет</Text>
        )}
      </Card>
    </div>
  );
};

export default Profile;
