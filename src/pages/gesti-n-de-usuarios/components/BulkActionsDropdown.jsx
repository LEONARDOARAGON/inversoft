import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsDropdown = ({ selectedUsers, onBulkAction, onClearSelection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const bulkActions = [
    {
      label: 'Activar Usuarios',
      icon: 'UserCheck',
      action: 'activate',
      variant: 'success'
    },
    {
      label: 'Desactivar Usuarios',
      icon: 'UserX',
      action: 'deactivate',
      variant: 'warning'
    },
    {
      label: 'Cambiar Rol',
      icon: 'Users',
      action: 'changeRole',
      variant: 'default'
    },
    {
      label: 'Exportar Selección',
      icon: 'Download',
      action: 'export',
      variant: 'default'
    },
    {
      label: 'Eliminar Usuarios',
      icon: 'Trash2',
      action: 'delete',
      variant: 'destructive'
    }
  ];

  const handleAction = (action) => {
    onBulkAction(action, selectedUsers);
    setIsOpen(false);
  };

  if (selectedUsers?.length === 0) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center space-x-3">
        <span className="text-sm text-text-secondary">
          {selectedUsers?.length} usuario{selectedUsers?.length !== 1 ? 's' : ''} seleccionado{selectedUsers?.length !== 1 ? 's' : ''}
        </span>
        
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          iconName="ChevronDown"
          iconPosition="right"
        >
          Acciones en Lote
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onClearSelection}
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-modal z-10 animate-fade-in">
          <div className="py-1">
            {bulkActions?.map((action, index) => (
              <button
                key={index}
                onClick={() => handleAction(action?.action)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm transition-smooth ${
                  action?.variant === 'destructive' ?'text-destructive hover:bg-destructive/10'
                    : action?.variant === 'success' ?'text-success hover:bg-success/10'
                    : action?.variant === 'warning' ?'text-warning hover:bg-warning/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon 
                  name={action?.icon} 
                  size={16} 
                  color={
                    action?.variant === 'destructive' ? 'var(--color-destructive)' :
                    action?.variant === 'success' ? 'var(--color-success)' :
                    action?.variant === 'warning' ? 'var(--color-warning)' :
                    'currentColor'
                  }
                />
                <span>{action?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActionsDropdown;