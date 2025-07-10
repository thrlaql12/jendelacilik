import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../layouts/AdminLayout';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Kalau belum login atau bukan admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminRoute;
