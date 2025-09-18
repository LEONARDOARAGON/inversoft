import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickSearchBar from '../../components/ui/QuickSearchBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import UserTableRow from './components/UserTableRow';
import UserFilters from './components/UserFilters';
import UserDetailsModal from './components/UserDetailsModal';
import AddUserModal from './components/AddUserModal';
import BulkActionsDropdown from './components/BulkActionsDropdown';
import UserMobileCard from './components/UserMobileCard';

const GestionDeUsuarios = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Modal states
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    department: '',
    status: ''
  });

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@inversoft.com',
      phone: '+57 612 345 678',
      role: 'admin',
      department: 'Administración',
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      lastLogin: '2024-12-16T08:45:00Z',
      activityHistory: [
        { action: 'Inicio de sesión exitoso', timestamp: '2024-12-16T08:45:00Z' },
        { action: 'Creó nuevo producto: Laptop Dell XPS', timestamp: '2024-12-15T14:20:00Z' },
        { action: 'Actualizó configuración del sistema', timestamp: '2024-12-15T11:15:00Z' }
      ]
    },
    {
      id: 2,
      name: 'María González',
      email: 'maria.gonzalez@inversoft.com',
      phone: '+57 623 456 789',
      role: 'manager',
      department: 'Ventas',
      status: 'active',
      createdAt: '2024-02-20T09:15:00Z',
      lastLogin: '2024-12-16T07:30:00Z',
      activityHistory: [
        { action: 'Procesó venta #12345', timestamp: '2024-12-16T07:30:00Z' },
        { action: 'Generó reporte mensual de ventas', timestamp: '2024-12-15T16:45:00Z' }
      ]
    },
    {
      id: 3,
      name: 'Juan Martínez',
      email: 'juan.martinez@inversoft.com',
      phone: '+57 634 567 890',
      role: 'sales',
      department: 'Ventas',
      status: 'active',
      createdAt: '2024-03-10T11:20:00Z',
      lastLogin: '2024-12-15T18:20:00Z',
      activityHistory: [
        { action: 'Registró nuevo cliente', timestamp: '2024-12-15T18:20:00Z' },
        { action: 'Actualizó información de producto', timestamp: '2024-12-15T15:10:00Z' }
      ]
    },
    {
      id: 4,
      name: 'Ana López',
      email: 'ana.lopez@inversoft.com',
      phone: '+57 645 678 901',
      role: 'warehouse',
      department: 'Almacén',
      status: 'active',
      createdAt: '2024-04-05T14:45:00Z',
      lastLogin: '2024-12-16T06:15:00Z',
      activityHistory: [
        { action: 'Actualizó inventario de productos', timestamp: '2024-12-16T06:15:00Z' },
        { action: 'Recibió mercancía del proveedor TechCorp', timestamp: '2024-12-15T13:30:00Z' }
      ]
    },
    {
      id: 5,
      name: 'Pedro Sánchez',
      email: 'pedro.sanchez@inversoft.com',
      phone: '+57 656 789 012',
      role: 'sales',
      department: 'Ventas',
      status: 'inactive',
      createdAt: '2024-05-12T16:30:00Z',
      lastLogin: '2024-12-10T12:45:00Z',
      activityHistory: [
        { action: 'Último inicio de sesión', timestamp: '2024-12-10T12:45:00Z' }
      ]
    },
    {
      id: 6,
      name: 'Laura Fernández',
      email: 'laura.fernandez@inversoft.com',
      phone: '+57 667 890 123',
      role: 'manager',
      department: 'Contabilidad',
      status: 'active',
      createdAt: '2024-06-18T08:00:00Z',
      lastLogin: '2024-12-16T09:30:00Z',
      activityHistory: [
        { action: 'Generó reporte financiero', timestamp: '2024-12-16T09:30:00Z' },
        { action: 'Revisó facturas pendientes', timestamp: '2024-12-15T17:20:00Z' }
      ]
    }
  ];

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = users?.filter(user => {
      const matchesSearch = !filters?.search || 
        user?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        user?.email?.toLowerCase()?.includes(filters?.search?.toLowerCase());
      
      const matchesRole = !filters?.role || user?.role === filters?.role;
      const matchesDepartment = !filters?.department || user?.department === filters?.department;
      const matchesStatus = !filters?.status || user?.status === filters?.status;

      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });

    // Apply sorting
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'lastLogin') {
          aValue = aValue ? new Date(aValue) : new Date(0);
          bValue = bValue ? new Date(bValue) : new Date(0);
        }

        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [users, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      role: '',
      department: '',
      status: ''
    });
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    const currentPageUsers = getCurrentPageUsers()?.map(user => user?.id);
    const allSelected = currentPageUsers?.every(id => selectedUsers?.includes(id));
    
    if (allSelected) {
      setSelectedUsers(prev => prev?.filter(id => !currentPageUsers?.includes(id)));
    } else {
      setSelectedUsers(prev => [...new Set([...prev, ...currentPageUsers])]);
    }
  };

  const handleBulkAction = (action, userIds) => {
    console.log(`Bulk action: ${action} for users:`, userIds);
    
    switch (action) {
      case 'activate':
        setUsers(prev => prev?.map(user => 
          userIds?.includes(user?.id) ? { ...user, status: 'active' } : user
        ));
        break;
      case 'deactivate':
        setUsers(prev => prev?.map(user => 
          userIds?.includes(user?.id) ? { ...user, status: 'inactive' } : user
        ));
        break;
      case 'delete':
        if (window.confirm('¿Está seguro de que desea eliminar los usuarios seleccionados?')) {
          setUsers(prev => prev?.filter(user => !userIds?.includes(user?.id)));
        }
        break;
      case 'export':
        console.log('Exporting users:', userIds);
        break;
      case 'changeRole': console.log('Change role for users:', userIds);
        break;
    }
    
    setSelectedUsers([]);
  };

  const handleUserAction = (action, user) => {
    switch (action) {
      case 'view':
        setSelectedUser(user);
        setShowUserDetails(true);
        break;
      case 'edit': console.log('Edit user:', user);
        break;
      case 'resetPassword':
        if (window.confirm(`¿Desea restablecer la contraseña de ${user?.name}?`)) {
          console.log('Reset password for:', user);
        }
        break;
      case 'toggleStatus':
        setUsers(prev => prev?.map(u => 
          u?.id === user?.id 
            ? { ...u, status: u?.status === 'active' ? 'inactive' : 'active' }
            : u
        ));
        break;
    }
  };

  const handleAddUser = (newUser) => {
    setUsers(prev => [...prev, newUser]);
    console.log('User added:', newUser);
  };

  const getCurrentPageUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers?.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const currentPageUsers = getCurrentPageUsers();
  const currentPageUserIds = currentPageUsers?.map(user => user?.id);
  const allCurrentPageSelected = currentPageUserIds?.length > 0 && 
    currentPageUserIds?.every(id => selectedUsers?.includes(id));

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={{ name: 'Usuario', role: 'admin' }} onNavigate={navigate} />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <Icon name="Loader2" size={32} color="var(--color-primary)" className="animate-spin" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={{ name: 'Usuario', role: 'admin' }} onNavigate={navigate} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNavigation onNavigate={navigate} />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Gestión de Usuarios</h1>
              <p className="text-text-secondary mt-2">
                Administre cuentas de usuario y control de acceso basado en roles
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <QuickSearchBar
                placeholder="Buscar usuarios..."
                searchType="users"
                onSearch={(query) => handleFilterChange('search', query)}
                className="w-64"
              />
              
              <Button
                variant="default"
                onClick={() => setShowAddUser(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Agregar Usuario
              </Button>
            </div>
          </div>

          <UserFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {selectedUsers?.length > 0 && (
            <div className="mb-6">
              <BulkActionsDropdown
                selectedUsers={selectedUsers}
                onBulkAction={handleBulkAction}
                onClearSelection={() => setSelectedUsers([])}
              />
            </div>
          )}

          {isMobile ? (
            <div className="space-y-4">
              {currentPageUsers?.map(user => (
                <UserMobileCard
                  key={user?.id}
                  user={user}
                  onEdit={(user) => handleUserAction('edit', user)}
                  onResetPassword={(user) => handleUserAction('resetPassword', user)}
                  onToggleStatus={(user) => handleUserAction('toggleStatus', user)}
                  onViewDetails={(user) => handleUserAction('view', user)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <Checkbox
                          checked={allCurrentPageSelected}
                          onChange={handleSelectAll}
                          indeterminate={selectedUsers?.some(id => currentPageUserIds?.includes(id)) && !allCurrentPageSelected}
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        <button
                          onClick={() => handleSort('name')}
                          className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
                        >
                          <span>Usuario</span>
                          <Icon name={getSortIcon('name')} size={14} />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        <button
                          onClick={() => handleSort('role')}
                          className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
                        >
                          <span>Rol</span>
                          <Icon name={getSortIcon('role')} size={14} />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        <button
                          onClick={() => handleSort('department')}
                          className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
                        >
                          <span>Departamento</span>
                          <Icon name={getSortIcon('department')} size={14} />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        <button
                          onClick={() => handleSort('lastLogin')}
                          className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
                        >
                          <span>Último Acceso</span>
                          <Icon name={getSortIcon('lastLogin')} size={14} />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        <button
                          onClick={() => handleSort('status')}
                          className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
                        >
                          <span>Estado</span>
                          <Icon name={getSortIcon('status')} size={14} />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-surface divide-y divide-border">
                    {currentPageUsers?.map(user => (
                      <tr key={user?.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Checkbox
                            checked={selectedUsers?.includes(user?.id)}
                            onChange={() => handleSelectUser(user?.id)}
                          />
                        </td>
                        <UserTableRow
                          user={user}
                          onEdit={(user) => handleUserAction('edit', user)}
                          onResetPassword={(user) => handleUserAction('resetPassword', user)}
                          onToggleStatus={(user) => handleUserAction('toggleStatus', user)}
                          onViewDetails={(user) => handleUserAction('view', user)}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Users" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-text-primary mb-2">No se encontraron usuarios</h3>
                  <p className="text-text-secondary">
                    {filters?.search || filters?.role || filters?.department || filters?.status
                      ? 'Intente ajustar los filtros de búsqueda' :'Comience agregando su primer usuario'
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-text-secondary">
                Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredUsers?.length)} de {filteredUsers?.length} usuarios
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Anterior
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-8 h-8"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={showUserDetails}
        onClose={() => {
          setShowUserDetails(false);
          setSelectedUser(null);
        }}
      />
      <AddUserModal
        isOpen={showAddUser}
        onClose={() => setShowAddUser(false)}
        onSave={handleAddUser}
      />
    </div>
  );
};

export default GestionDeUsuarios;