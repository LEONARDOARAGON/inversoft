import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StockValidationAlert = ({ 
  type = 'warning', 
  message, 
  productName, 
  availableStock, 
  requestedQuantity,
  onAdjustQuantity,
  onDismiss,
  className = "" 
}) => {
  const getAlertConfig = () => {
    switch (type) {
      case 'error':
        return {
          icon: 'XCircle',
          bgColor: 'bg-destructive/10',
          borderColor: 'border-destructive/20',
          textColor: 'text-destructive',
          iconColor: 'var(--color-destructive)'
        };
      case 'warning':
        return {
          icon: 'AlertTriangle',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          textColor: 'text-warning',
          iconColor: 'var(--color-warning)'
        };
      case 'info':
        return {
          icon: 'Info',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20',
          textColor: 'text-primary',
          iconColor: 'var(--color-primary)'
        };
      default:
        return {
          icon: 'AlertTriangle',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          textColor: 'text-warning',
          iconColor: 'var(--color-warning)'
        };
    }
  };

  const config = getAlertConfig();

  const handleAdjustToMax = () => {
    if (onAdjustQuantity && availableStock > 0) {
      onAdjustQuantity(availableStock);
    }
  };

  return (
    <div className={`${config?.bgColor} ${config?.borderColor} border rounded-lg p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Icon name={config?.icon} size={20} color={config?.iconColor} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className={`text-sm font-medium ${config?.textColor}`}>
              {type === 'error' ? 'Stock Insuficiente' : 
               type === 'warning'? 'Advertencia de Stock' : 'Información de Stock'}
            </h4>
            
            {onDismiss && (
              <Button
                variant="ghost"
                size="xs"
                onClick={onDismiss}
                iconName="X"
                className="text-text-secondary hover:text-text-primary"
              />
            )}
          </div>
          
          <div className="mt-2 space-y-2">
            <p className="text-sm text-text-primary">
              {message || `El producto "${productName}" no tiene suficiente stock disponible.`}
            </p>
            
            {availableStock !== undefined && requestedQuantity !== undefined && (
              <div className="text-sm text-text-secondary">
                <div className="flex items-center justify-between">
                  <span>Stock disponible:</span>
                  <span className="font-medium">{availableStock} unidades</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cantidad solicitada:</span>
                  <span className="font-medium">{requestedQuantity} unidades</span>
                </div>
              </div>
            )}
          </div>
          
          {onAdjustQuantity && availableStock > 0 && (
            <div className="mt-3 flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAdjustToMax}
                iconName="Package"
                iconPosition="left"
              >
                Ajustar a {availableStock} unidades
              </Button>
            </div>
          )}
          
          {availableStock === 0 && (
            <div className="mt-3">
              <div className="flex items-center space-x-2 text-destructive">
                <Icon name="AlertCircle" size={14} color="var(--color-destructive)" />
                <span className="text-sm font-medium">
                  Producto agotado
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockValidationAlert;