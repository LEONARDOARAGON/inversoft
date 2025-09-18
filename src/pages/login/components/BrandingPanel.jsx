import React from 'react';
import Icon from '../../../components/AppIcon';


const BrandingPanel = () => {
  const features = [
    {
      icon: 'Package',
      title: 'Gestión de Productos',
      description: 'Control completo de tu inventario con seguimiento en tiempo real'
    },
    {
      icon: 'Truck',
      title: 'Proveedores',
      description: 'Administra relaciones con proveedores y órdenes de compra'
    },
    {
      icon: 'ShoppingCart',
      title: 'Procesamiento de Ventas',
      description: 'Procesa ventas y genera facturas automáticamente'
    },
    {
      icon: 'Users',
      title: 'Control de Usuarios',
      description: 'Gestión de roles y permisos para tu equipo'
    },
      {
      icon: 'Lock',
      title: 'Hábeas Data',
      description: 'Derecho que tienen las personas a conocer, actualizar y rectificar la información sobre sí mismas que está registrada en bancos de datos públicos o privados.'
    }
  ];

  const trustSignals = [
    {
      icon: 'Shield',
      text: 'Certificado ISO 27001'
    },
    {
      icon: 'Lock',
      text: 'Encriptación SSL 256-bit'
    },
    {
      icon: 'CheckCircle',
      text: 'Cumple RGPD'
    }
  ];

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
      </div>
      <div className="relative z-10 flex flex-col justify-center p-12 text-white">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={24} color="white" />
            </div>
            <h2 className="text-3xl font-bold">InverSoft</h2>
          </div>
          
          <h3 className="text-xl font-semibold mb-4">
            Sistema Integral de Gestión de Inventario
          </h3>
          
          <p className="text-white/80 text-lg leading-relaxed">
            Optimiza tus operaciones comerciales con nuestra plataforma completa 
            para el control de inventario, gestión de proveedores y procesamiento de ventas.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={18} color="white" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{feature?.title}</h4>
                <p className="text-white/70 text-sm">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Company Stats */}
        <div className="mt-8 grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">500+</div>
            <div className="text-white/70 text-xs">Empresas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">99.9%</div>
            <div className="text-white/70 text-xs">Disponibilidad</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">24/7</div>
            <div className="text-white/70 text-xs">Soporte</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingPanel;