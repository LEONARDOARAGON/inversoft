import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Agregar Producto',
      description: 'Registrar nuevo producto en el inventario',
      icon: 'Plus',
      variant: 'default',
      action: () => navigate('/gesti-n-de-productos')
    },
    {
      title: 'Nueva Venta',
      description: 'Procesar una nueva transacción de venta',
      icon: 'ShoppingCart',
      variant: 'success',
      action: () => navigate('/procesamiento-de-ventas')
    },
    {
      title: 'Crear Pedido',
      description: 'Generar pedido a proveedor',
      icon: 'FileText',
      variant: 'outline',
      action: () => navigate('/gesti-n-de-proveedores')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Acciones Rápidas
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickActions?.map((action, index) => (
          <div key={index} className="text-center">
            <Button
              variant={action?.variant}
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.action}
              fullWidth
              className="mb-2"
            >
              {action?.title}
            </Button>
            <p className="text-xs text-text-secondary">
              {action?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;