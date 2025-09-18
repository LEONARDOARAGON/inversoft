import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserMobileCard = ({ user, onEdit, onResetPassword, onToggleStatus, onViewDetails }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
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

  const getStatusLabel = (status) => {
    return status === 'active' ? 'Activo' : 'Inactivo';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="User" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-primary">{user?.name}</h3>
            <p className="text-xs text-text-secondary">{user?.email}</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onViewDetails(user)}
          className="h-8 w-8"
        >
          <Icon name="Eye" size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-text-secondary">Rol:</span>
          <div className="mt-1">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {getRoleLabel(user?.role)}
            </span>
          </div>
        </div>
        
        <div>
          <span className="text-text-secondary">Estado:</span>
          <div className="mt-1">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              user?.status === 'active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                user?.status === 'active' ? 'bg-success' : 'bg-error'
              }`}></div>
              {getStatusLabel(user?.status)}
            </span>
          </div>
        </div>
        
        <div>
          <span className="text-text-secondary">Departamento:</span>
          <p className="text-text-primary mt-1">{user?.department}</p>
        </div>
        
        <div>
          <span className="text-text-secondary">Último acceso:</span>
          <p className="text-text-primary mt-1">{formatDate(user?.lastLogin)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(user)}
            iconName="Edit"
            iconPosition="left"
          >
            Editar
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onResetPassword(user)}
            className="h-8 w-8"
          >
            <Icon name="Key" size={16} />
          </Button>
        </div>
        
        <Button
          variant={user?.status === 'active' ? 'outline' : 'default'}
          size="sm"
          onClick={() => onToggleStatus(user)}
          iconName={user?.status === 'active' ? 'UserX' : 'UserCheck'}
          iconPosition="left"
        >
          {user?.status === 'active' ? 'Desactivar' : 'Activar'}
        </Button>
      </div>
    </div>
  );
};

export default UserMobileCard;