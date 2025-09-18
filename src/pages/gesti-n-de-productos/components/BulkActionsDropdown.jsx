import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsDropdown = ({ selectedCount, onBulkAction, disabled = false }) => {
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
      id: 'update-prices',
      label: 'Actualizar Precios',
      icon: 'DollarSign',
      description: 'Aplicar cambio de precio en lote'
    },
    {
      id: 'change-category',
      label: 'Cambiar Categoría',
      icon: 'Tag',
      description: 'Mover productos a otra categoría'
    },
    {
      id: 'update-supplier',
      label: 'Cambiar Proveedor',
      icon: 'Truck',
      description: 'Asignar nuevo proveedor'
    },
    {
      id: 'adjust-stock',
      label: 'Ajustar Stock',
      icon: 'Package',
      description: 'Modificar niveles de inventario'
    },
    {
      id: 'export-selected',
      label: 'Exportar Seleccionados',
      icon: 'Download',
      description: 'Descargar datos en Excel'
    },
    {
      id: 'deactivate',
      label: 'Desactivar Productos',
      icon: 'EyeOff',
      description: 'Cambiar estado a inactivo',
      variant: 'warning'
    },
    {
      id: 'delete-selected',
      label: 'Eliminar Seleccionados',
      icon: 'Trash2',
      description: 'Eliminar productos permanentemente',
      variant: 'destructive'
    }
  ];

  const handleActionClick = (actionId) => {
    onBulkAction(actionId);
    setIsOpen(false);
  };

  if (selectedCount === 0) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        iconName="ChevronDown"
        iconPosition="right"
      >
        Acciones en Lote ({selectedCount})
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-popover border border-border rounded-md shadow-modal z-50 animate-fade-in">
          <div className="p-3 border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">
              Acciones para {selectedCount} producto{selectedCount !== 1 ? 's' : ''}
            </h3>
          </div>
          
          <div className="py-2 max-h-80 overflow-y-auto">
            {bulkActions?.map((action) => (
              <button
                key={action?.id}
                onClick={() => handleActionClick(action?.id)}
                className={`w-full flex items-start space-x-3 px-3 py-3 text-left transition-smooth hover:bg-muted ${
                  action?.variant === 'destructive' ?'hover:bg-destructive/10' 
                    : action?.variant === 'warning' ?'hover:bg-warning/10' :''
                }`}
              >
                <Icon 
                  name={action?.icon} 
                  size={16} 
                  color={
                    action?.variant === 'destructive' ?'var(--color-destructive)' 
                      : action?.variant === 'warning' ?'var(--color-warning)' :'var(--color-text-secondary)'
                  }
                  className="mt-0.5 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${
                    action?.variant === 'destructive' ?'text-destructive' 
                      : action?.variant === 'warning' ?'text-warning' :'text-text-primary'
                  }`}>
                    {action?.label}
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    {action?.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActionsDropdown;