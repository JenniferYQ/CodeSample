<template>
  <div 
    class="form-field" 
    :class="{ 
      'is-required': field.required, 
      'is-error': errors && errors.length,
      'is-disabled': field.disabled,
      'is-hidden': isHidden
    }"
    v-show="!isHidden"
  >
    <label v-if="field.label" :style="labelStyle">{{ field.label }}</label>
    <component 
      :is="fieldComponent"
      :field="field"
      :value="value"
      @update:value="$emit('update:value', $event)"
    />
    <div v-if="errors && errors.length" class="field-errors">
      <div v-for="(error, i) in errors" :key="i" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 表单字段渲染组件
 * 根据字段类型动态渲染对应的表单控件
 */
import { computed } from 'vue';
import InputField from './fields/InputField.vue';
import SelectField from './fields/SelectField.vue';
import CheckboxField from './fields/CheckboxField.vue';
import RadioField from './fields/RadioField.vue';
import DateField from './fields/DateField.vue';
import SwitchField from './fields/SwitchField.vue';

// 字段类型映射
const fieldComponents = {
  input: InputField,
  select: SelectField,
  checkbox: CheckboxField,
  radio: RadioField,
  date: DateField,
  switch: SwitchField,
};

export default {
  name: 'FormField',
  components: {
    InputField,
    SelectField,
    CheckboxField,
    RadioField,
    DateField,
    SwitchField
  },
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: [String, Number, Boolean, Array, Object],
      default: null
    },
    errors: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  
  setup(props) {
    // 计算使用哪个字段组件
    const fieldComponent = computed(() => {
      return fieldComponents[props.field.type] || InputField;
    });
    
    // 计算传递给字段组件的属性
    const fieldProps = computed(() => {
      return {
        ...props.field,
        ...props.field.props
      };
    });
    
    // 计算标签样式
    const labelStyle = computed(() => {
      const formConfig = props.field.formConfig || {};
      return {
        width: formConfig.labelWidth || 'auto',
        textAlign: formConfig.labelPosition === 'right' ? 'right' : 'left'
      };
    });
    
    // 计算字段是否隐藏
    const isHidden = computed(() => {
      if (props.field.hidden) return true;
      
      // 处理条件显示逻辑
      if (props.field.visibleOn && props.formData) {
        try {
          // 简单的条件表达式求值
          // 实际项目中可能需要更复杂的表达式解析器
          const fn = new Function('formData', `return ${props.field.visibleOn}`);
          return !fn(props.formData);
        } catch (e) {
          console.error('Error evaluating visibleOn expression:', e);
          return false;
        }
      }
      
      return false;
    });
    
    return {
      fieldComponent,
      fieldProps,
      labelStyle,
      isHidden
    };
  }
};
</script>