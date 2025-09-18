import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductTable = ({
  products,
  onEdit,
  onDelete,
  onDuplicate,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = React.useMemo(() => {
    if (!sortConfig?.key) return products;

    return [...products]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (typeof aValue === 'string') {
        return sortConfig?.direction === 'asc'
          ? aValue?.localeCompare(bValue)
          : bValue?.localeCompare(aValue);
      }

      if (typeof aValue === 'number') {
        return sortConfig?.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  }, [products, sortConfig]);

  const getStockStatusBadge = (stock, minStock = 10) => {
    if (stock === 0) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error/10 text-error">
          <Icon name="AlertCircle" size={12} className="mr-1" />
          Agotado
        </span>
      );
    } else if (stock <= minStock) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
          <Icon name="AlertTriangle" size={12} className="mr-1" />
          Stock Bajo
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
          <Icon name="CheckCircle" size={12} className="mr-1" />
          Disponible
        </span>
      );
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(price);
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="opacity-50" />;
    }
    return sortConfig?.direction === 'asc' ? (
      <Icon name="ArrowUp" size={14} />
    ) : (
      <Icon name="ArrowDown" size={14} />
    );
  };

  const allSelected =
    products?.length > 0 && selectedProducts?.length === products?.length;
  const someSelected =
    selectedProducts?.length > 0 && selectedProducts?.length < products?.length;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="w-20 px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Imagen
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-muted-foreground/5"
                onClick={() => handleSort('sku')}
              >
                <div className="flex items-center space-x-1">
                  <span>SKU</span>
                  {getSortIcon('sku')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-muted-foreground/5"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Nombre</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-muted-foreground/5"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center space-x-1">
                  <span>Categoría</span>
                  {getSortIcon('category')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-muted-foreground/5"
                onClick={() => handleSort('stock')}
              >
                <div className="flex items-center space-x-1">
                  <span>Stock</span>
                  {getSortIcon('stock')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-muted-foreground/5"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center space-x-1">
                  <span>Precio</span>
                  {getSortIcon('price')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedProducts?.map((product) => (
              <tr
                key={product?.id}
                className="hover:bg-muted/50 transition-smooth"
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts?.includes(product?.id)}
                    onChange={(e) =>
                      onSelectProduct(product?.id, e?.target?.checked)
                    }
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-4 text-sm font-mono text-text-primary">
                  {product?.sku}
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-text-primary">
                    {product?.name}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {product?.supplier}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-text-secondary">
                  {product?.category}
                </td>
                <td className="px-4 py-4 text-sm text-text-primary font-medium">
                  {product?.stock?.toLocaleString('es-ES')}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-text-primary">
                  {formatPrice(product?.price)}
                </td>
                <td className="px-4 py-4">
                  {getStockStatusBadge(product?.stock, product?.minStock)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(product)}
                      iconName="Edit"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDuplicate(product)}
                      iconName="Copy"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(product)}
                      iconName="Trash2"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {sortedProducts?.map((product) => (
          <div key={product?.id} className="p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedProducts?.includes(product?.id)}
                onChange={(e) =>
                  onSelectProduct(product?.id, e?.target?.checked)
                }
                className="mt-1 rounded border-border"
              />
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-text-primary truncate">
                      {product?.name}
                    </h3>
                    <p className="text-xs text-text-secondary mt-1">
                      SKU: {product?.sku}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {product?.category} • {product?.supplier}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(product)}
                      iconName="Edit"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDuplicate(product)}
                      iconName="Copy"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(product)}
                      iconName="Trash2"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-text-primary">
                      {formatPrice(product?.price)}
                    </span>
                    <span className="text-sm text-text-secondary">
                      Stock: {product?.stock?.toLocaleString('es-ES')}
                    </span>
                  </div>
                  {getStockStatusBadge(product?.stock, product?.minStock)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {products?.length === 0 && (
        <div className="p-12 text-center">
          <Icon
            name="Package"
            size={48}
            color="var(--color-text-secondary)"
            className="mx-auto mb-4"
          />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No hay productos
          </h3>
          <p className="text-text-secondary">
            Comienza agregando tu primer producto al inventario
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
