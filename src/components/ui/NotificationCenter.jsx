import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Stock Bajo',
      message: 'El producto "Laptop Dell XPS" tiene solo 3 unidades disponibles',
      time: '5 min',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Venta Completada',
      message: 'Pedido #12345 procesado exitosamente por $1,250.00',
      time: '15 min',
      read: false
    },
    {
      id: 3,
      type: 'error',
      title: 'Error de Sincronización',
      message: 'No se pudo actualizar el inventario del proveedor TechCorp',
      time: '1 h',
      read: true
    },
    {
      id: 4,
      type: 'info',
      title: 'Nuevo Proveedor',
      message: 'Se ha registrado un nuevo proveedor: Electronics Plus',
      time: '2 h',
      read: true
    }
  ]);

  const dropdownRef = useRef(null);
  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    const icons = {
      warning: 'AlertTriangle',
      success: 'CheckCircle',
      error: 'XCircle',
      info: 'Info'
    };
    return icons?.[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colors = {
      warning: 'var(--color-warning)',
      success: 'var(--color-success)',
      error: 'var(--color-error)',
      info: 'var(--color-primary)'
    };
    return colors?.[type] || 'var(--color-text-secondary)';
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev?.filter(notification => notification?.id !== id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-md hover:bg-muted transition-smooth"
      >
        <Icon name="Bell" size={20} color="var(--color-text-secondary)" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-md shadow-modal animate-fade-in">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text-primary">
                Notificaciones
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-primary hover:text-primary/80 transition-smooth"
                >
                  Marcar todas como leídas
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="p-6 text-center">
                <Icon name="Bell" size={32} color="var(--color-text-secondary)" className="mx-auto mb-2" />
                <p className="text-sm text-text-secondary">
                  No hay notificaciones
                </p>
              </div>
            ) : (
              <div className="py-2">
                {notifications?.map((notification) => (
                  <div
                    key={notification?.id}
                    className={`relative px-4 py-3 hover:bg-muted transition-smooth cursor-pointer ${
                      !notification?.read ? 'bg-primary/5' : ''
                    }`}
                    onClick={() => markAsRead(notification?.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <Icon 
                          name={getNotificationIcon(notification?.type)} 
                          size={16} 
                          color={getNotificationColor(notification?.type)}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-text-primary truncate">
                            {notification?.title}
                          </p>
                          <span className="text-xs text-text-secondary ml-2">
                            {notification?.time}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                          {notification?.message}
                        </p>
                        {!notification?.read && (
                          <div className="absolute top-3 right-4 w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e?.stopPropagation();
                          clearNotification(notification?.id);
                        }}
                        className="flex-shrink-0 p-1 rounded-md hover:bg-muted-foreground/10 transition-smooth"
                      >
                        <Icon name="X" size={12} color="var(--color-text-secondary)" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications?.length > 0 && (
            <div className="p-3 border-t border-border">
              <button className="w-full text-sm text-primary hover:text-primary/80 transition-smooth">
                Ver todas las notificaciones
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;