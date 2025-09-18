import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, color = "var(--color-primary)" }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(num);
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon name={icon} size={24} color={color} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-text-primary mb-1">
          {formatNumber(value)}
        </h3>
        <p className="text-sm text-text-secondary">{title}</p>
      </div>
    </div>
  );
};

export default KPICard;