import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null, onNavigate = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeLabels = {
    '/dashboard-principal': 'Dashboard',
    '/gesti-n-de-productos': 'Gestión de Productos',
    '/gesti-n-de-proveedores': 'Gestión de Proveedores',
    '/procesamiento-de-ventas': 'Procesamiento de Ventas',
    '/gesti-n-de-usuarios': 'Gestión de Usuarios',
    '/login': 'Iniciar Sesión'
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [
      {
        label: 'Inicio',
        path: '/dashboard-principal',
        icon: 'Home'
      }
    ];

    if (location?.pathname !== '/dashboard-principal') {
      const currentPath = location?.pathname;
      const currentLabel = routeLabels?.[currentPath] || 'Página';
      
      breadcrumbs?.push({
        label: currentLabel,
        path: currentPath,
        current: true
      });
    } else {
      breadcrumbs[0].current = true;
    }

    return breadcrumbs;
  };

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1 && breadcrumbs?.[0]?.current) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                color="var(--color-text-secondary)" 
                className="mx-2"
              />
            )}
            
            {breadcrumb?.current ? (
              <span className="flex items-center space-x-1 text-text-primary font-medium">
                {breadcrumb?.icon && (
                  <Icon 
                    name={breadcrumb?.icon} 
                    size={14} 
                    color="var(--color-text-primary)"
                  />
                )}
                <span>{breadcrumb?.label}</span>
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(breadcrumb?.path)}
                className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-smooth"
              >
                {breadcrumb?.icon && (
                  <Icon 
                    name={breadcrumb?.icon} 
                    size={14} 
                    color="currentColor"
                  />
                )}
                <span>{breadcrumb?.label}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;