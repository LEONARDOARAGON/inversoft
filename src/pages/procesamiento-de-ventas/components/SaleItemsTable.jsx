import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SaleItemsTable = ({ items, onUpdateQuantity, onRemoveItem, className = "" }) => {
  const formatPrice = (price) => {
      return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(price);
  };

  const calculateLineTotal = (price, quantity) => {
    return price * quantity;
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    if (onUpdateQuantity) {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  if (items?.length === 0) {
    return (
      <div className={`bg-surface border border-border rounded-lg p-8 text-center ${className}`}>
        <Icon name="ShoppingCart" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">
          No hay productos en la venta
        </h3>
        <p className="text-text-secondary">
          Utiliza el buscador de productos para agregar artículos a la venta
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-surface border border-border rounded-lg overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">
          Productos en la Venta
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                Cantidad
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                Precio Unit.
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items?.map((item) => (
              <tr key={item?.id} className="hover:bg-muted/50 transition-smooth">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Icon name="Package" size={16} color="var(--color-primary)" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">
                        {item?.name}
                      </div>
                      <div className="text-xs text-text-secondary truncate max-w-xs">
                        {item?.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-text-secondary">
                    {item?.sku}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleQuantityChange(item?.id, item?.quantity - 1)}
                      disabled={item?.quantity <= 1}
                      iconName="Minus"
                      className="w-8 h-8 p-0"
                    />
                    <span className="text-sm font-medium text-text-primary min-w-[2rem] text-center">
                      {item?.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleQuantityChange(item?.id, item?.quantity + 1)}
                      disabled={item?.quantity >= item?.stock}
                      iconName="Plus"
                      className="w-8 h-8 p-0"
                    />
                  </div>
                  {item?.quantity >= item?.stock && (
                    <div className="text-xs text-warning text-center mt-1">
                      Stock máximo
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-medium text-text-primary">
                    {formatPrice(item?.price)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-semibold text-primary">
                    {formatPrice(calculateLineTotal(item?.price, item?.quantity))}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onRemoveItem && onRemoveItem(item?.id)}
                    iconName="Trash2"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleItemsTable;