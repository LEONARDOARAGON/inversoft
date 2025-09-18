import React from 'react';
import Icon from '../../../components/AppIcon';

const SupplierStats = ({ suppliers }) => {
  const stats = {
    total: suppliers?.length,
    active: suppliers?.filter(s => s?.status === 'Activo')?.length,
    inactive: suppliers?.filter(s => s?.status === 'Inactivo')?.length,
    pending: suppliers?.filter(s => s?.status === 'Pendiente')?.length
  };

  const paymentTermsStats = suppliers?.reduce((acc, supplier) => {
    acc[supplier.paymentTerms] = (acc?.[supplier?.paymentTerms] || 0) + 1;
    return acc;
  }, {});

  const categoryStats = suppliers?.reduce((acc, supplier) => {
    acc[supplier.category] = (acc?.[supplier?.category] || 0) + 1;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryStats)?.sort(([,a], [,b]) => b - a)?.[0];
  const topPaymentTerm = Object.entries(paymentTermsStats)?.sort(([,a], [,b]) => b - a)?.[0];

  const statCards = [
    {
      title: 'Total Proveedores',
      value: stats?.total,
      icon: 'Building2',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Activos',
      value: stats?.active,
      icon: 'CheckCircle',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Inactivos',
      value: stats?.inactive,
      icon: 'XCircle',
      color: 'var(--color-error)',
      bgColor: 'bg-error/10'
    },
    {
      title: 'Pendientes',
      value: stats?.pending,
      icon: 'Clock',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">
                {stat?.title}
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {stat?.value}
              </p>
              {stat?.title === 'Total Proveedores' && topCategory && (
                <p className="text-xs text-text-secondary mt-1">
                  Mayoría: {topCategory?.[0]} ({topCategory?.[1]})
                </p>
              )}
              {stat?.title === 'Activos' && topPaymentTerm && (
                <p className="text-xs text-text-secondary mt-1">
                  Términos comunes: {topPaymentTerm?.[0]}
                </p>
              )}
            </div>
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color={stat?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupplierStats;