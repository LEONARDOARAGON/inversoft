import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickSearchBar from '../../components/ui/QuickSearchBar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProductFilters from './components/ProductFilters';
import ProductTable from './components/ProductTable';
import ProductModal from './components/ProductModal';
import BulkActionsDropdown from './components/BulkActionsDropdown';
import ProductStats from './components/ProductStats';

const GestionDeProductos = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const currentUser = {
    name: 'Carlos Mendoza',
    email: 'carlos@inversoft.com',
    role: 'admin',
    avatar: null
  };

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      sku: 'LAP001',
      name: 'Laptop Dell XPS 13',
      description: 'Laptop ultrabook con procesador Intel Core i7, 16GB RAM, 512GB SSD',
      category: 'Informática',
      supplier: 'TechCorp Solutions',
      price: 1299.99,
      cost: 899.99,
      stock: 15,
      minStock: 5,
      maxStock: 50,
      location: 'A1-B2-C3',
      barcode: '1234567890123',
      weight: 1.2,
      dimensions: '30x21x1.5 cm',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
      status: 'active'
    },
    {
      id: 2,
      sku: 'MOU001',
      name: 'Mouse Logitech MX Master 3',
      description: 'Mouse inalámbrico ergonómico con precisión avanzada',
      category: 'Accesorios',
      supplier: 'Office Supplies Inc',
      price: 89.99,
      cost: 59.99,
      stock: 45,
      minStock: 10,
      maxStock: 100,
      location: 'B2-C1-D4',
      barcode: '2345678901234',
      weight: 0.14,
      dimensions: '12x8x5 cm',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      status: 'active'
    },
    {
      id: 3,
      sku: 'KEY001',
      name: 'Teclado Mecánico Corsair K95',
      description: 'Teclado mecánico RGB con switches Cherry MX',
      category: 'Accesorios',
      supplier: 'Electronics Plus',
      price: 179.99,
      cost: 119.99,
      stock: 8,
      minStock: 10,
      maxStock: 30,
      location: 'C3-D2-E1',
      barcode: '3456789012345',
      weight: 1.5,
      dimensions: '46x17x4 cm',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
      status: 'active'
    },
    {
      id: 4,
      sku: 'MON001',
      name: 'Monitor Samsung 27" 4K',
      description: 'Monitor 4K UHD de 27 pulgadas con tecnología HDR',
      category: 'Electrónica',
      supplier: 'Global Tech Distribution',
      price: 449.99,
      cost: 299.99,
      stock: 0,
      minStock: 5,
      maxStock: 25,
      location: 'D1-E3-F2',
      barcode: '4567890123456',
      weight: 6.8,
      dimensions: '61x37x20 cm',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
      status: 'active'
    },
    {
      id: 5,
      sku: 'TAB001',
      name: 'Tablet iPad Air',
      description: 'Tablet Apple iPad Air con chip M1 y pantalla Liquid Retina',
      category: 'Electrónica',
      supplier: 'TechCorp Solutions',
      price: 649.99,
      cost: 449.99,
      stock: 22,
      minStock: 8,
      maxStock: 40,
      location: 'E2-F1-G3',
      barcode: '5678901234567',
      weight: 0.46,
      dimensions: '24.8x17.9x0.6 cm',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
      status: 'active'
    },
    {
      id: 6,
      sku: 'IMP001',
      name: 'Impresora HP LaserJet Pro',
      description: 'Impresora láser monocromática con conectividad WiFi',
      category: 'Oficina',
      supplier: 'Office Supplies Inc',
      price: 199.99,
      cost: 139.99,
      stock: 12,
      minStock: 6,
      maxStock: 20,
      location: 'F3-G2-H1',
      barcode: '6789012345678',
      weight: 7.2,
      dimensions: '35x36x18 cm',
      image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400',
      status: 'active'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter products based on search query
    let filtered = products;

    if (searchQuery?.trim()) {
      filtered = products?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.sku?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.supplier?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (filters) => {
    let filtered = products;

    // Apply search query first
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.sku?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.supplier?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (filters?.category) {
      filtered = filtered?.filter(product => 
        product?.category?.toLowerCase() === filters?.category?.toLowerCase()
      );
    }

    // Apply stock status filter
    if (filters?.stockStatus) {
      filtered = filtered?.filter(product => {
        switch (filters?.stockStatus) {
          case 'disponible':
            return product?.stock > (product?.minStock || 10);
          case 'stock-bajo':
            return product?.stock > 0 && product?.stock <= (product?.minStock || 10);
          case 'agotado':
            return product?.stock === 0;
          case 'descontinuado':
            return product?.status === 'discontinued';
          default:
            return true;
        }
      });
    }

    // Apply price range filter
    if (filters?.priceMin) {
      filtered = filtered?.filter(product => product?.price >= parseFloat(filters?.priceMin));
    }
    if (filters?.priceMax) {
      filtered = filtered?.filter(product => product?.price <= parseFloat(filters?.priceMax));
    }

    // Apply supplier filter
    if (filters?.supplier) {
      filtered = filtered?.filter(product => 
        product?.supplier?.toLowerCase()?.includes(filters?.supplier?.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleClearFilters = () => {
    setFilteredProducts(products);
  };

  const handleCreateProduct = () => {
    setModalMode('create');
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDuplicateProduct = (product) => {
    setModalMode('duplicate');
    setSelectedProduct({
      ...product,
      sku: `${product?.sku}_COPY`,
      name: `${product?.name} (Copia)`
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (product) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el producto "${product?.name}"?`)) {
      setProducts(prev => prev?.filter(p => p?.id !== product?.id));
      setSelectedProducts(prev => prev?.filter(id => id !== product?.id));
    }
  };

  const handleSaveProduct = async (productData) => {
    if (modalMode === 'create' || modalMode === 'duplicate') {
      const newProduct = {
        ...productData,
        id: Date.now()
      };
      setProducts(prev => [...prev, newProduct]);
    } else if (modalMode === 'edit') {
      setProducts(prev => prev?.map(p => 
        p?.id === selectedProduct?.id ? { ...productData, id: selectedProduct?.id } : p
      ));
    }
  };

  const handleSelectProduct = (productId, isSelected) => {
    if (isSelected) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev?.filter(id => id !== productId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedProducts(filteredProducts?.map(p => p?.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleBulkAction = (actionId) => {
    console.log(`Executing bulk action: ${actionId} on products:`, selectedProducts);
    
    switch (actionId) {
      case 'export-selected':
        // Mock export functionality
        alert(`Exportando ${selectedProducts?.length} productos...`);
        break;
      case 'delete-selected':
        if (window.confirm(`¿Estás seguro de que deseas eliminar ${selectedProducts?.length} productos?`)) {
          setProducts(prev => prev?.filter(p => !selectedProducts?.includes(p?.id)));
          setSelectedProducts([]);
        }
        break;
      case 'deactivate':
        setProducts(prev => prev?.map(p => 
          selectedProducts?.includes(p?.id) ? { ...p, status: 'inactive' } : p
        ));
        setSelectedProducts([]);
        break;
      default:
        alert(`Acción "${actionId}" no implementada aún`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={currentUser} onNavigate={handleNavigation} />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <Icon name="Loader2" size={32} className="animate-spin text-primary" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} onNavigate={handleNavigation} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BreadcrumbNavigation onNavigate={handleNavigation} />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Gestión de Productos
              </h1>
              <p className="text-text-secondary">
                Administra tu catálogo de productos, inventario y precios
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={() => alert('Exportando todos los productos...')}
              >
                Exportar
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={handleCreateProduct}
              >
                Agregar Producto
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <QuickSearchBar
              placeholder="Buscar productos por nombre, SKU, categoría..."
              searchType="products"
              onSearch={handleSearch}
              className="max-w-md"
            />
          </div>

          {/* Product Stats */}
          <ProductStats products={products} />

          {/* Filters */}
          <ProductFilters
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />

          {/* Bulk Actions */}
          <div className="flex items-center justify-between mb-6">
            <BulkActionsDropdown
              selectedCount={selectedProducts?.length}
              onBulkAction={handleBulkAction}
            />
            
            <div className="text-sm text-text-secondary">
              Mostrando {filteredProducts?.length} de {products?.length} productos
            </div>
          </div>

          {/* Products Table */}
          <ProductTable
            products={filteredProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onDuplicate={handleDuplicateProduct}
            selectedProducts={selectedProducts}
            onSelectProduct={handleSelectProduct}
            onSelectAll={handleSelectAll}
          />

          {/* Product Modal */}
          <ProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            product={selectedProduct}
            onSave={handleSaveProduct}
            mode={modalMode}
          />
        </div>
      </div>
    </div>
  );
};

export default GestionDeProductos;