import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SupplierModal = ({ supplier, isOpen, onClose, onSave, mode = 'view' }) => {
  const [formData, setFormData] = useState({
    name: supplier?.name || '',
    contactPerson: supplier?.contactPerson || '',
    position: supplier?.position || '',
    phone: supplier?.phone || '',
    email: supplier?.email || '',
    address: supplier?.address || '',
    city: supplier?.city || '',
    postalCode: supplier?.postalCode || '',
    category: supplier?.category || '',
    paymentTerms: supplier?.paymentTerms || '',
    status: supplier?.status || 'Activo',
    taxId: supplier?.taxId || '',
    website: supplier?.website || '',
    notes: supplier?.notes || ''
  });

  const [activeTab, setActiveTab] = useState('info');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const statusOptions = [
    { value: 'Activo', label: 'Activo' },
    { value: 'Inactivo', label: 'Inactivo' },
    { value: 'Pendiente', label: 'Pendiente' }
  ];

  const paymentTermsOptions = [
    { value: 'Contado', label: 'Contado' },
    { value: '30 días', label: '30 días' },
    { value: '60 días', label: '60 días' },
    { value: 'Contra entrega', label: 'Contra entrega' }
  ];

  const categoryOptions = [
    { value: 'Tecnología', label: 'Tecnología' },
    { value: 'Oficina', label: 'Oficina' },
    { value: 'Construcción', label: 'Construcción' },
    { value: 'Alimentación', label: 'Alimentación' },
    { value: 'Textil', label: 'Textil' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData?.contactPerson?.trim()) newErrors.contactPerson = 'El contacto es requerido';
    if (!formData?.phone?.trim()) newErrors.phone = 'El teléfono es requerido';
    if (!formData?.email?.trim()) newErrors.email = 'El email es requerido';
    if (formData?.email && !/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (mode === 'edit' || mode === 'create') {
      if (validateForm()) {
        onSave(formData);
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Activo': 'text-success bg-success/10',
      'Inactivo': 'text-error bg-error/10',
      'Pendiente': 'text-warning bg-warning/10'
    };
    return colors?.[status] || 'text-text-secondary bg-muted';
  };

  const tabs = [
    { id: 'info', label: 'Información General', icon: 'Info' },
    { id: 'contact', label: 'Contacto', icon: 'Phone' },
    { id: 'history', label: 'Historial', icon: 'History' },
    { id: 'metrics', label: 'Métricas', icon: 'BarChart3' }
  ];

  const mockPurchaseHistory = [
    { id: 1, date: '2024-01-15', amount: '$2,450.000', status: 'Completada', items: 15 },
    { id: 2, date: '2024-01-08', amount: '$1,890.000', status: 'Completada', items: 8 },
    { id: 3, date: '2023-12-22', amount: '$3,200.000', status: 'Completada', items: 22 }
  ];

  const mockMetrics = {
    totalOrders: 24,
    totalAmount: '$18,450.000',
    averageOrderValue: '$768.700',
    onTimeDelivery: '95%',
    qualityRating: 4.7,
    lastOrder: '2024-01-15'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Building2" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                {mode === 'create' ? 'Nuevo Proveedor' : supplier?.name}
              </h2>
              {mode === 'view' && supplier && (
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier?.status)}`}>
                    {supplier?.status}
                  </span>
                  <span className="text-sm text-text-secondary">{supplier?.category}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {mode === 'view' && (
              <Button
                variant="outline"
                onClick={() => window.open(`mailto:${supplier?.email}`, '_blank')}
                iconName="Mail"
                iconPosition="left"
              >
                Contactar
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium transition-smooth ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre del Proveedor"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  disabled={mode === 'view'}
                  required
                />
                <Select
                  label="Categoría"
                  options={categoryOptions}
                  value={formData?.category}
                  onChange={(value) => handleInputChange('category', value)}
                  disabled={mode === 'view'}
                />
                <Input
                  label="NIF/CIF"
                  value={formData?.taxId}
                  onChange={(e) => handleInputChange('taxId', e?.target?.value)}
                  disabled={mode === 'view'}
                />
                <Input
                  label="Sitio Web"
                  type="url"
                  value={formData?.website}
                  onChange={(e) => handleInputChange('website', e?.target?.value)}
                  disabled={mode === 'view'}
                />
                <Select
                  label="Términos de Pago"
                  options={paymentTermsOptions}
                  value={formData?.paymentTerms}
                  onChange={(value) => handleInputChange('paymentTerms', value)}
                  disabled={mode === 'view'}
                />
                <Select
                  label="Estado"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                  disabled={mode === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Notas
                </label>
                <textarea
                  value={formData?.notes}
                  onChange={(e) => handleInputChange('notes', e?.target?.value)}
                  disabled={mode === 'view'}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-muted disabled:cursor-not-allowed"
                  placeholder="Notas adicionales sobre el proveedor..."
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Persona de Contacto"
                  value={formData?.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e?.target?.value)}
                  error={errors?.contactPerson}
                  disabled={mode === 'view'}
                  required
                />
                <Input
                  label="Cargo"
                  value={formData?.position}
                  onChange={(e) => handleInputChange('position', e?.target?.value)}
                  disabled={mode === 'view'}
                />
                <Input
                  label="Teléfono"
                  type="tel"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  error={errors?.phone}
                  disabled={mode === 'view'}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  disabled={mode === 'view'}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Dirección"
                    value={formData?.address}
                    onChange={(e) => handleInputChange('address', e?.target?.value)}
                    disabled={mode === 'view'}
                  />
                </div>
                <Input
                  label="Código Postal"
                  value={formData?.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e?.target?.value)}
                  disabled={mode === 'view'}
                />
              </div>
              <Input
                label="Ciudad"
                value={formData?.city}
                onChange={(e) => handleInputChange('city', e?.target?.value)}
                disabled={mode === 'view'}
              />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Historial de Compras</h3>
              <div className="space-y-3">
                {mockPurchaseHistory?.map((order) => (
                  <div key={order?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <Icon name="ShoppingCart" size={18} color="var(--color-success)" />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">Pedido #{order?.id}</div>
                        <div className="text-sm text-text-secondary">{order?.date} • {order?.items} artículos</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-text-primary">{order?.amount}</div>
                      <div className="text-sm text-success">{order?.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-text-primary">Métricas de Rendimiento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Package" size={18} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-text-secondary">Total Pedidos</span>
                  </div>
                  <div className="text-2xl font-bold text-text-primary">{mockMetrics?.totalOrders}</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Euro" size={18} color="var(--color-success)" />
                    <span className="text-sm font-medium text-text-secondary">Valor Total</span>
                  </div>
                  <div className="text-2xl font-bold text-text-primary">{mockMetrics?.totalAmount}</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="TrendingUp" size={18} color="var(--color-accent)" />
                    <span className="text-sm font-medium text-text-secondary">Promedio por Pedido</span>
                  </div>
                  <div className="text-2xl font-bold text-text-primary">{mockMetrics?.averageOrderValue}</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Clock" size={18} color="var(--color-warning)" />
                    <span className="text-sm font-medium text-text-secondary">Entrega a Tiempo</span>
                  </div>
                  <div className="text-2xl font-bold text-text-primary">{mockMetrics?.onTimeDelivery}</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Star" size={18} color="var(--color-accent)" />
                    <span className="text-sm font-medium text-text-secondary">Calificación</span>
                  </div>
                  <div className="text-2xl font-bold text-text-primary">{mockMetrics?.qualityRating}/5</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Calendar" size={18} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-text-secondary">Último Pedido</span>
                  </div>
                  <div className="text-lg font-bold text-text-primary">{mockMetrics?.lastOrder}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {(mode === 'edit' || mode === 'create') && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} iconName="Save" iconPosition="left">
              {mode === 'create' ? 'Crear Proveedor' : 'Guardar Cambios'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierModal;