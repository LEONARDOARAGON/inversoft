import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import BrandingPanel from './components/BrandingPanel';
import SecurityBadge from './components/SecurityBadge';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/dashboard-principal');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <LoginForm />
          <SecurityBadge />
        </div>
      </div>

      {/* Right Panel - Branding */}
      <BrandingPanel />
    </div>
  );
};

export default LoginPage;