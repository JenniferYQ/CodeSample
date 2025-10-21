import React, { useState, useEffect, useCallback } from 'react';
import FormField from './FormField';
import { validateField, validateForm } from './validators';

/**
 * 表单自动化渲染器主组件
 * 负责整体表单的渲染、数据管理和验证
 * 
 * @param {Object} props - 组件属性
 * @param {Object} props.formConfig - 表单配置对象
 * @param {Object} props.initialData - 初始表单数据
 * @param {Function} props.onSubmit - 表单提交回调
 * @param {Function} props.onReset - 表单重置回调
 * @param {Function} props.onFieldChange - 字段值变更回调
 */
const FormRenderer = ({ 
  formConfig, 
  initialData = {}, 
  onSubmit, 
  onReset,
  onFieldChange,
  onValidationError
}) => {
  // 获取表单默认值
  const getDefaultValues = useCallback(() => {
    const values = {};
    formConfig.fields.forEach(field => {
      values[field.name] = field.defaultValue !== undefined ? field.defaultValue : null;
    });
    return values;
  }, [formConfig.fields]);
  
  // 表单状态
  const [formData, setFormData] = useState({ ...getDefaultValues(), ...initialData });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  
  // 当初始数据变化时更新表单数据
  useEffect(() => {
    setFormData(prev => ({ ...prev, ...initialData }));
  }, [initialData]);
  
  // 更新字段值
  const updateField = (name, value) => {
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // 实时验证
      const field = formConfig.fields.find(f => f.name === name);
      if (field) {
        validateField(field, value, errors, (fieldErrors) => {
          setErrors(prev => ({ ...prev, [name]: fieldErrors }));
        });
      }
      
      if (onFieldChange) {
        onFieldChange({ name, value, formData: newData });
      }
      
      return newData;
    });
  };
  
  // 提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // 验证所有字段
    const validationErrors = {};
    const isValid = validateForm(formConfig.fields, formData, validationErrors);
    setErrors(validationErrors);
    
    if (isValid) {
      try {
        if (onSubmit) {
          await onSubmit(formData);
        }
      } catch (error) {
        console.error('Form submission error:', error);
      }
    } else if (onValidationError) {
      onValidationError(validationErrors);
    }
    
    setSubmitting(false);
  };
  
  // 重置表单
  const resetForm = () => {
    const defaultValues = getDefaultValues();
    setFormData(defaultValues);
    setErrors({});
    
    if (onReset) {
      onReset(defaultValues);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="form-renderer">
      {formConfig.fields.map((field, index) => (
        <FormField
          key={field.name || index}
          field={field}
          value={formData[field.name]}
          onChange={(value) => updateField(field.name, value)}
          errors={errors[field.name]}
          formData={formData}
        />
      ))}
      
      <div className="form-actions">
        <button 
          type="submit" 
          disabled={submitting}
        >
          {formConfig.formConfig?.submitText || '提交'}
        </button>
        <button 
          type="button" 
          onClick={resetForm} 
          disabled={submitting}
        >
          {formConfig.formConfig?.resetText || '重置'}
        </button>
      </div>
    </form>
  );
};

export default FormRenderer;