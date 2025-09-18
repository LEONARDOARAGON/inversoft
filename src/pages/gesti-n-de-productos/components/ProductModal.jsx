import React, { useState, useEffect } from 'react';

import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ProductModal = ({ isOpen, onClose, product, onSave, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    category: '',
    supplier: '',
    price: '',
    cost: '',
    stock: '',
    minStock: '',
    maxStock: '',
    location: '',
    barcode: '',
    weight: '',
    dimensions: '',
    image: '',
    status: 'active'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product && mode !== 'create') {
      setFormData({
        sku: product?.sku || '',
        name: product?.name || '',
        description: product?.description || '',
        category: product?.category || '',
        supplier: product?.supplier || '',
        price: product?.price?.toString() || '',
        cost: product?.cost?.toString() || '',
        stock: product?.stock?.toString() || '',
        minStock: product?.minStock?.toString() || '',
        maxStock: product?.maxStock?.toString() || '',
        location: product?.location || '',
        barcode: product?.barcode || '',
        weight: product?.weight?.toString() || '',
        dimensions: product?.dimensions || '',
        image: product?.image || '',
        status: product?.status || 'active'
      });
    } else {
      // Reset form for create mode
      setFormData({
        sku: '',
        name: '',
        description: '',
        category: '',
        supplier: '',
        price: '',
        cost: '',
        stock: '',
        minStock: '10',
        maxStock: '1000',
        location: '',
        barcode: '',
        weight: '',
        dimensions: '',
        image: '',
        status: 'active'
      });
    }
    setErrors({});
  }, [product, mode, isOpen]);

  const categoryOptions = [
    { value: 'electronica', label: 'Electrónica' },
    { value: 'informatica', label: 'Informática' },
    { value: 'oficina', label: 'Oficina' },
    { value: 'accesorios', label: 'Accesorios' },
    { value: 'mobiliario', label: 'Mobiliario' }
  ];

  const supplierOptions = [
    { value: 'TechCorp Solutions', label: 'TechCorp Solutions' },
    { value: 'Office Supplies Inc', label: 'Office Supplies Inc' },
    { value: 'Electronics Plus', label: 'Electronics Plus' },
    { value: 'Global Tech Distribution', label: 'Global Tech Distribution' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'discontinued', label: 'Descontinuado' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.sku?.trim()) newErrors.sku = 'El SKU es obligatorio';
    if (!formData?.name?.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData?.category) newErrors.category = 'La categoría es obligatoria';
    if (!formData?.supplier) newErrors.supplier = 'El proveedor es obligatorio';
    if (!formData?.price || parseFloat(formData?.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    if (!formData?.stock || parseInt(formData?.stock) < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData?.price),
        cost: formData?.cost ? parseFloat(formData?.cost) : 0,
        stock: parseInt(formData?.stock),
        minStock: parseInt(formData?.minStock) || 10,
        maxStock: parseInt(formData?.maxStock) || 1000,
        weight: formData?.weight ? parseFloat(formData?.weight) : null,
        id: product?.id || Date.now()
      };

      await onSave(productData);
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'edit': return 'Editar Producto';
      case 'duplicate': return 'Duplicar Producto';
      default: return 'Agregar Producto';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black/50" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-surface shadow-modal rounded-lg">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-text-primary">
              {getModalTitle()}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
            />
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">
                  Información Básica
                </h3>

                <Input
                  label="SKU"
                  type="text"
                  placeholder="Ej: LAP001"
                  value={formData?.sku}
                  onChange={(e) => handleInputChange('sku', e?.target?.value)}
                  error={errors?.sku}
                  required
                />

                <Input
                  label="Nombre del Producto"
                  type="text"
                  placeholder="Ej: Laptop Dell XPS 13"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  required
                />

                <Input
                  label="Descripción"
                  type="text"
                  placeholder="Descripción detallada del producto"
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                />

                <Select
                  label="Categoría"
                  options={categoryOptions}
                  value={formData?.category}
                  onChange={(value) => handleInputChange('category', value)}
                  error={errors?.category}
                  required
                />

                <Select
                  label="Proveedor"
                  options={supplierOptions}
                  value={formData?.supplier}
                  onChange={(value) => handleInputChange('supplier', value)}
                  error={errors?.supplier}
                  required
                />

                <Input
                  label="URL de Imagen"
                  type="url"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={formData?.image}
                  onChange={(e) => handleInputChange('image', e?.target?.value)}
                />

                {formData?.image && (
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={formData?.image}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">
                  Precios e Inventario
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Precio de Venta (COP)"
                    type="number"
                    placeholder="0,00"
                    value={formData?.price}
                    onChange={(e) => handleInputChange('price', e?.target?.value)}
                    error={errors?.price}
                    min="0"
                    step="0.01"
                    required
                  />

                  <Input
                    label="Costo (COP)"
                    type="number"
                    placeholder="0,00"
                    value={formData?.cost}
                    onChange={(e) => handleInputChange('cost', e?.target?.value)}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Input
                    label="Stock Actual"
                    type="number"
                    placeholder="0"
                    value={formData?.stock}
                    onChange={(e) => handleInputChange('stock', e?.target?.value)}
                    error={errors?.stock}
                    min="0"
                    required
                  />

                  <Input
                    label="Stock Mínimo"
                    type="number"
                    placeholder="10"
                    value={formData?.minStock}
                    onChange={(e) => handleInputChange('minStock', e?.target?.value)}
                    min="0"
                  />

                  <Input
                    label="Stock Máximo"
                    type="number"
                    placeholder="1000"
                    value={formData?.maxStock}
                    onChange={(e) => handleInputChange('maxStock', e?.target?.value)}
                    min="0"
                  />
                </div>

                <Input
                  label="Ubicación en Almacén"
                  type="text"
                  placeholder="Ej: A1-B2-C3"
                  value={formData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                />

                <Input
                  label="Código de Barras"
                  type="text"
                  placeholder="Ej: 1234567890123"
                  value={formData?.barcode}
                  onChange={(e) => handleInputChange('barcode', e?.target?.value)}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Peso (kg)"
                    type="number"
                    placeholder="0,00"
                    value={formData?.weight}
                    onChange={(e) => handleInputChange('weight', e?.target?.value)}
                    min="0"
                    step="0.01"
                  />

                  <Input
                    label="Dimensiones"
                    type="text"
                    placeholder="Ej: 30x20x5 cm"
                    value={formData?.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e?.target?.value)}
                  />
                </div>

                <Select
                  label="Estado"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={isLoading}
                iconName="Save"
                iconPosition="left"
              >
                {mode === 'create' ? 'Crear Producto' : 'Guardar Cambios'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;