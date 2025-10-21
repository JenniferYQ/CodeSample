import React, { useMemo } from 'react';
import InputField from './fields/InputField';
import SelectField from './fields/SelectField';
import CheckboxField from './fields/CheckboxField';
import RadioField from './fields/RadioField';
import DateField from './fields/DateField';
import SwitchField from './fields/SwitchField';

// 字段类型映射
const fieldComponents = {
  input: InputField,
  select: SelectField,
  checkbox: CheckboxField,
  radio: RadioField,
  date: DateField,
  switch: SwitchField,
};

/**
 * 表单字段渲染组件
 * 根据字段类型动态渲染对应的表单控件
 * 
 * @param {Object} props - 组件属性
 * @param {Object} props.field - 字段配置
 * @param {any} props.value - 字段值
 * @param {Function} props.onChange - 值变更回调
 * @param {Array} props.errors - 错误信息
 * @param {Object} props.formData - 整个表单数据
 */
const FormField = ({ field, value, onChange, errors = [], formData = {} }) => {
  // 计算使用哪个字段组件
  const FieldComponent = useMemo(() => {
    return fieldComponents[field.type] || InputField;
  }, [field.type]);
  
  // 计算传递给字段组件的属性
  const fieldProps = useMemo(() => {
    return {
      ...field,
      ...field.props
    };
  }, [field]);
  
  // 计算标签样式
  const labelStyle = useMemo(() => {
    const formConfig = field.formConfig || {};
    return {
      width: formConfig.labelWidth || 'auto',
      textAlign: formConfig.labelPosition === 'right' ? 'right' : 'left'
    };
  }, [field.formConfig]);
  
  // 计算字段是否隐藏
  const isHidden = useMemo(() => {
    if (field.hidden) return true;
    
    // 处理条件显示逻辑
    if (field.visibleOn && formData) {
      try {
        // 简单的条件表达式求值
        // 实际项目中可能需要更复杂的表达式解析器
        const fn = new Function('formData', `return ${field.visibleOn}`);
        return !fn(formData);
      } catch (e) {
        console.error('Error evaluating visibleOn expression:', e);
        return false;
      }
    }
    
    return false;
  }, [field.hidden, field.visibleOn, formData]);
  
  if (isHidden) {
    return null;
  }
  
  return (
    <div 
      className={`form-field ${field.required ? 'is-required' : ''} ${errors?.length ? 'is-error' : ''} ${field.disabled ? 'is-disabled' : ''}`}
    >
      {field.label && (
        <label style={labelStyle}>{field.label}</label>
      )}
      
      <FieldComponent
        {...fieldProps}
        value={value}
        onChange={onChange}
      />
      
      {errors?.length > 0 && (
        <div className="field-errors">
          {errors.map((error, i) => (
            <div key={i} className="error-message">
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormField;