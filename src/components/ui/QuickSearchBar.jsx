import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Input from './Input';

const QuickSearchBar = ({ 
  placeholder = "Buscar productos, proveedores...",
  searchType = "global",
  onSearch = null,
  onSelect = null,
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Mock search results based on search type
  const mockResults = {
    global: [
      { id: 1, type: 'product', title: 'Laptop Dell XPS 13', subtitle: 'SKU: LAP001', icon: 'Package' },
      { id: 2, type: 'supplier', title: 'TechCorp Solutions', subtitle: 'Proveedor de tecnología', icon: 'Truck' },
      { id: 3, type: 'sale', title: 'Venta #12345', subtitle: '$1,250.00 - Completada', icon: 'ShoppingCart' },
      { id: 4, type: 'user', title: 'María González', subtitle: 'Gerente de Ventas', icon: 'User' }
    ],
    products: [
      { id: 1, type: 'product', title: 'Laptop Dell XPS 13', subtitle: 'SKU: LAP001 - Stock: 15', icon: 'Package' },
      { id: 2, type: 'product', title: 'Mouse Logitech MX', subtitle: 'SKU: MOU001 - Stock: 45', icon: 'Package' },
      { id: 3, type: 'product', title: 'Teclado Mecánico', subtitle: 'SKU: KEY001 - Stock: 8', icon: 'Package' }
    ],
    suppliers: [
      { id: 1, type: 'supplier', title: 'TechCorp Solutions', subtitle: 'Tecnología y equipos', icon: 'Truck' },
      { id: 2, type: 'supplier', title: 'Office Supplies Inc', subtitle: 'Suministros de oficina', icon: 'Truck' }
    ],
    sales: [
      { id: 1, type: 'sale', title: 'Venta #12345', subtitle: '$1,250.00 - Completada', icon: 'ShoppingCart' },
      { id: 2, type: 'sale', title: 'Venta #12346', subtitle: '$850.00 - Pendiente', icon: 'ShoppingCart' }
    ]
  };

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
        const filteredResults = (mockResults?.[searchType] || mockResults?.global)?.filter(item => 
            item?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
            item?.subtitle?.toLowerCase()?.includes(query?.toLowerCase())
          )?.slice(0, 5);
        
        setResults(filteredResults);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query, searchType]);

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
      } else if (query?.trim()) {
        handleSearch();
      }
    } else if (e?.key === 'Escape') {
      setIsExpanded(false);
      setSelectedIndex(-1);
    }
  };

  const handleSelect = (item) => {
    if (onSelect) {
      onSelect(item);
    }
    setQuery('');
    setIsExpanded(false);
    setSelectedIndex(-1);
  };

  const handleSearch = () => {
    if (onSearch && query?.trim()) {
      onSearch(query?.trim(), searchType);
    }
    setIsExpanded(false);
  };

  const getTypeColor = (type) => {
    const colors = {
      product: 'var(--color-primary)',
      supplier: 'var(--color-accent)',
      sale: 'var(--color-success)',
      user: 'var(--color-secondary)'
    };
    return colors?.[type] || 'var(--color-text-secondary)';
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <Input
          type="search"
          placeholder={placeholder}
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
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-modal z-50 animate-fade-in">
          {isLoading ? (
            <div className="p-4 text-center">
              <Icon name="Loader2" size={16} color="var(--color-text-secondary)" className="animate-spin mx-auto" />
              <p className="text-sm text-text-secondary mt-2">Buscando...</p>
            </div>
          ) : results?.length > 0 ? (
            <div className="py-2" ref={resultsRef}>
              {results?.map((item, index) => (
                <button
                  key={item?.id}
                  onClick={() => handleSelect(item)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-smooth ${
                    index === selectedIndex
                      ? 'bg-primary/10 text-primary' :'hover:bg-muted text-text-secondary'
                  }`}
                >
                  <Icon 
                    name={item?.icon} 
                    size={16} 
                    color={index === selectedIndex ? 'var(--color-primary)' : getTypeColor(item?.type)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate">
                      {item?.title}
                    </div>
                    <div className="text-xs text-text-secondary truncate">
                      {item?.subtitle}
                    </div>
                  </div>
                </button>
              ))}
              
              {query?.trim() && (
                <div className="border-t border-border mt-2 pt-2">
                  <button
                    onClick={handleSearch}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-muted transition-smooth"
                  >
                    <Icon name="Search" size={16} color="var(--color-primary)" />
                    <span className="text-sm text-primary">
                      Buscar "{query}" en todos los resultados
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : query?.length > 0 ? (
            <div className="p-4 text-center">
              <Icon name="Search" size={24} color="var(--color-text-secondary)" className="mx-auto mb-2" />
              <p className="text-sm text-text-secondary">
                No se encontraron resultados para "{query}"
              </p>
              <button
                onClick={handleSearch}
                className="mt-2 text-sm text-primary hover:text-primary/80 transition-smooth"
              >
                Buscar en todos los registros
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default QuickSearchBar;