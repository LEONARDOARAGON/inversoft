import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupplierTable = ({ 
  suppliers, 
  onEdit, 
  onViewHistory, 
  onContact, 
  onSelectSupplier,
  selectedSuppliers = [],
  sortConfig,
  onSort 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      'Activo': 'text-success bg-success/10',
      'Inactivo': 'text-error bg-error/10',
      'Pendiente': 'text-warning bg-warning/10'
    };
    return colors?.[status] || 'text-text-secondary bg-muted';
  };

  const getPaymentTermsColor = (terms) => {
    const colors = {
      'Contado': 'text-success',
      '30 días': 'text-primary',
      '60 días': 'text-warning',
      'Contra entrega': 'text-accent'
    };
    return colors?.[terms] || 'text-text-secondary';
  };

  const handleSort = (column) => {
    if (onSort) {
      onSort(column);
    }
  };

  const getSortIcon = (column) => {
    if (!sortConfig || sortConfig?.key !== column) {
      return 'ArrowUpDown';
    }
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectSupplier(suppliers?.map(s => s?.id));
    } else {
      onSelectSupplier([]);
    }
  };

  const isAllSelected = suppliers?.length > 0 && selectedSuppliers?.length === suppliers?.length;
  const isIndeterminate = selectedSuppliers?.length > 0 && selectedSuppliers?.length < suppliers?.length;

  return (
    <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Proveedor</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('contactPerson')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Contacto</span>
                  <Icon name={getSortIcon('contactPerson')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-text-primary">Teléfono</span>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-text-primary">Email</span>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('paymentTerms')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Términos de Pago</span>
                  <Icon name={getSortIcon('paymentTerms')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Estado</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="text-center px-4 py-3 w-32">
                <span className="text-sm font-medium text-text-primary">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {suppliers?.map((supplier) => (
              <tr
                key={supplier?.id}
                className={`border-b border-border hover:bg-muted/30 transition-smooth cursor-pointer ${
                  selectedSuppliers?.includes(supplier?.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(supplier?.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onSelectSupplier(supplier?.id)}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedSuppliers?.includes(supplier?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      if (e?.target?.checked) {
                        onSelectSupplier([...selectedSuppliers, supplier?.id]);
                      } else {
                        onSelectSupplier(selectedSuppliers?.filter(id => id !== supplier?.id));
                      }
                    }}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Building2" size={18} color="var(--color-primary)" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">{supplier?.name}</div>
                      <div className="text-sm text-text-secondary">{supplier?.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-text-primary">{supplier?.contactPerson}</div>
                  <div className="text-xs text-text-secondary">{supplier?.position}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-text-primary">{supplier?.phone}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-text-primary">{supplier?.email}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-medium ${getPaymentTermsColor(supplier?.paymentTerms)}`}>
                    {supplier?.paymentTerms}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier?.status)}`}>
                    {supplier?.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEdit(supplier);
                      }}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onViewHistory(supplier);
                      }}
                      className="h-8 w-8"
                    >
                      <Icon name="History" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onContact(supplier);
                      }}
                      className="h-8 w-8"
                    >
                      <Icon name="Mail" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden">
        {suppliers?.map((supplier) => (
          <div
            key={supplier?.id}
            className={`p-4 border-b border-border last:border-b-0 ${
              selectedSuppliers?.includes(supplier?.id) ? 'bg-primary/5' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 flex-1">
                <input
                  type="checkbox"
                  checked={selectedSuppliers?.includes(supplier?.id)}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      onSelectSupplier([...selectedSuppliers, supplier?.id]);
                    } else {
                      onSelectSupplier(selectedSuppliers?.filter(id => id !== supplier?.id));
                    }
                  }}
                  className="rounded border-border"
                />
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Building2" size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-text-primary truncate">{supplier?.name}</div>
                  <div className="text-sm text-text-secondary">{supplier?.category}</div>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier?.status)}`}>
                {supplier?.status}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={14} color="var(--color-text-secondary)" />
                <span className="text-sm text-text-primary">{supplier?.contactPerson}</span>
                <span className="text-xs text-text-secondary">({supplier?.position})</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} color="var(--color-text-secondary)" />
                <span className="text-sm text-text-primary">{supplier?.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={14} color="var(--color-text-secondary)" />
                <span className="text-sm text-text-primary">{supplier?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CreditCard" size={14} color="var(--color-text-secondary)" />
                <span className={`text-sm font-medium ${getPaymentTermsColor(supplier?.paymentTerms)}`}>
                  {supplier?.paymentTerms}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(supplier)}
                iconName="Edit"
                iconPosition="left"
              >
                Editar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewHistory(supplier)}
                iconName="History"
                iconPosition="left"
              >
                Historial
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onContact(supplier)}
                iconName="Mail"
                iconPosition="left"
              >
                Contactar
              </Button>
            </div>
          </div>
        ))}
      </div>
      {suppliers?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Building2" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No hay proveedores</h3>
          <p className="text-text-secondary">
            No se encontraron proveedores que coincidan con los filtros aplicados.
          </p>
        </div>
      )}
    </div>
  );
};

export default SupplierTable;