import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserTableRow = ({ user, onEdit, onResetPassword, onToggleStatus, onViewDetails }) => {
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

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-success' : 'text-error';
  };

  const getStatusLabel = (status) => {
    return status === 'active' ? 'Activo' : 'Inactivo';
  };

  return (
    <tr className="hover:bg-muted/50 transition-smooth">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Icon name="User" size={18} color="var(--color-primary)" />
          </div>
          <div>
            <div className="text-sm font-medium text-text-primary">{user?.name}</div>
            <div className="text-sm text-text-secondary">{user?.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {getRoleLabel(user?.role)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
        {user?.department}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
        {formatDate(user?.lastLogin)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
          <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user?.status === 'active' ? 'bg-success' : 'bg-error'}`}></div>
          {getStatusLabel(user?.status)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewDetails(user)}
            className="h-8 w-8"
          >
            <Icon name="Eye" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(user)}
            className="h-8 w-8"
          >
            <Icon name="Edit" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onResetPassword(user)}
            className="h-8 w-8"
          >
            <Icon name="Key" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleStatus(user)}
            className="h-8 w-8"
          >
            <Icon name={user?.status === 'active' ? 'UserX' : 'UserCheck'} size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;