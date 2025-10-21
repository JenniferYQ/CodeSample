/**
 * 表单验证工具集
 * 提供字段级和表单级的验证功能
 */

export function validateField(field, value, errors) {
  // 清空当前字段的旧错误
  errors[field.name] = [];
  
  // 检查必填字段
  if (field.rules?.required && (!value && value !== 0)) {
    errors[field.name].push(field.rules.required.message || '该字段为必填项');
  }
  
  // 检查最小长度
  if (field.rules?.minLength && value?.length < field.rules.minLength.value) {
    errors[field.name].push(
      field.rules.minLength.message || `长度不能少于${field.rules.minLength.value}个字符`
    );
  }
  
  // 检查最大长度
  if (field.rules?.maxLength && value?.length > field.rules.maxLength.value) {
    errors[field.name].push(
      field.rules.maxLength.message || `长度不能超过${field.rules.maxLength.value}个字符`
    );
  }
  
  // 检查正则表达式
  if (field.rules?.pattern && !new RegExp(field.rules.pattern.value).test(value)) {
    errors[field.name].push(
      field.rules.pattern.message || '格式不符合要求'
    );
  }
  
  // 自定义验证函数
  if (field.rules?.validator && typeof field.rules.validator === 'function') {
    const customError = field.rules.validator(value);
    if (customError) {
      errors[field.name].push(customError);
    }
  }
}

export function validateForm(fields, formData, errors) {
  let isValid = true;
  
  // 验证所有字段
  fields.forEach(field => {
    validateField(field, formData[field.name], errors);
    
    // 如果字段有错误，标记表单无效
    if (errors[field.name]?.length > 0) {
      isValid = false;
    }
  });
  
  return isValid;
}