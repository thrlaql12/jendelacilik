import React, { useState } from 'react';
import { Button, Form, Input, Select, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (values.email && values.password && values.role) {
        const userData = {
          email: values.email,
          role: values.role,
          username: values.email.split('@')[0],
        };
        login(userData);
        message.success('Login berhasil!');
        if (values.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/home');
        }
      } else {
        message.error('Login gagal');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        backgroundImage: `url('/images/backlogin.jpg')`, // GANTI dengan gambar sesuai kamu
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: `'Poppins', sans-serif`,
      }}
    >
      <div
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // transparan
    backdropFilter: 'blur(10px)',                // efek blur latar belakang
    WebkitBackdropFilter: 'blur(10px)',          // untuk Safari
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: 400,
    border: '1px solid rgba(255, 255, 255, 0.3)', // garis halus putih transparan
  }}
>
        <Title level={2} style={{ fontWeight: 700, marginBottom: 0, textAlign: 'center' }}>
          SELAMAT DATANG KEMBALI
        </Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 32, textAlign: 'center' }}>
          Silakan masuk untuk melanjutkan.
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Masukkan email Anda' }]}>
            <Input size="large" placeholder="contoh@email.com" />
          </Form.Item>
          <Form.Item name="password" label="Kata Sandi" rules={[{ required: true, message: 'Masukkan kata sandi' }]}>
            <Input.Password size="large" placeholder="********" />
          </Form.Item>
          <Form.Item name="role" label="Masuk sebagai" rules={[{ required: true, message: 'Pilih peran' }]}>
            <Select size="large" placeholder="Pilih peran Anda">
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">Pengguna</Select.Option>
            </Select>
          </Form.Item>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <label>
              <input type="checkbox" style={{ marginRight: 6 }} />
              Ingat saya
            </label>
            <a href="#" style={{ fontSize: 14 }}>Lupa kata sandi</a>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              style={{
                width: '100%',
                backgroundColor: '#f04747',
                border: 'none',
                borderRadius: 8,
              }}
            >
              Masuk
            </Button>
          </Form.Item>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Text type="secondary">Belum punya akun? </Text>
            <a href="/register" style={{ color: '#f04747' }}>Daftar sekarang!</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
