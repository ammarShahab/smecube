import React from 'react';
import { Helmet } from 'react-helmet-async';
import ModernDashboard from '../../components/admin/Dashboard/ModernDashboard';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Admin Panel</title>
      </Helmet>
      <ModernDashboard />
    </>
  );
};

export default Dashboard;