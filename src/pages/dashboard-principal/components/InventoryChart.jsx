import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InventoryChart = () => {
  const inventoryData = [
    { categoria: 'Electrónicos', stock: 245, minimo: 50, optimo: 300 },
    { categoria: 'Oficina', stock: 189, minimo: 30, optimo: 200 },
    { categoria: 'Accesorios', stock: 156, minimo: 40, optimo: 180 },
    { categoria: 'Software', stock: 89, minimo: 20, optimo: 100 },
    { categoria: 'Mobiliario', stock: 67, minimo: 15, optimo: 80 },
    { categoria: 'Consumibles', stock: 234, minimo: 60, optimo: 250 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Stock Actual:</span>
              <span className="font-medium text-text-primary">{data?.stock}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Stock Mínimo:</span>
              <span className="font-medium text-error">{data?.minimo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Stock Óptimo:</span>
              <span className="font-medium text-success">{data?.optimo}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (entry) => {
    if (entry?.stock <= entry?.minimo) return 'var(--color-error)';
    if (entry?.stock >= entry?.optimo * 0.8) return 'var(--color-success)';
    return 'var(--color-warning)';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Niveles de Inventario por Categoría
        </h3>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-error" />
            <span className="text-text-secondary">Bajo</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-text-secondary">Medio</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-text-secondary">Óptimo</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={inventoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="categoria" 
              stroke="var(--color-text-secondary)"
              fontSize={11}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="stock" 
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InventoryChart;