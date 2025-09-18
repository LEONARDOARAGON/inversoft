import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserDetailsModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleLabel = (role) => {
    const roleLabels = {
      admin: 'Administrador',
      manager: 'Gerente',
      sales: 'Vendedor',
      warehouse: 'Almacén'
    };
    return roleLabels?.[role] || role;
  };

  const getPermissions = (role) => {
    const permissions = {
      admin: [
        'Gestión completa de usuarios',
        'Configuración del sistema',
        'Acceso a todos los módulos',
        'Generación de reportes avanzados'
      ],
      manager: [
        'Gestión de productos',
        'Gestión de proveedores',
        'Procesamiento de ventas',
        'Reportes de gestión'
      ],
      sales: [
        'Procesamiento de ventas',
        'Consulta de productos',
        'Gestión de clientes',
        'Reportes de ventas'
      ],
      warehouse: [
        'Gestión de inventario',
        'Recepción de productos',
        'Control de stock',
        'Reportes de almacén'
      ]
    };
    return permissions?.[role] || [];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            Detalles del Usuario
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="User" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-text-primary">{user?.name}</h3>
              <p className="text-text-secondary">{user?.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {getRoleLabel(user?.role)}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user?.status === 'active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                  {user?.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text-secondary">Departamento</label>
              <p className="text-text-primary">{user?.department}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Teléfono</label>
              <p className="text-text-primary">{user?.phone || 'No especificado'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Fecha de Registro</label>
              <p className="text-text-primary">{formatDate(user?.createdAt)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Último Acceso</label>
              <p className="text-text-primary">{formatDate(user?.lastLogin)}</p>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h4 className="text-lg font-medium text-text-primary mb-3">Permisos del Rol</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {getPermissions(user?.role)?.map((permission, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} color="var(--color-success)" />
                  <span className="text-sm text-text-secondary">{permission}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity History */}
          <div>
            <h4 className="text-lg font-medium text-text-primary mb-3">Actividad Reciente</h4>
            <div className="space-y-3">
              {user?.activityHistory?.slice(0, 5)?.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name="Clock" size={16} color="var(--color-text-secondary)" className="mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-text-primary">{activity?.action}</p>
                    <p className="text-xs text-text-secondary">{formatDate(activity?.timestamp)}</p>
                  </div>
                </div>
              )) || (
                <p className="text-sm text-text-secondary">No hay actividad reciente registrada</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="default">
            Editar Usuario
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;