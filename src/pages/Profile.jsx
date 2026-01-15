import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    user,
    logout,
    categories,
    getCategories,
    createCategory,
    isLoading: categoriesLoading,
  } = useAuthStore();

  useState(() => {
    getCategories();
  }, []);

  const handleLogout = () => {
    if (logout) {
      logout();
    }
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

  if (!user) return null;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
      {/* Карточка профиля */}
      <Card style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <Avatar size={80} icon={<UserOutlined />} />
          <div>
            <Title level={4} style={{ margin: 0 }}>
              {user?.name}
            </Title>
            <Text type="secondary">{user?.email}</Text>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Text>
            <b>Роль:</b> {user?.role || "user"}
          </Text>
        </div>

        <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
          Выйти
        </Button>
      </Card>

      {/* Карточка категорий */}
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={4} style={{ margin: 0 }}>
              Мои категории
            </Title>
            <Text type="secondary">Всего: {categories?.length || 0}</Text>
          </div>
        }
      >
        {/* Форма добавления категории */}
        <Form onFinish={handleAddCategory} style={{ marginBottom: 24 }}>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="Название новой категории"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              disabled={loading || categoriesLoading}
              size="large"
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddCategory}
              loading={loading}
              size="large"
            >
              Добавить
            </Button>
          </Space.Compact>
        </Form>

        {/* Список категорий */}
        {categoriesLoading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Text type="secondary">Загрузка категорий...</Text>
          </div>
        ) : categories && categories.length > 0 ? (
          <List
            dataSource={categories}
            renderItem={(category, index) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Text strong>
                      {index + 1}. {category.title || category.name}
                    </Text>
                  }
                  description={
                    <Text type="secondary">
                      ID: {category.id} • Создано:{" "}
                      {new Date(
                        category.createdAt || Date.now()
                      ).toLocaleDateString()}
                    </Text>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Text type="secondary">Категорий пока нет. Добавьте первую!</Text>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;
