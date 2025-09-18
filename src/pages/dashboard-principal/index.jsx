import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickSearchBar from '../../components/ui/QuickSearchBar';
import KPICard from './components/KPICard';
import SalesChart from './components/SalesChart';
import InventoryChart from './components/InventoryChart';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import AlertsPanel from './components/AlertsPanel';

const DashboardPrincipal = () => {
  const [user] = useState({
    name: 'Carlos Rodríguez',
    email: 'carlos@inversoft.com',
    role: 'admin',
    avatar: null
  });

  const [dashboardData, setDashboardData] = useState({
    totalProducts: 1247,
    lowStockAlerts: 8,
    todaySales: 15,
    totalSuppliers: 23,
    salesAmount: 67500,
    pendingOrders: 5
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        todaySales: prev?.todaySales + Math.floor(Math.random() * 2),
        salesAmount: prev?.salesAmount + Math.floor(Math.random() * 1000)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const kpiData = [
    {
      title: 'Total de Productos',
      value: dashboardData?.totalProducts,
      change: '+12',
      changeType: 'positive',
      icon: 'Package',
      color: 'var(--color-primary)'
    },
    {
      title: 'Alertas de Stock Bajo',
      value: dashboardData?.lowStockAlerts,
      change: '-3',
      changeType: 'positive',
      icon: 'AlertTriangle',
      color: 'var(--color-warning)'
    },
    {
      title: 'Ventas de Hoy',
      value: dashboardData?.todaySales,
      change: '+5',
      changeType: 'positive',
      icon: 'ShoppingCart',
      color: 'var(--color-success)'
    },
    {
      title: 'Proveedores Activos',
      value: dashboardData?.totalSuppliers,
      change: '+2',
      changeType: 'positive',
      icon: 'Truck',
      color: 'var(--color-accent)'
    }
  ];

  const handleSearch = (query, type) => {
    console.log(`Searching for: ${query} in ${type}`);
    // In a real app, this would trigger a search across the system
  };

  const handleSearchSelect = (item) => {
    console.log('Selected item:', item);
    // In a real app, this would navigate to the selected item
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <BreadcrumbNavigation />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Dashboard Principal
                </h1>
                <p className="text-text-secondary">
                  Resumen completo de tu inventario y operaciones comerciales
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <QuickSearchBar
                  placeholder="Buscar productos, proveedores, ventas..."
                  searchType="global"
                  onSearch={handleSearch}
                  onSelect={handleSearchSelect}
                  className="w-80"
                />
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
                color={kpi?.color}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <SalesChart />
            <InventoryChart />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Activity Feed - Takes 2 columns */}
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>
            
            {/* Alerts Panel - Takes 1 column */}
            <div>
              <AlertsPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPrincipal;