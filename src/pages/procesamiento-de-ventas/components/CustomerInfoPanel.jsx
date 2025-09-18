import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const CustomerInfoPanel = ({ customer, onCustomerChange, onCustomerSelect, className = "" }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const mockCustomers = [
    {
      id: 1,
      name: 'María González Pérez',
      email: 'maria.gonzalez@email.com',
      phone: '+57 612 345 678',
      nif: '12345678A',
      address: 'Calle Mayor 123, 28001 Madrid',
      company: 'Consultora MG S.L.'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez López',
      email: 'carlos.rodriguez@empresa.com',
      phone: '+57 687 654 321',
      nif: '87654321B',
      address: 'Avenida de la Paz 45, 08002 Barcelona',
      company: 'Tecnología CR'
    },
    {
      id: 3,
      name: 'Ana Martín Sánchez',
      email: 'ana.martin@gmail.com',
      phone: '+57 654 987 123',
      nif: '45678912C',
      address: 'Plaza España 12, 41001 Sevilla',
      company: null
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery?.length > 0) {
      const timer = setTimeout(() => {
        const filteredResults = mockCustomers?.filter(customer => 
          customer?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          customer?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          customer?.phone?.includes(searchQuery) ||
          customer?.nif?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        );
        setSearchResults(filteredResults);
        setShowResults(true);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleInputChange = (field, value) => {
    if (onCustomerChange) {
      onCustomerChange({
        ...customer,
        [field]: value
      });
    }
  };

  const handleCustomerSelect = (selectedCustomer) => {
    if (onCustomerSelect) {
      onCustomerSelect(selectedCustomer);
    }
    setSearchQuery('');
    setShowResults(false);
    setIsSearching(false);
  };

  const handleNewCustomer = () => {
    if (onCustomerSelect) {
      onCustomerSelect({
        id: null,
        name: '',
        email: '',
        phone: '',
        nif: '',
        address: '',
        company: ''
      });
    }
    setIsSearching(false);
  };

  const toggleSearchMode = () => {
    setIsSearching(!isSearching);
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className={`bg-surface border border-border rounded-lg ${className}`}>
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">
            Información del Cliente
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSearchMode}
            iconName={isSearching ? "UserPlus" : "Search"}
            iconPosition="left"
          >
            {isSearching ? 'Nuevo Cliente' : 'Buscar Cliente'}
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {isSearching ? (
          <div className="relative" ref={searchRef}>
            <Input
              type="search"
              placeholder="Buscar cliente por nombre, email, teléfono o NIF..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Icon name="Search" size={16} color="var(--color-text-secondary)" />
            </div>

            {showResults && searchResults?.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-modal z-50 max-h-64 overflow-y-auto">
                {searchResults?.map((result) => (
                  <button
                    key={result?.id}
                    onClick={() => handleCustomerSelect(result)}
                    className="w-full flex items-start space-x-3 px-4 py-3 text-left hover:bg-muted transition-smooth"
                  >
                    <Icon name="User" size={16} color="var(--color-primary)" className="mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-text-primary">
                        {result?.name}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {result?.email} • {result?.phone}
                      </div>
                      {result?.company && (
                        <div className="text-xs text-text-secondary">
                          {result?.company}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
                <div className="border-t border-border p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNewCustomer}
                    iconName="UserPlus"
                    iconPosition="left"
                    fullWidth
                  >
                    Crear nuevo cliente
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre Completo"
              type="text"
              placeholder="Nombre del cliente"
              value={customer?.name || ''}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              required
            />
            
            <Input
              label="Email"
              type="email"
              placeholder="email@ejemplo.com"
              value={customer?.email || ''}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
            />
            
            <Input
              label="Teléfono"
              type="tel"
              placeholder="+57 300 000 000"
              value={customer?.phone || ''}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
            />
            
            <Input
              label="NIF/CIF"
              type="text"
              placeholder="12345678A"
              value={customer?.nif || ''}
              onChange={(e) => handleInputChange('nif', e?.target?.value)}
            />
            
            <div className="md:col-span-2">
              <Input
                label="Dirección"
                type="text"
                placeholder="Dirección completa"
                value={customer?.address || ''}
                onChange={(e) => handleInputChange('address', e?.target?.value)}
              />
            </div>
            
            <div className="md:col-span-2">
              <Input
                label="Empresa (Opcional)"
                type="text"
                placeholder="Nombre de la empresa"
                value={customer?.company || ''}
                onChange={(e) => handleInputChange('company', e?.target?.value)}
              />
            </div>
          </div>
        )}

        {customer?.id && !isSearching && (
          <div className="bg-success/10 border border-success/20 rounded-md p-3">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-success">
                Cliente existente seleccionado
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInfoPanel;