import React, { useState } from 'react';
import { Button, Form, Input, Select, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Title } = Typography;

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
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100%',
      backgroundColor: '#749BC2'
    }}>
      {/* KIRI: Gambar ilustrasi */}
      <div style={{
        flex: 1,
        backgroundColor: '#91C8E4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <img
          src="../../images/00035-2442792675.png" // <== GANTI sesuai path gambar kamu
          alt="Login Illustration"
          style={{ width: '80%', maxWidth: 1000 }}
        />
      </div>

      {/* KANAN: Form login */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 0px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#ffffff',
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: 32,
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <img src="/images/00808-3997947721.png" alt="Logo" style={{ height: 50 }} />
          </div>
          <Title level={3} style={{ textAlign: 'center', color: '#005bbb' }}>
            Welcome back!
          </Title>
          <p style={{ textAlign: 'center', marginBottom: 24 }}>Please sign in to continue.</p>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input placeholder="contoh@mail.com" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password placeholder="••••••••" />
            </Form.Item>
            <Form.Item name="role" label="Login sebagai" rules={[{ required: true }]}>
              <Select placeholder="Pilih role">
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="user">Pengguna</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                loading={loading}
                style={{
                  background: 'linear-gradient(90deg, #77B6EA, #BCE6F1)',
                  border: 'none',
                  color: 'white',
                  width: '100%',
                  fontWeight: 'bold',
                  borderRadius: 8,
                }}
              >
                Masuk
              </Button>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              Belum punya akun? <a href="/register" style={{ color: '#FF9A8B' }}>Daftar di sini</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
