import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesChart = () => {
  const salesData = [
    { month: 'Ene', ventas: 45000, pedidos: 120 },
    { month: 'Feb', ventas: 52000, pedidos: 135 },
    { month: 'Mar', ventas: 48000, pedidos: 128 },
    { month: 'Abr', ventas: 61000, pedidos: 155 },
    { month: 'May', ventas: 55000, pedidos: 142 },
    { month: 'Jun', ventas: 67000, pedidos: 168 },
    { month: 'Jul', ventas: 59000, pedidos: 151 },
    { month: 'Ago', ventas: 63000, pedidos: 159 },
    { month: 'Sep', ventas: 71000, pedidos: 178 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-text-secondary">
                {entry?.dataKey === 'ventas' ? 'Ventas:' : 'Pedidos:'}
              </span>
              <span className="font-medium text-text-primary">
                {entry?.dataKey === 'ventas' ? formatCurrency(entry?.value) : entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Tendencia de Ventas
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-text-secondary">Ventas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-text-secondary">Pedidos</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="ventas" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="pedidos" 
              stroke="var(--color-accent)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;