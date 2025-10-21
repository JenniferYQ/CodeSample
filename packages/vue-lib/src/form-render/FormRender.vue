<template>
  <form @submit.prevent="handleSubmit" class="form-renderer">
    <div v-for="(field, index) in formConfig.fields" :key="index">
      <FormField 
        :field="field" 
        :value="formData[field.name]" 
        @update:value="updateField(field.name, $event)"
        :errors="errors[field.name]"
      />
    </div>
    
    <div class="form-actions">
      <button type="submit" :disabled="submitting">
        {{ formConfig.formConfig.submitText || '提交' }}
      </button>
      <button type="button" @click="resetForm" :disabled="submitting">
        {{ formConfig.formConfig.resetText || '重置' }}
      </button>
    </div>
  </form>
</template>

<script>
/**
 * 表单自动化渲染器主组件
 * 负责整体表单的渲染、数据管理和验证
 */
import { reactive, ref, computed, watch } from 'vue';
import FormField from './FormField.vue';
import { validateField, validateForm } from './validators';

export default {
  name: 'FormRenderer',
  components: { FormField },
  props: {
    // 表单配置对象
    formConfig: {
      type: Object,
      required: true
    },
    // 初始表单数据
    initialData: {
      type: Object,
      default: () => ({})
    }
  },
  
  setup(props, { emit }) {
    // 表单数据
    const formData = reactive({...getDefaultValues(props.formConfig.fields), ...props.initialData});
    // 表单错误信息
    const errors = reactive({});
    // 提交状态
    const submitting = ref(false);
    
    // 获取表单默认值
    function getDefaultValues(fields) {
      const values = {};
      fields.forEach(field => {
        values[field.name] = field.defaultValue !== undefined ? field.defaultValue : null;
      });
      return values;
    }
    
    // 更新字段值
    function updateField(name, value) {
      formData[name] = value;
      // 实时验证
      validateField(props.formConfig.fields.find(f => f.name === name), value, errors);
      emit('field-change', { name, value, formData });
    }
    
    // 提交表单
    async function handleSubmit() {
      submitting.value = true;
      
      // 验证所有字段
      const isValid = validateForm(props.formConfig.fields, formData, errors);
      
      if (isValid) {
        try {
          emit('submit', formData);
        } catch (error) {
          emit('error', error);
        }
      } else {
        emit('validation-error', errors);
      }
      
      submitting.value = false;
    }
    
    // 重置表单
    function resetForm() {
      Object.keys(formData).forEach(key => {
        const field = props.formConfig.fields.find(f => f.name === key);
        formData[key] = field?.defaultValue !== undefined ? field.defaultValue : null;
      });
      
      // 清除错误
      Object.keys(errors).forEach(key => {
        errors[key] = null;
      });
      
      emit('reset', formData);
    }
    
    return {
      formData,
      errors,
      submitting,
      updateField,
      handleSubmit,
      resetForm
    };
  }
};
</script>