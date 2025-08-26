import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserDashboard from '../components/panels/UserDashboard';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-chea-dark">
      <Header />
      <UserDashboard />
      <Footer />
    </div>
  );
};

export default Dashboard;