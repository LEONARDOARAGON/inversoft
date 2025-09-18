import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const UserProfileDropdown = ({ user = null, onNavigate = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const defaultUser = {
    name: 'Usuario',
    email: 'usuario@inversoft.com',
    role: 'admin',
    avatar: null
  };

  const currentUser = user || defaultUser;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    if (onNavigate) {
      onNavigate('/login');
    } else {
      window.location.href = '/login';
    }
  };

  const menuItems = [
    {
      label: 'Mi Perfil',
      icon: 'User',
      action: () => {
        console.log('Navigate to profile');
        setIsOpen(false);
      }
    },
    {
      label: 'Configuración',
      icon: 'Settings',
      action: () => {
        console.log('Navigate to settings');
        setIsOpen(false);
      }
    },
    {
      label: 'Ayuda',
      icon: 'HelpCircle',
      action: () => {
        console.log('Navigate to help');
        setIsOpen(false);
      }
    },
    {
      label: 'Cerrar Sesión',
      icon: 'LogOut',
      action: handleLogout,
      variant: 'destructive'
    }
  ];

  const getRoleDisplayName = (role) => {
    const roleNames = {
      admin: 'Administrador',
      manager: 'Gerente',
      sales: 'Ventas',
      warehouse: 'Almacén'
    };
    return roleNames?.[role] || 'Usuario';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-smooth"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
          {currentUser?.avatar ? (
            <Image
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} color="var(--color-primary)" />
          )}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-text-primary">
            {currentUser?.name}
          </div>
          <div className="text-xs text-text-secondary">
            {getRoleDisplayName(currentUser?.role)}
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md shadow-modal animate-fade-in">
          <div className="p-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {currentUser?.avatar ? (
                  <Image
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={20} color="var(--color-primary)" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary truncate">
                  {currentUser?.name}
                </div>
                <div className="text-xs text-text-secondary truncate">
                  {currentUser?.email}
                </div>
                <div className="text-xs text-primary font-medium">
                  {getRoleDisplayName(currentUser?.role)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="py-1">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                onClick={item?.action}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm transition-smooth ${
                  item?.variant === 'destructive' ?'text-destructive hover:bg-destructive/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  color={item?.variant === 'destructive' ? 'var(--color-destructive)' : 'currentColor'}
                />
                <span>{item?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;