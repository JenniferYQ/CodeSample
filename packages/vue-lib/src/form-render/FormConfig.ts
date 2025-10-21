export interface FormConfig {
  // 表单基本配置
  formConfig: {
    name: string;         // 表单名称
    labelWidth: string;   // 标签宽度
    labelPosition: 'top' | 'left' | 'right'; // 标签位置
    submitText: string;   // 提交按钮文本
    resetText: string;    // 重置按钮文本
  };

  // 表单字段配置
  fields: FieldConfig[];
}

export interface FieldConfig {
  type: string;       // 字段类型：input/select/radio/checkbox/switch/date等
  name: string;       // 字段名称（用于表单数据绑定）
  label: string;      // 字段标签
  defaultValue?: any;  // 默认值
  placeholder?: string; // 占位文本
  required?: boolean;  // 是否必填
  disabled?: boolean;  // 是否禁用
  hidden?: boolean;    // 是否隐藏

  // 验证规则
  rules?: ValidationRule[];

  // 特定类型的额外配置
  props?: FieldProps;

  // 条件渲染配置
  visibleOn?: string;  // 显示条件表达式

  // 事件处理
//   events?: FieldEvents;
}

export interface ValidationRule {
  type: string;   // 验证类型：required/email/phone/custom等
  message?: string; // 错误提示
  pattern?: RegExp; // 正则表达式（用于自定义验证）
  validator?: (value: any) => boolean | string; // 自定义验证函数
}

export interface FieldProps {
  // 根据type不同而不同的属性
  options?: OptionItem[];
  // 其他属性...
  [key: string]: any;
}

export interface OptionItem {
  label: string;
  value: any;
}

// export interface FieldEvents {
//   onChange?: (value: any) => void;
//   onFocus?: () => {};
//   onBlur?: () => {};
//   // 其他事件...
//   [key: string]: Function;
// }