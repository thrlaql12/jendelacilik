import React, { useState } from "react";
import {
  Typography,
  Card,
  Form,
  Input,
  Upload,
  Button,
  Radio,
  message,
  Divider,
} from "antd";
import { UploadOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// Pastikan kamu punya fungsi logout
// Misalnya kalau ada di context atau helper file:
// import { logout } from "../../utils/auth";
const logout = () => {
  // Hapus token / session
  localStorage.removeItem("authToken");
  console.log("Logout!");
  message.success("Anda telah logout.");
};

const { Title, Text } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState("/avatar-default.png");
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();

  const handleAvatarChange = (info) => {
    const file = info.file.originFileObj;

    if (!file) return;

    const isImage = file.type === "image/jpeg" || file.type === "image/png";
    if (!isImage) {
      message.error("Hanya boleh mengupload file JPG atau PNG");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      message.error("Ukuran file maksimal 10MB!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarUrl(e.target.result);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitProfile = (values) => {
    console.log("Data profil pengguna:", values);
    message.success("Profil berhasil diperbarui!");
  };

  const handleSubmitPassword = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Konfirmasi password tidak sama!");
      return;
    }
    console.log("Password diperbarui:", values);
    message.success("Password berhasil diperbarui!");
    passwordForm.resetFields();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ padding: 24, minHeight: "100vh" }}>
      <Title level={2}>👤 Profil Saya</Title>

      <Card>
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            username: "user123",
            email: "user@email.com",
            gender: "Perempuan",
          }}
          onFinish={handleSubmitProfile}
        >
          <Form.Item label="Foto Profil">
            <Upload
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleAvatarChange}
              accept="image/png,image/jpeg"
            >
              <Button icon={<UploadOutlined />}>Upload Foto</Button>
            </Upload>

            {fileName && (
              <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
                File terpilih: {fileName}
              </Text>
            )}

            <img
              src={avatarUrl}
              alt="Preview"
              style={{
                marginTop: 12,
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #ccc",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Masukkan username" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Masukkan email" },
              { type: "email", message: "Format email tidak valid" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Jenis Kelamin" name="gender">
            <Radio.Group>
              <Radio value="Laki-laki">Laki-laki</Radio>
              <Radio value="Perempuan">Perempuan</Radio>
              <Radio value="Lainnya">Lainnya</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Simpan Perubahan
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Divider />

      <Card title="🔒 Ubah Password">
        <Form
          layout="vertical"
          form={passwordForm}
          onFinish={handleSubmitPassword}
        >
          <Form.Item
            label="Password Lama"
            name="currentPassword"
            rules={[{ required: true, message: "Masukkan password lama" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Password Baru"
            name="newPassword"
            rules={[{ required: true, message: "Masukkan password baru" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Konfirmasi Password Baru"
            name="confirmPassword"
            rules={[{ required: true, message: "Konfirmasi password baru" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ubah Password
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Tombol Logout */}
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
