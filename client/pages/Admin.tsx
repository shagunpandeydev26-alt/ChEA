import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminPanel from '../components/panels/AdminPanel';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-chea-dark">
      <Header />
      <AdminPanel />
      <Footer />
    </div>
  );
};

export default Admin;