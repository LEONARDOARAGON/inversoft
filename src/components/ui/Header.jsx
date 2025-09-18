import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';
import NotificationCenter from './NotificationCenter';

const Header = ({ user = null, onNavigate = null }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-principal',
      icon: 'LayoutDashboard',
      requiredRole: null
    },
    {
      label: 'Productos',
      path: '/gesti-n-de-productos',
      icon: 'Package',
      requiredRole: null
    },
    {
      label: 'Ventas',
      path: '/procesamiento-de-ventas',
      icon: 'ShoppingCart',
      requiredRole: null
    },
    {
      label: 'Proveedores',
      path: '/gesti-n-de-proveedores',
      icon: 'Truck',
      requiredRole: null
    },
    {
      label: 'Usuarios',
      path: '/gesti-n-de-usuarios',
      icon: 'Users',
      requiredRole: 'admin'
    }
  ];

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const filteredNavItems = navigationItems?.filter(item => {
    if (!item?.requiredRole) return true;
    return user?.role === item?.requiredRole;
  });

  const visibleNavItems = filteredNavItems?.slice(0, 4);
  const overflowNavItems = filteredNavItems?.slice(4);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-card">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavigation('/dashboard-principal')}
            className="flex items-center space-x-3 transition-smooth hover:opacity-80"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-text-primary">
              InverSoft
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {visibleNavItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
          
          {overflowNavItems?.length > 0 && (
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted transition-smooth">
                <Icon name="MoreHorizontal" size={16} />
                <span>Más</span>
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-modal">
                {overflowNavItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-sm text-left transition-smooth ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <NotificationCenter />
          <UserProfileDropdown user={user} onNavigate={handleNavigation} />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-smooth"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative bg-surface border-r border-border w-64 h-full shadow-modal animate-slide-in">
            <nav className="p-4 space-y-2">
              {filteredNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;