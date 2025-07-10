import React from 'react';
import { BookOutlined, VideoCameraOutlined, MessageOutlined } from '@ant-design/icons';
import '../../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard Admin</h1>
        <p>Ringkasan aktivitas & data konten JendelaCilik</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <BookOutlined style={{ fontSize: 32, color: '#77B6EA' }} />
          <h3>25</h3>
          <p>Total Buku Cerita</p>
        </div>
        <div className="stat-card">
          <VideoCameraOutlined style={{ fontSize: 32, color: '#FFC9B9' }} />
          <h3>15</h3>
          <p>Total Video Anak</p>
        </div>
        <div className="stat-card">
          <MessageOutlined style={{ fontSize: 32, color: '#445566' }} />
          <h3>42</h3>
          <p>Komentar Pengguna</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
