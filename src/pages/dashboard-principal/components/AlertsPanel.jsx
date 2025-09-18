import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'error',
      title: 'Stock Crítico',
      message: '5 productos con stock por debajo del mínimo',
      count: 5,
      action: 'Ver productos',
      actionPath: '/gesti-n-de-productos'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Pedidos Pendientes',
      message: '3 pedidos de proveedores esperando confirmación',
      count: 3,
      action: 'Revisar pedidos',
      actionPath: '/gesti-n-de-proveedores'
    },
    {
      id: 3,
      type: 'info',
      title: 'Ventas del Día',
      message: '12 transacciones procesadas hoy',
      count: 12,
      action: 'Ver ventas',
      actionPath: '/procesamiento-de-ventas'
    }
  ]);

  const getAlertIcon = (type) => {
    const icons = {
      error: 'AlertCircle',
      warning: 'AlertTriangle',
      info: 'Info',
      success: 'CheckCircle'
    };
    return icons?.[type] || 'Bell';
  };

  const getAlertColor = (type) => {
    const colors = {
      error: 'var(--color-error)',
      warning: 'var(--color-warning)',
      info: 'var(--color-primary)',
      success: 'var(--color-success)'
    };
    return colors?.[type] || 'var(--color-text-secondary)';
  };

  const getAlertBgColor = (type) => {
    const bgColors = {
      error: 'bg-error/10',
      warning: 'bg-warning/10',
      info: 'bg-primary/10',
      success: 'bg-success/10'
    };
    return bgColors?.[type] || 'bg-muted';
  };

  const dismissAlert = (id) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== id));
  };

  const handleAction = (actionPath) => {
    // In a real app, this would use navigate
    console.log(`Navigate to: ${actionPath}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Alertas y Notificaciones
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            {alerts?.length} activas
          </span>
          <Icon name="Bell" size={16} color="var(--color-text-secondary)" />
        </div>
      </div>
      <div className="space-y-3">
        {alerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={32} color="var(--color-success)" className="mx-auto mb-2" />
            <p className="text-sm text-text-secondary">
              No hay alertas pendientes
            </p>
          </div>
        ) : (
          alerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`relative p-4 rounded-lg border ${getAlertBgColor(alert?.type)} border-border`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon 
                    name={getAlertIcon(alert?.type)} 
                    size={18} 
                    color={getAlertColor(alert?.type)}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-text-primary">
                      {alert?.title}
                    </h4>
                    <button
                      onClick={() => dismissAlert(alert?.id)}
                      className="p-1 hover:bg-muted-foreground/10 rounded-md transition-smooth"
                    >
                      <Icon name="X" size={14} color="var(--color-text-secondary)" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-3">
                    {alert?.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAlertBgColor(alert?.type)} text-text-primary`}>
                        {alert?.count}
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAction(alert?.actionPath)}
                      className="text-xs"
                    >
                      {alert?.action}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;