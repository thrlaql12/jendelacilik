// src/pages/admin/Settings.jsx
import React, { useState } from "react";
import {
  Typography,
  Card,
  Input,
  Button,
  Switch,
  Divider,
  Form,
  message,
} from "antd";

const { Title, Text } = Typography;

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [passwordForm] = Form.useForm();

  const handlePasswordChange = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Password baru dan konfirmasi tidak cocok!");
      return;
    }

    // Simulasi update password
    message.success("Password berhasil diperbarui!");
    passwordForm.resetFields();
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>⚙️ Pengaturan Admin</Title>

      {/* Ganti Password */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>🔐 Ganti Password</Title>
        <Form layout="vertical" form={passwordForm} onFinish={handlePasswordChange}>
          <Form.Item
            label="Password Lama"
            name="oldPassword"
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

          <Button type="primary" htmlType="submit">
            Simpan Perubahan
          </Button>
        </Form>
      </Card>

      {/* Notifikasi */}
      <Card>
        <Title level={4}>🔔 Notifikasi</Title>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Text>Aktifkan notifikasi komentar baru</Text>
          <Switch
            checked={notificationsEnabled}
            onChange={(checked) => {
              setNotificationsEnabled(checked);
              message.success(
                `Notifikasi ${checked ? "diaktifkan" : "dinonaktifkan"}`
              );
            }}
          />
        </div>
      </Card>

      <Divider />
      <Text type="secondary">Versi Aplikasi: 1.0.0</Text>
    </div>
  );
};

export default Settings;
