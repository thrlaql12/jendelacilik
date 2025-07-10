import React from 'react';
import { Button, Form, Input, Select, Typography, message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Register = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    message.success('Registrasi berhasil! Silakan login.');
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#DFF6FF', // Ocean background 🌊
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Card style={{
        width: 380,
        backgroundColor: '#BCE6F1', // Card biru laut 💧
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: 'none'
      }}>
        <Title level={3} style={{ textAlign: 'center', color: '#445566' }}>
          Daftar Akun Baru 🌊
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input placeholder="email kamu" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password placeholder="buat password" />
          </Form.Item>
          <Form.Item name="role" label="Daftar sebagai" rules={[{ required: true }]}>
            <Select placeholder="Pilih role">
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">Pengguna</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{
                background: 'linear-gradient(90deg, #77B6EA, #BCE6F1)', // 🌈 Tombol ocean
                border: 'none',
                width: '100%',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: 8
              }}
            >
              Daftar
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            Sudah punya akun? <a href="/" style={{ color: '#FF9A8B' }}>Login sekarang</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
