import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const UserFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const roleOptions = [
    { value: '', label: 'Todos los roles' },
    { value: 'admin', label: 'Administrador' },
    { value: 'manager', label: 'Gerente' },
    { value: 'sales', label: 'Vendedor' },
    { value: 'warehouse', label: 'Almacén' }
  ];

  const departmentOptions = [
    { value: '', label: 'Todos los departamentos' },
    { value: 'Administración', label: 'Administración' },
    { value: 'Ventas', label: 'Ventas' },
    { value: 'Almacén', label: 'Almacén' },
    { value: 'Contabilidad', label: 'Contabilidad' },
    { value: 'Recursos Humanos', label: 'Recursos Humanos' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' }
  ];

  const hasActiveFilters = filters?.role || filters?.department || filters?.status || filters?.search;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Buscar por nombre o email..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />
        
        <Select
          placeholder="Filtrar por rol"
          options={roleOptions}
          value={filters?.role}
          onChange={(value) => onFilterChange('role', value)}
        />
        
        <Select
          placeholder="Filtrar por departamento"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => onFilterChange('department', value)}
        />
        
        <div className="flex items-center space-x-2">
          <Select
            placeholder="Filtrar por estado"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
            className="flex-1"
          />
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="icon"
              onClick={onClearFilters}
              className="flex-shrink-0"
            >
              <Icon name="X" size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFilters;