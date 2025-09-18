import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SaleSummaryPanel = ({ 
  items, 
  paymentMethod, 
  onPaymentMethodChange, 
  onProcessSale, 
  isProcessing = false,
  className = "" 
}) => {
  const TAX_RATE = 0.21; // 21% IVA

  const paymentMethods = [
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'tarjeta', label: 'Tarjeta de Crédito/Débito' },
    { value: 'transferencia', label: 'Transferencia Bancaria' },
    { value: 'bizum', label: 'Bizum' },
    { value: 'paypal', label: 'PayPal' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    })?.format(price);
  };

  const calculateSubtotal = () => {
    return items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * TAX_RATE;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const getTotalItems = () => {
    return items?.reduce((sum, item) => sum + item?.quantity, 0);
  };

  const getPaymentMethodIcon = (method) => {
    const icons = {
      efectivo: 'Banknote',
      tarjeta: 'CreditCard',
      transferencia: 'Building2',
      bizum: 'Smartphone',
      paypal: 'Globe'
    };
    return icons?.[method] || 'CreditCard';
  };

  const isValidSale = () => {
    return items?.length > 0 && paymentMethod && !isProcessing;
  };

  return (
    <div className={`bg-surface border border-border rounded-lg ${className}`}>
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">
          Resumen de la Venta
        </h3>
      </div>
      <div className="p-6 space-y-6">
        {/* Items Summary */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Productos</span>
            <span className="font-medium text-text-primary">
              {items?.length} artículo{items?.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Cantidad total</span>
            <span className="font-medium text-text-primary">
              {getTotalItems()} unidad{getTotalItems() !== 1 ? 'es' : ''}
            </span>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Subtotal</span>
              <span className="font-medium text-text-primary">
                {formatPrice(calculateSubtotal())}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">IVA (21%)</span>
              <span className="font-medium text-text-primary">
                {formatPrice(calculateTax())}
              </span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-text-primary">Total</span>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(calculateTotal())}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="border-t border-border pt-6">
          <Select
            label="Método de Pago"
            placeholder="Seleccionar método de pago"
            options={paymentMethods}
            value={paymentMethod}
            onChange={onPaymentMethodChange}
            required
            className="mb-4"
          />

          {paymentMethod && (
            <div className="bg-primary/10 border border-primary/20 rounded-md p-3">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getPaymentMethodIcon(paymentMethod)} 
                  size={16} 
                  color="var(--color-primary)" 
                />
                <span className="text-sm font-medium text-primary">
                  {paymentMethods?.find(method => method?.value === paymentMethod)?.label}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Process Sale Button */}
        <div className="border-t border-border pt-6">
          <Button
            variant="default"
            size="lg"
            onClick={onProcessSale}
            disabled={!isValidSale()}
            loading={isProcessing}
            iconName="ShoppingCart"
            iconPosition="left"
            fullWidth
          >
            {isProcessing ? 'Procesando Venta...' : 'Procesar Venta'}
          </Button>

          {!isValidSale() && !isProcessing && (
            <div className="mt-3 text-center">
              <p className="text-sm text-text-secondary">
                {items?.length === 0 && 'Agrega productos a la venta'}
                {items?.length > 0 && !paymentMethod && 'Selecciona un método de pago'}
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {items?.length > 0 && (
          <div className="border-t border-border pt-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="FileText"
                iconPosition="left"
              >
                Vista Previa
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Save"
                iconPosition="left"
              >
                Guardar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaleSummaryPanel;