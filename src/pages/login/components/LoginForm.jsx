import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = [
    { email: 'admin@inversoft.com', password: 'admin123', role: 'admin', name: 'Administrador' },
    { email: 'gerente@inversoft.com', password: 'gerente123', role: 'manager', name: 'María González' },
    { email: 'ventas@inversoft.com', password: 'ventas123', role: 'sales', name: 'Carlos Rodríguez' },
    { email: 'almacen@inversoft.com', password: 'almacen123', role: 'warehouse', name: 'Ana López' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials
      const user = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (user) {
        // Store user data and token
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify({
          id: Date.now(),
          name: user?.name,
          email: user?.email,
          role: user?.role,
          avatar: null
        }));

        // Remember me functionality
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Redirect to dashboard
        navigate('/dashboard-principal');
      } else {
        setErrors({
          general: 'Credenciales incorrectas. Verifique su correo y contraseña.'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Error de conexión. Inténtelo nuevamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Funcionalidad de recuperación de contraseña próximamente disponible');
  };

  const handleRegister = () => {
    alert('Contacte al administrador para crear una nueva cuenta');
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-card rounded-lg shadow-card p-8 border border-border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Package" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Iniciar Sesión
          </h1>
          <p className="text-text-secondary">
            Accede a tu sistema de gestión de inventario
          </p>
        </div>

        {errors?.general && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
              <span className="text-sm text-error">{errors?.general}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="ejemplo@inversoft.com"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Recordarme"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
            />
            
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
            >
              ¿Olvidé mi contraseña?
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="left"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-sm text-text-secondary mb-2">
            ¿No tienes una cuenta?
          </p>
          <button
            onClick={handleRegister}
            className="text-sm text-primary hover:text-primary/80 transition-smooth font-medium"
          >
            Registrar Nueva Cuenta
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default LoginForm;