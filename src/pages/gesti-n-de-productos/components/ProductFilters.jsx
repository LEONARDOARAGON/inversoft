import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ProductFilters = ({ onFiltersChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    category: '',
    stockStatus: '',
    priceMin: '',
    priceMax: '',
    supplier: ''
  });

  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    { value: 'electronica', label: 'Electrónica' },
    { value: 'informatica', label: 'Informática' },
    { value: 'oficina', label: 'Oficina' },
    { value: 'accesorios', label: 'Accesorios' },
    { value: 'mobiliario', label: 'Mobiliario' }
  ];

  const stockStatusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'disponible', label: 'Disponible' },
    { value: 'stock-bajo', label: 'Stock Bajo' },
    { value: 'agotado', label: 'Agotado' },
    { value: 'descontinuado', label: 'Descontinuado' }
  ];

  const supplierOptions = [
    { value: '', label: 'Todos los proveedores' },
    { value: 'techcorp', label: 'TechCorp Solutions' },
    { value: 'office-supplies', label: 'Office Supplies Inc' },
    { value: 'electronics-plus', label: 'Electronics Plus' },
    { value: 'global-tech', label: 'Global Tech Distribution' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      stockStatus: '',
      priceMin: '',
      priceMax: '',
      supplier: ''
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary flex items-center">
          <Icon name="Filter" size={16} className="mr-2" />
          Filtros
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Limpiar filtros
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Select
          label="Categoría"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => handleFilterChange('category', value)}
          placeholder="Seleccionar categoría"
        />

        <Select
          label="Estado de Stock"
          options={stockStatusOptions}
          value={filters?.stockStatus}
          onChange={(value) => handleFilterChange('stockStatus', value)}
          placeholder="Seleccionar estado"
        />

        <Input
          label="Precio Mínimo (COP)"
          type="number"
          placeholder="0,00"
          value={filters?.priceMin}
          onChange={(e) => handleFilterChange('priceMin', e?.target?.value)}
          min="0"
          step="0.01"
        />

        <Input
          label="Precio Máximo (COP)"
          type="number"
          placeholder="999,99"
          value={filters?.priceMax}
          onChange={(e) => handleFilterChange('priceMax', e?.target?.value)}
          min="0"
          step="0.01"
        />

        <Select
          label="Proveedor"
          options={supplierOptions}
          value={filters?.supplier}
          onChange={(value) => handleFilterChange('supplier', value)}
          placeholder="Seleccionar proveedor"
        />
      </div>
    </div>
  );
};

export default ProductFilters;