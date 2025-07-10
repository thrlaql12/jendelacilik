import React, { useState } from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

const Register = () => {
  const { login } = useAuth(); // Langsung login setelah registrasi
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (values.username && values.password) {
        const userData = {
          username: values.username,
        };
        login(userData);
        message.success('Registrasi berhasil!');
        navigate('/user/home');
      } else {
        message.error('Mohon isi semua field');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        backgroundImage: `url('/images/backlogin.jpg')`,
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
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
          width: '100%',
          maxWidth: 400,
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <Title level={2} style={{ fontWeight: 700, marginBottom: 0, textAlign: 'center' }}>
          DAFTAR AKUN BARU
        </Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 32, textAlign: 'center' }}>
          Silakan isi formulir di bawah ini untuk mendaftar.
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Nama Pengguna"
            rules={[{ required: true, message: 'Masukkan nama pengguna' }]}
          >
            <Input size="large" placeholder="Nama Anda" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Kata Sandi"
            rules={[{ required: true, message: 'Masukkan kata sandi' }]}
          >
            <Input.Password size="large" placeholder="********" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              style={{
                width: '100%',
                backgroundColor: '#1677d4',
                border: 'none',
                borderRadius: 8,
              }}
            >
              Daftar
            </Button>
          </Form.Item>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Text type="secondary">Sudah punya akun? </Text>
            <span
              onClick={() => navigate('/login')}
              style={{
                color: '#1677d4',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Masuk di sini
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
