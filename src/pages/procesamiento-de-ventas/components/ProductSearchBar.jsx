import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const ProductSearchBar = ({ onProductSelect, className = "" }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef(null);

  const mockProducts = [
    {
      id: 1,
      sku: 'LAP001',
      name: 'Laptop Dell XPS 13',
      description: 'Laptop ultrabook 13.3" Intel i7 16GB RAM 512GB SSD',
      price: 1299.99,
      stock: 15,
      category: 'Informática'
    },
    {
      id: 2,
      sku: 'MOU001',
      name: 'Mouse Logitech MX Master 3',
      description: 'Mouse inalámbrico ergonómico para productividad',
      price: 89.99,
      stock: 45,
      category: 'Periféricos'
    },
    {
      id: 3,
      sku: 'KEY001',
      name: 'Teclado Mecánico Corsair K70',
      description: 'Teclado mecánico RGB switches Cherry MX',
      price: 159.99,
      stock: 8,
      category: 'Periféricos'
    },
    {
      id: 4,
      sku: 'MON001',
      name: 'Monitor Samsung 27" 4K',
      description: 'Monitor 27 pulgadas resolución 4K HDR',
      price: 399.99,
      stock: 12,
      category: 'Monitores'
    },
    {
      id: 5,
      sku: 'TAB001',
      name: 'Tablet iPad Air',
      description: 'Tablet Apple iPad Air 64GB WiFi',
      price: 649.99,
      stock: 0,
      category: 'Tablets'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsExpanded(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query?.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const filteredResults = mockProducts?.filter(product => 
            product?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
            product?.sku?.toLowerCase()?.includes(query?.toLowerCase()) ||
            product?.description?.toLowerCase()?.includes(query?.toLowerCase())
          )?.slice(0, 8);
        
        setResults(filteredResults);
        setIsLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e?.target?.value);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsExpanded(true);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'ArrowDown') {
      e?.preventDefault();
      setSelectedIndex(prev => 
        prev < results?.length - 1 ? prev + 1 : prev
      );
    } else if (e?.key === 'ArrowUp') {
      e?.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e?.key === 'Enter') {
      e?.preventDefault();
      if (selectedIndex >= 0 && results?.[selectedIndex]) {
        handleSelect(results?.[selectedIndex]);
      }
    } else if (e?.key === 'Escape') {
      setIsExpanded(false);
      setSelectedIndex(-1);
    }
  };

  const handleSelect = (product) => {
    if (onProductSelect) {
      onProductSelect(product);
    }
    setQuery('');
    setIsExpanded(false);
    setSelectedIndex(-1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(price);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Buscar productos por nombre, SKU o descripción..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-4"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={16} color="var(--color-text-secondary)" />
        </div>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setSelectedIndex(-1);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-md transition-smooth"
          >
            <Icon name="X" size={14} color="var(--color-text-secondary)" />
          </button>
        )}
      </div>
      {isExpanded && (query?.length > 0 || results?.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-modal z-50 animate-fade-in max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <Icon name="Loader2" size={16} color="var(--color-text-secondary)" className="animate-spin mx-auto" />
              <p className="text-sm text-text-secondary mt-2">Buscando productos...</p>
            </div>
          ) : results?.length > 0 ? (
            <div className="py-2">
              {results?.map((product, index) => (
                <button
                  key={product?.id}
                  onClick={() => handleSelect(product)}
                  disabled={product?.stock === 0}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-smooth ${
                    product?.stock === 0 
                      ? 'opacity-50 cursor-not-allowed'
                      : index === selectedIndex
                        ? 'bg-primary/10 text-primary' :'hover:bg-muted text-text-secondary'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <Icon 
                      name="Package" 
                      size={16} 
                      color={product?.stock === 0 ? 'var(--color-text-secondary)' : 'var(--color-primary)'}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-text-primary truncate">
                        {product?.name}
                      </div>
                      <div className="text-sm font-semibold text-primary ml-2">
                        {formatPrice(product?.price)}
                      </div>
                    </div>
                    <div className="text-xs text-text-secondary truncate">
                      SKU: {product?.sku} • {product?.description}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-text-secondary">
                        {product?.category}
                      </span>
                      <span className={`text-xs font-medium ${
                        product?.stock === 0 
                          ? 'text-destructive' 
                          : product?.stock <= 5 
                            ? 'text-warning' :'text-success'
                      }`}>
                        Stock: {product?.stock}
                        {product?.stock === 0 && ' (Agotado)'}
                        {product?.stock > 0 && product?.stock <= 5 && ' (Bajo)'}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query?.length > 0 ? (
            <div className="p-4 text-center">
              <Icon name="Package" size={24} color="var(--color-text-secondary)" className="mx-auto mb-2" />
              <p className="text-sm text-text-secondary">
                No se encontraron productos para "{query}"
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ProductSearchBar;