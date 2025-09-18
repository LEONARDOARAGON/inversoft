import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'sale',
      title: 'Nueva venta registrada',
      description: 'Pedido #VT-2025-001 por COP $1.250.000',
      time: '5 min',
      icon: 'ShoppingCart',
      color: 'var(--color-success)'
    },
    {
      id: 2,
      type: 'stock',
      title: 'Stock actualizado',
      description: 'Laptop Dell XPS 13 - Cantidad: 15 unidades',
      time: '12 min',
      icon: 'Package',
      color: 'var(--color-primary)'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Alerta de stock bajo',
      description: 'Mouse Logitech MX - Solo 3 unidades restantes',
      time: '25 min',
      icon: 'AlertTriangle',
      color: 'var(--color-warning)'
    },
    {
      id: 4,
      type: 'supplier',
      title: 'Nuevo proveedor registrado',
      description: 'TechCorp Solutions - Tecnología',
      time: '1 h',
      icon: 'Truck',
      color: 'var(--color-accent)'
    },
    {
      id: 5,
      type: 'user',
      title: 'Usuario conectado',
      description: 'María González - Gerente de Ventas',
      time: '2 h',
      icon: 'User',
      color: 'var(--color-secondary)'
    },
    {
      id: 6,
      type: 'order',
      title: 'Pedido a proveedor',
      description: 'Orden #PO-2025-012 enviada a Office Supplies Inc',
      time: '3 h',
      icon: 'FileText',
      color: 'var(--color-primary)'
    },
    {
      id: 7,
      type: 'sale',
      title: 'Venta completada',
      description: 'Pedido #VT-2025-000 - $850.000 procesado',
      time: '4 h',
      icon: 'CheckCircle',
      color: 'var(--color-success)'
    },
    {
      id: 8,
      type: 'stock',
      title: 'Recepción de mercancía',
      description: '50 unidades de Teclado Mecánico recibidas',
      time: '5 h',
      icon: 'PackageCheck',
      color: 'var(--color-primary)'
    }
  ];

  const getTimeAgo = (timeStr) => {
    return `hace ${timeStr}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">
            Actividad Reciente
          </h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
            Ver todo
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities?.map((activity, index) => (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Icon name={activity?.icon} size={16} color={activity?.color} />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {activity?.title}
                  </p>
                  <span className="text-xs text-text-secondary ml-2">
                    {getTimeAgo(activity?.time)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                  {activity?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-center text-primary hover:text-primary/80 transition-smooth">
          Cargar más actividades
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;