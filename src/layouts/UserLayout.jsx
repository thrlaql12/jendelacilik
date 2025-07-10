// src/layouts/UserLayout.jsx
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Avatar, Button } from 'antd';
import {
  HomeOutlined,
  PlayCircleOutlined,
  BookOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Header, Content, Footer } = Layout;

const UserLayout = ({ children }) => {
const { logout, user } = useAuth();
const navigate = useNavigate();
const location = useLocation();

const [avatarUrl, setAvatarUrl] = useState('/avatar-default.png');

  useEffect(() => {
    if (user?.avatar) {
      setAvatarUrl(user.avatar);
    }
  }, [user]);

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'Beranda', path: '/user/home' },
    { key: 'playlist', icon: <PlayCircleOutlined />, label: 'Video Anak', path: '/user/playlist' },
    { key: 'books', icon: <BookOutlined />, label: 'Buku Cerita', path: '/user/books' },
  ];

  const selectedKey = menuItems.find(item => location.pathname.includes(item.key))?.key || 'home';

  const handleMenuClick = ({ key }) => {
    const selected = menuItems.find(item => item.key === key);
    if (selected) {
      navigate(selected.path);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Header
        style={{
          backgroundColor: 'var(--color-header)',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Menu Kiri */}
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{
            backgroundColor: 'transparent',
            color: 'var(--color-text)',
            fontWeight: 'bold',
            flex: 1,
            borderBottom: 'none',
          }}
          items={menuItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
        />

{/* Icon Profil + Nama User + Logout */}
{/* Icon Profil + Nama User */} 
<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
  <Avatar
    src={avatarUrl}
    icon={!user?.avatar && <UserOutlined />}
    style={{
      cursor: 'pointer',
      border: '2px solid var(--color-text)',
      backgroundColor: '#fff',
    }}
    onClick={() => navigate('/user/profile')}
  />

  {user && user.username && (
    <span
      onClick={() => navigate('/user/profile')}
      style={{
        color: 'var(--color-text)',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      {user.username}
    </span>
  )}

  {/* HAPUS ATAU KOMENTARI BAGIAN INI
  <Button
    type="text"
    icon={<LogoutOutlined />}
    onClick={() => {
      logout();
      navigate('/');
    }}
    style={{
      color: 'var(--color-text)',
      fontWeight: 'bold',
      backgroundColor: 'transparent',
      border: 'none',
    }}
  >
    Keluar
  </Button>
  */}
</div>



      </Header>

      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: 'var(--color-card)',
          borderRadius: '8px',
          minHeight: 'calc(100vh - 128px)',
          color: 'var(--color-text)',
        }}
      >
        {children}
      </Content>

      <Footer
        style={{
          textAlign: 'center',
          backgroundColor: 'var(--color-footer)',
          color: 'var(--color-text)',
        }}
      >
        © 2025 JendelaCilik - Dunia Belajar Anak
      </Footer>
    </Layout>
  );
};

export default UserLayout;