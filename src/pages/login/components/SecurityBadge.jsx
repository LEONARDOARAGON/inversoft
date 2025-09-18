import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadge = () => {
  return (
    <div className="mt-8 p-4 bg-success/10 border border-success/20 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
          <Icon name="Shield" size={16} color="var(--color-success)" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-success">
            Conexión Segura
          </h4>
          <p className="text-xs text-text-secondary">
            Tus datos están protegidos con encriptación SSL 256-bit
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadge;