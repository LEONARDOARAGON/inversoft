import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickSearchBar from '../../components/ui/QuickSearchBar';
import Button from '../../components/ui/Button';

import SupplierTable from './components/SupplierTable';
import SupplierFilters from './components/SupplierFilters';
import SupplierModal from './components/SupplierModal';
import BulkActions from './components/BulkActions';
import SupplierStats from './components/SupplierStats';

const GestionDeProveedores = () => {
  const [suppliers] = useState([
    {
      id: 1,
      name: 'TechCorp Solutions',
      contactPerson: 'Carlos Martínez',
      position: 'Director Comercial',
      phone: '+57 91 123 4567',
      email: 'carlos.martinez@techcorp.es',
      address: 'Calle Gran Vía, 45',
      city: 'Madrid',
      postalCode: '28013',
      category: 'Tecnología',
      paymentTerms: '30 días',
      status: 'Activo',
      taxId: 'B12345678',
      website: 'https://techcorp.es',
      notes: 'Proveedor principal de equipos informáticos. Excelente servicio postventa.'
    },
    {
      id: 2,
      name: 'Office Supplies Inc',
      contactPerson: 'María González',
      position: 'Gerente de Ventas',
      phone: '+57 93 987 6543',
      email: 'maria.gonzalez@officesupplies.es',
      address: 'Passeig de Gràcia, 123',
      city: 'Barcelona',
      postalCode: '08008',
      category: 'Oficina',
      paymentTerms: 'Contado',
      status: 'Activo',
      taxId: 'B87654321',
      website: 'https://officesupplies.es',
      notes: 'Especialistas en material de oficina. Entregas rápidas y precios competitivos.'
    },
    {
      id: 3,
      name: 'Construcciones Pérez',
      contactPerson: 'Antonio Pérez',
      position: 'Propietario',
      phone: '+57 96 555 1234',
      email: 'antonio@construccionesperez.es',
      address: 'Avenida del Puerto, 78',
      city: 'Valencia',
      postalCode: '46011',
      category: 'Construcción',
      paymentTerms: '60 días',
      status: 'Pendiente',
      taxId: 'B11223344',
      website: '',
      notes: 'Nuevo proveedor en proceso de validación. Especializado en materiales de construcción.'
    },
    {
      id: 4,
      name: 'Alimentaria del Sur',
      contactPerson: 'Carmen Ruiz',
      position: 'Directora Comercial',
      phone: '+57 95 444 5678',
      email: 'carmen.ruiz@alimentariadelsur.es',
      address: 'Calle Sierpes, 56',
      city: 'Sevilla',
      postalCode: '41004',
      category: 'Alimentación',
      paymentTerms: 'Contra entrega',
      status: 'Activo',
      taxId: 'B99887766',
      website: 'https://alimentariadelsur.es',
      notes: 'Proveedor de productos alimentarios frescos. Certificación ecológica.'
    },
    {
      id: 5,
      name: 'Textiles Modernos',
      contactPerson: 'Luis Fernández',
      position: 'Jefe de Ventas',
      phone: '+57 94 333 2222',
      email: 'luis.fernandez@textilesmodernos.es',
      address: 'Gran Vía, 234',
      city: 'Bilbao',
      postalCode: '48001',
      category: 'Textil',
      paymentTerms: '30 días',
      status: 'Inactivo',
      taxId: 'B55443322',
      website: 'https://textilesmodernos.es',
      notes: 'Proveedor de textiles industriales. Temporalmente inactivo por reestructuración.'
    }
  ]);

  const [filters, setFilters] = useState({
    status: '',
    paymentTerms: '',
    category: '',
    location: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock user data
  const currentUser = {
    name: 'Admin Usuario',
    email: 'admin@inversoft.com',
    role: 'admin'
  };

  const filteredSuppliers = useMemo(() => {
    let filtered = suppliers;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(supplier =>
        supplier?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        supplier?.contactPerson?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        supplier?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        supplier?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.status) {
      filtered = filtered?.filter(supplier => supplier?.status === filters?.status);
    }
    if (filters?.paymentTerms) {
      filtered = filtered?.filter(supplier => supplier?.paymentTerms === filters?.paymentTerms);
    }
    if (filters?.category) {
      filtered = filtered?.filter(supplier => supplier?.category === filters?.category);
    }
    if (filters?.location) {
      filtered = filtered?.filter(supplier => supplier?.city === filters?.location);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];
      
      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [suppliers, searchQuery, filters, sortConfig]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      paymentTerms: '',
      category: '',
      location: ''
    });
    setSearchQuery('');
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectSupplier = (supplierId) => {
    if (Array.isArray(supplierId)) {
      setSelectedSuppliers(supplierId);
    } else {
      setSelectedSuppliers(prev => 
        prev?.includes(supplierId)
          ? prev?.filter(id => id !== supplierId)
          : [...prev, supplierId]
      );
    }
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewHistory = (supplier) => {
    setSelectedSupplier(supplier);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleContactSupplier = (supplier) => {
    window.open(`mailto:${supplier?.email}?subject=Consulta desde InverSoft`, '_blank');
  };

  const handleCreateSupplier = () => {
    setSelectedSupplier(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleSaveSupplier = (supplierData) => {
    console.log('Saving supplier:', supplierData);
    setIsModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleBulkAction = (action, supplierIds) => {
    console.log('Bulk action:', action, 'for suppliers:', supplierIds);
    
    switch (action) {
      case 'activate': console.log('Activating suppliers:', supplierIds);
        break;
      case 'deactivate': console.log('Deactivating suppliers:', supplierIds);
        break;
      case 'email':
        const emails = suppliers?.filter(s => supplierIds?.includes(s?.id))?.map(s => s?.email)?.join(',');
        window.open(`mailto:${emails}?subject=Comunicación masiva desde InverSoft`, '_blank');
        break;
      case 'export':
        console.log('Exporting suppliers:', supplierIds);
        break;
      case 'delete':
        console.log('Deleting suppliers:', supplierIds);
        break;
      default:
        break;
    }
    
    setSelectedSuppliers([]);
  };

  const handleQuickSearch = (query, type) => {
    setSearchQuery(query);
  };

  const handleQuickSelect = (item) => {
    if (item?.type === 'supplier') {
      const supplier = suppliers?.find(s => s?.id === item?.id);
      if (supplier) {
        handleViewHistory(supplier);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BreadcrumbNavigation />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Gestión de Proveedores
              </h1>
              <p className="text-text-secondary">
                Administra y supervisa todos los proveedores de tu empresa
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <QuickSearchBar
                placeholder="Buscar proveedores..."
                searchType="suppliers"
                onSearch={handleQuickSearch}
                onSelect={handleQuickSelect}
                className="w-64"
              />
              <Button
                onClick={handleCreateSupplier}
                iconName="Plus"
                iconPosition="left"
              >
                Agregar Proveedor
              </Button>
            </div>
          </div>

          {/* Stats */}
          <SupplierStats suppliers={filteredSuppliers} />

          {/* Filters */}
          <SupplierFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={handleQuickSearch}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedSuppliers={selectedSuppliers}
            onBulkAction={handleBulkAction}
            supplierCount={filteredSuppliers?.length}
          />

          {/* Suppliers Table */}
          <SupplierTable
            suppliers={filteredSuppliers}
            onEdit={handleEditSupplier}
            onViewHistory={handleViewHistory}
            onContact={handleContactSupplier}
            onSelectSupplier={handleSelectSupplier}
            selectedSuppliers={selectedSuppliers}
            sortConfig={sortConfig}
            onSort={handleSort}
          />

          {/* Results Summary */}
          <div className="mt-6 flex items-center justify-between text-sm text-text-secondary">
            <div>
              Mostrando {filteredSuppliers?.length} de {suppliers?.length} proveedores
            </div>
            <div className="flex items-center space-x-4">
              <span>Última actualización: {new Date()?.toLocaleDateString('es-ES')}</span>
            </div>
          </div>
        </div>
      </main>
      {/* Supplier Modal */}
      <SupplierModal
        supplier={selectedSupplier}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSupplier(null);
        }}
        onSave={handleSaveSupplier}
        mode={modalMode}
      />
    </div>
  );
};

export default GestionDeProveedores;