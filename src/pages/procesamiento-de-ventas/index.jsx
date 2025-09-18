import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickSearchBar from '../../components/ui/QuickSearchBar';
import ProductSearchBar from './components/ProductSearchBar';
import SaleItemsTable from './components/SaleItemsTable';
import CustomerInfoPanel from './components/CustomerInfoPanel';
import SaleSummaryPanel from './components/SaleSummaryPanel';
import StockValidationAlert from './components/StockValidationAlert';
import SaleSuccessModal from './components/SaleSuccessModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProcesamientoDeVentas = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@inversoft.com',
    role: 'sales',
    avatar: null
  });

  // Sale state
  const [saleItems, setSaleItems] = useState([]);
  const [customer, setCustomer] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    nif: '',
    address: '',
    company: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [stockAlert, setStockAlert] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastSaleData, setLastSaleData] = useState(null);

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Product selection handler
  const handleProductSelect = (product) => {
    const existingItem = saleItems?.find(item => item?.id === product?.id);
    
    if (existingItem) {
      if (existingItem?.quantity >= product?.stock) {
        setStockAlert({
          type: 'warning',
          productName: product?.name,
          availableStock: product?.stock,
          requestedQuantity: existingItem?.quantity + 1,
          message: `No se puede agregar más cantidad. Stock disponible: ${product?.stock} unidades.`
        });
        return;
      }
      
      setSaleItems(prev => 
        prev?.map(item => 
          item?.id === product?.id 
            ? { ...item, quantity: item?.quantity + 1 }
            : item
        )
      );
    } else {
      if (product?.stock === 0) {
        setStockAlert({
          type: 'error',
          productName: product?.name,
          availableStock: 0,
          requestedQuantity: 1,
          message: `El producto "${product?.name}" está agotado.`
        });
        return;
      }
      
      setSaleItems(prev => [...prev, {
        ...product,
        quantity: 1
      }]);
    }
  };

  // Quantity update handler
  const handleUpdateQuantity = (itemId, newQuantity) => {
    const item = saleItems?.find(item => item?.id === itemId);
    if (!item) return;

    if (newQuantity > item?.stock) {
      setStockAlert({
        type: 'warning',
        productName: item?.name,
        availableStock: item?.stock,
        requestedQuantity: newQuantity,
        message: `Cantidad solicitada excede el stock disponible.`
      });
      return;
    }

    setSaleItems(prev => 
      prev?.map(item => 
        item?.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item handler
  const handleRemoveItem = (itemId) => {
    setSaleItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  // Customer handlers
  const handleCustomerChange = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };

  const handleCustomerSelect = (selectedCustomer) => {
    setCustomer(selectedCustomer);
  };

  // Payment method handler
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Process sale handler
  const handleProcessSale = async () => {
    if (saleItems?.length === 0 || !paymentMethod) return;

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const saleData = {
        saleNumber: `VTA-${Date.now()}`,
        date: new Date(),
        items: saleItems,
        customer: customer,
        paymentMethod: paymentMethod,
        subtotal: saleItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0),
        tax: saleItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0) * 0.21,
        total: saleItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0) * 1.21
      };

      setLastSaleData(saleData);
      setShowSuccessModal(true);
      
      // Reset form
      setSaleItems([]);
      setCustomer({
        id: null,
        name: '',
        email: '',
        phone: '',
        nif: '',
        address: '',
        company: ''
      });
      setPaymentMethod('');
      
    } catch (error) {
      console.error('Error processing sale:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Print invoice handler
  const handlePrintInvoice = () => {
    window.print();
  };

  // New sale handler
  const handleNewSale = () => {
    setShowSuccessModal(false);
    setLastSaleData(null);
  };

  // Stock alert handlers
  const handleAdjustQuantity = (newQuantity) => {
    if (stockAlert && stockAlert?.productName) {
      const item = saleItems?.find(item => item?.name === stockAlert?.productName);
      if (item) {
        handleUpdateQuantity(item?.id, newQuantity);
      }
    }
    setStockAlert(null);
  };

  const handleDismissAlert = () => {
    setStockAlert(null);
  };

  // Global search handler
  const handleGlobalSearch = (query, type) => {
    console.log('Global search:', query, type);
  };

  const handleGlobalSelect = (item) => {
    if (item?.type === 'product') {
      handleProductSelect(item);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onNavigate={handleNavigation} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <BreadcrumbNavigation onNavigate={handleNavigation} />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Procesamiento de Ventas
                </h1>
                <p className="text-text-secondary">
                  Crea y procesa transacciones de venta con validación de inventario en tiempo real
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <QuickSearchBar
                  placeholder="Buscar productos para la venta..."
                  searchType="products"
                  onSearch={handleGlobalSearch}
                  onSelect={handleGlobalSelect}
                  className="w-80"
                />
                <Button
                  variant="outline"
                  iconName="History"
                  iconPosition="left"
                  onClick={() => console.log('Ver historial de ventas')}
                >
                  Historial
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="ShoppingCart" size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Productos en venta</div>
                    <div className="text-xl font-semibold text-text-primary">
                      {saleItems?.length}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Package" size={20} color="var(--color-success)" />
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Cantidad total</div>
                    <div className="text-xl font-semibold text-text-primary">
                      {saleItems?.reduce((sum, item) => sum + item?.quantity, 0)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Price" size={20} color="var(--color-accent)" />
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Subtotal</div>
                    <div className="text-xl font-semibold text-text-primary">
                      {new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP'
                      })?.format(saleItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Icon name="User" size={20} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Cliente</div>
                    <div className="text-sm font-medium text-text-primary truncate">
                      {customer?.name || 'Sin seleccionar'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Alert */}
          {stockAlert && (
            <StockValidationAlert
              type={stockAlert?.type}
              message={stockAlert?.message}
              productName={stockAlert?.productName}
              availableStock={stockAlert?.availableStock}
              requestedQuantity={stockAlert?.requestedQuantity}
              onAdjustQuantity={handleAdjustQuantity}
              onDismiss={handleDismissAlert}
              className="mb-6"
            />
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Transaction Building */}
            <div className="xl:col-span-2 space-y-6">
              {/* Product Search */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="Search" size={20} color="var(--color-primary)" />
                  <h2 className="text-lg font-semibold text-text-primary">
                    Buscar Productos
                  </h2>
                </div>
                <ProductSearchBar
                  onProductSelect={handleProductSelect}
                />
              </div>

              {/* Sale Items */}
              <SaleItemsTable
                items={saleItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />

              {/* Customer Information */}
              <CustomerInfoPanel
                customer={customer}
                onCustomerChange={handleCustomerChange}
                onCustomerSelect={handleCustomerSelect}
              />
            </div>

            {/* Right Column - Summary */}
            <div className="space-y-6">
              <SaleSummaryPanel
                items={saleItems}
                paymentMethod={paymentMethod}
                onPaymentMethodChange={handlePaymentMethodChange}
                onProcessSale={handleProcessSale}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Success Modal */}
      <SaleSuccessModal
        isOpen={showSuccessModal}
        saleData={lastSaleData}
        onClose={handleNewSale}
        onPrintInvoice={handlePrintInvoice}
        onNewSale={handleNewSale}
      />
    </div>
  );
};

export default ProcesamientoDeVentas;