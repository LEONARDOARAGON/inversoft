import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedSuppliers, onBulkAction, supplierCount }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const actionOptions = [
    { value: '', label: 'Seleccionar acción...' },
    { value: 'activate', label: 'Activar proveedores' },
    { value: 'deactivate', label: 'Desactivar proveedores' },
    { value: 'email', label: 'Enviar email masivo' },
    { value: 'export', label: 'Exportar datos' },
    { value: 'delete', label: 'Eliminar proveedores' }
  ];

  const handleActionChange = (value) => {
    setSelectedAction(value);
  };

  const handleExecuteAction = () => {
    if (!selectedAction) return;

    if (selectedAction === 'delete') {
      setShowConfirmation(true);
    } else {
      executeAction();
    }
  };

  const executeAction = () => {
    onBulkAction(selectedAction, selectedSuppliers);
    setSelectedAction('');
    setShowConfirmation(false);
  };

  const getActionIcon = (action) => {
    const icons = {
      activate: 'CheckCircle',
      deactivate: 'XCircle',
      email: 'Mail',
      export: 'Download',
      delete: 'Trash2'
    };
    return icons?.[action] || 'Settings';
  };

  const getActionDescription = (action) => {
    const descriptions = {
      activate: 'Cambiar el estado de los proveedores seleccionados a "Activo"',
      deactivate: 'Cambiar el estado de los proveedores seleccionados a "Inactivo"',
      email: 'Enviar un email a todos los proveedores seleccionados',
      export: 'Exportar los datos de los proveedores seleccionados a Excel',
      delete: 'Eliminar permanentemente los proveedores seleccionados'
    };
    return descriptions?.[action] || '';
  };

  if (selectedSuppliers?.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-card rounded-lg border border-border p-4 mb-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckSquare" size={18} color="var(--color-primary)" />
            </div>
            <div>
              <div className="font-medium text-text-primary">
                {selectedSuppliers?.length} proveedor{selectedSuppliers?.length !== 1 ? 'es' : ''} seleccionado{selectedSuppliers?.length !== 1 ? 's' : ''}
              </div>
              <div className="text-sm text-text-secondary">
                de {supplierCount} total{supplierCount !== 1 ? 'es' : ''}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-64">
              <Select
                options={actionOptions}
                value={selectedAction}
                onChange={handleActionChange}
                placeholder="Seleccionar acción..."
              />
            </div>
            <Button
              onClick={handleExecuteAction}
              disabled={!selectedAction}
              iconName={selectedAction ? getActionIcon(selectedAction) : 'Settings'}
              iconPosition="left"
            >
              Ejecutar
            </Button>
          </div>
        </div>

        {selectedAction && (
          <div className="mt-4 p-3 bg-muted/30 rounded-md">
            <div className="flex items-start space-x-2">
              <Icon 
                name="Info" 
                size={16} 
                color="var(--color-primary)" 
                className="mt-0.5 flex-shrink-0"
              />
              <div className="text-sm text-text-secondary">
                {getActionDescription(selectedAction)}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} color="var(--color-error)" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Confirmar Eliminación
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Esta acción no se puede deshacer
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-text-primary">
                  ¿Estás seguro de que deseas eliminar {selectedSuppliers?.length} proveedor{selectedSuppliers?.length !== 1 ? 'es' : ''}?
                </p>
                <p className="text-sm text-text-secondary mt-2">
                  Se eliminarán todos los datos asociados, incluyendo historial de compras y contactos.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={executeAction}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Eliminar Proveedores
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;