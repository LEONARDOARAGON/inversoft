import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SupplierFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  onSearch,
  searchQuery,
  onSearchChange 
}) => {
  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'Activo', label: 'Activo' },
    { value: 'Inactivo', label: 'Inactivo' },
    { value: 'Pendiente', label: 'Pendiente' }
  ];

  const paymentTermsOptions = [
    { value: '', label: 'Todos los términos' },
    { value: 'Contado', label: 'Contado' },
    { value: '30 días', label: '30 días' },
    { value: '60 días', label: '60 días' },
    { value: 'Contra entrega', label: 'Contra entrega' }
  ];

  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    { value: 'Tecnología', label: 'Tecnología' },
    { value: 'Oficina', label: 'Oficina' },
    { value: 'Construcción', label: 'Construcción' },
    { value: 'Alimentación', label: 'Alimentación' },
    { value: 'Textil', label: 'Textil' }
  ];

  const locationOptions = [
    { value: '', label: 'Todas las ubicaciones' },
    { value: 'Madrid', label: 'Madrid' },
    { value: 'Barcelona', label: 'Barcelona' },
    { value: 'Valencia', label: 'Valencia' },
    { value: 'Sevilla', label: 'Sevilla' },
    { value: 'Bilbao', label: 'Bilbao' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6 shadow-card">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Filtros de Proveedores</h2>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Limpiar Filtros
          </Button>
        )}
      </div>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Input
            type="search"
            placeholder="Buscar proveedores por nombre, contacto o email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon name="Search" size={16} color="var(--color-text-secondary)" />
          </div>
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
            >
              <Icon name="X" size={12} />
            </Button>
          )}
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Estado"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Seleccionar estado"
        />

        <Select
          label="Términos de Pago"
          options={paymentTermsOptions}
          value={filters?.paymentTerms}
          onChange={(value) => onFilterChange('paymentTerms', value)}
          placeholder="Seleccionar términos"
        />

        <Select
          label="Categoría"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
          placeholder="Seleccionar categoría"
        />

        <Select
          label="Ubicación"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => onFilterChange('location', value)}
          placeholder="Seleccionar ubicación"
        />
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-text-secondary">Filtros activos:</span>
            {Object.entries(filters)?.map(([key, value]) => {
              if (!value) return null;
              
              const filterLabels = {
                status: 'Estado',
                paymentTerms: 'Términos',
                category: 'Categoría',
                location: 'Ubicación'
              };

              return (
                <div
                  key={key}
                  className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                >
                  <span>{filterLabels?.[key]}: {value}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onFilterChange(key, '')}
                    className="h-4 w-4 hover:bg-primary/20"
                  >
                    <Icon name="X" size={10} />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierFilters;