import React, { useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const ProductStats = ({ products }) => {
  const stats = React.useMemo(() => {
    const totalProducts = products?.length;
    const activeProducts = products?.filter(p => p?.status === 'active')?.length;
    const lowStockProducts = products?.filter(p => p?.stock <= (p?.minStock || 10))?.length;
    const outOfStockProducts = products?.filter(p => p?.stock === 0)?.length;
    const totalValue = products?.reduce((sum, p) => sum + (p?.price * p?.stock), 0);
    const avgPrice = totalProducts > 0 ? products?.reduce((sum, p) => sum + p?.price, 0) / totalProducts : 0;

    return {
      totalProducts,
      activeProducts,
      lowStockProducts,
      outOfStockProducts,
      totalValue,
      avgPrice
    };
  }, [products]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    })?.format(amount);
  };

  const statCards = [
    {
      title: 'Total Productos',
      value: stats?.totalProducts?.toLocaleString('es-ES'),
      icon: 'Package',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Productos Activos',
      value: stats?.activeProducts?.toLocaleString('es-ES'),
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Stock Bajo',
      value: stats?.lowStockProducts?.toLocaleString('es-ES'),
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Sin Stock',
      value: stats?.outOfStockProducts?.toLocaleString('es-ES'),
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      title: 'Valor Total Inventario',
      value: formatCurrency(stats?.totalValue),
      icon: 'DollarSign',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Precio Promedio',
      value: formatCurrency(stats?.avgPrice),
      icon: 'TrendingUp',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-surface border border-border rounded-lg p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-text-secondary mb-1">
                {stat?.title}
              </p>
              <p className="text-xl font-semibold text-text-primary">
                {stat?.value}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon 
                name={stat?.icon} 
                size={20} 
                className={stat?.color}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductStats;