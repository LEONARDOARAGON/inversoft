import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddUserModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'manager', label: 'Gerente' },
    { value: 'sales', label: 'Vendedor' },
    { value: 'warehouse', label: 'Almacén' }
  ];

  const departmentOptions = [
    { value: 'Administración', label: 'Administración' },
    { value: 'Ventas', label: 'Ventas' },
    { value: 'Almacén', label: 'Almacén' },
    { value: 'Contabilidad', label: 'Contabilidad' },
    { value: 'Recursos Humanos', label: 'Recursos Humanos' }
  ];

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData?.role) {
      newErrors.role = 'El rol es requerido';
    }

    if (!formData?.department) {
      newErrors.department = 'El departamento es requerido';
    }

    if (!formData?.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const newUser = {
        id: Date.now(),
        name: formData?.name,
        email: formData?.email,
        phone: formData?.phone,
        role: formData?.role,
        department: formData?.department,
        status: 'active',
        createdAt: new Date()?.toISOString(),
        lastLogin: null,
        activityHistory: []
      };

      await onSave(newUser);
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            Agregar Nuevo Usuario
          </h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Nombre Completo"
            type="text"
            placeholder="Ingrese el nombre completo"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />

          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="usuario@empresa.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <Input
            label="Teléfono"
            type="tel"
            placeholder="Número de teléfono (opcional)"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
          />

          <Select
            label="Rol"
            placeholder="Seleccione un rol"
            options={roleOptions}
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            error={errors?.role}
            required
          />

          <Select
            label="Departamento"
            placeholder="Seleccione un departamento"
            options={departmentOptions}
            value={formData?.department}
            onChange={(value) => handleInputChange('department', value)}
            error={errors?.department}
            required
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />

          <Input
            label="Confirmar Contraseña"
            type="password"
            placeholder="Repita la contraseña"
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              loading={isLoading}
              iconName="Plus"
              iconPosition="left"
            >
              Crear Usuario
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;