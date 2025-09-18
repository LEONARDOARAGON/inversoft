import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SaleSuccessModal = ({ 
  isOpen, 
  saleData, 
  onClose, 
  onPrintInvoice, 
  onNewSale,
  className = "" 
}) => {
  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(price);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={handleBackdropClick}
    >
      <div className={`bg-surface border border-border rounded-lg shadow-modal max-w-md w-full max-h-[90vh] overflow-y-auto ${className}`}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={24} color="var(--color-success)" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  ¡Venta Procesada!
                </h2>
                <p className="text-sm text-text-secondary">
                  La transacción se completó exitosamente
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="xs"
              onClick={onClose}
              iconName="X"
              className="text-text-secondary hover:text-text-primary"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6">
          {/* Sale Details */}
          <div className="space-y-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">
                  {formatPrice(saleData?.total || 0)}
                </div>
                <div className="text-sm text-text-secondary">
                  Venta #{saleData?.saleNumber || 'N/A'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Fecha:</span>
                <div className="font-medium text-text-primary">
                  {formatDate(saleData?.date || new Date())}
                </div>
              </div>
              <div>
                <span className="text-text-secondary">Método de pago:</span>
                <div className="font-medium text-text-primary capitalize">
                  {saleData?.paymentMethod || 'N/A'}
                </div>
              </div>
              <div>
                <span className="text-text-secondary">Cliente:</span>
                <div className="font-medium text-text-primary">
                  {saleData?.customer?.name || 'Cliente general'}
                </div>
              </div>
              <div>
                <span className="text-text-secondary">Productos:</span>
                <div className="font-medium text-text-primary">
                  {saleData?.items?.length || 0} artículos
                </div>
              </div>
            </div>
          </div>

          {/* Items Summary */}
          {saleData?.items && saleData?.items?.length > 0 && (
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-medium text-text-primary mb-3">
                Productos vendidos:
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {saleData?.items?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-text-primary truncate">
                        {item?.name}
                      </div>
                      <div className="text-text-secondary">
                        {item?.quantity} × {formatPrice(item?.price)}
                      </div>
                    </div>
                    <div className="font-medium text-text-primary ml-2">
                      {formatPrice(item?.price * item?.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={onPrintInvoice}
                iconName="Printer"
                iconPosition="left"
                fullWidth
              >
                Imprimir
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // Simulate email functionality
                  console.log('Enviando factura por email...');
                }}
                iconName="Mail"
                iconPosition="left"
                fullWidth
              >
                Enviar Email
              </Button>
            </div>
            
            <Button
              variant="default"
              onClick={onNewSale}
              iconName="Plus"
              iconPosition="left"
              fullWidth
            >
              Nueva Venta
            </Button>
          </div>

          {/* Additional Info */}
          <div className="border-t border-border pt-4">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
                <div className="text-sm text-text-secondary">
                  <p>El inventario se ha actualizado automáticamente.</p>
                  <p>La factura se ha guardado en el sistema.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleSuccessModal;