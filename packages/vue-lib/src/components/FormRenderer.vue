<template>
  <div class="form-renderer">
    <h2 v-if="formConfig.title">{{ formConfig.title }}</h2>
    
    <form @submit.prevent="handleSubmit" class="form-container">
      <div v-for="(field, index) in formConfig.fields" :key="index" class="form-field">
        <!-- 文本输入框 -->
        <template v-if="field.type === 'input'">
          <label :for="field.name">{{ field.label }}</label>
          <input 
            :id="field.name"
            :type="field.inputType || 'text'"
            v-model="formData[field.name]"
            :placeholder="field.placeholder"
            :required="field.required"
            :disabled="field.disabled"
          />
          <div v-if="errors[field.name]" class="field-error">{{ errors[field.name] }}</div>
        </template>
        
        <!-- 选择框 -->
        <template v-else-if="field.type === 'select'">
          <label :for="field.name">{{ field.label }}</label>
          <select 
            :id="field.name"
            v-model="formData[field.name]"
            :required="field.required"
            :disabled="field.disabled"
          >
            <option value="" disabled>{{ field.placeholder || '请选择' }}</option>
            <option 
              v-for="option in field.options" 
              :key="option.value" 
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
          <div v-if="errors[field.name]" class="field-error">{{ errors[field.name] }}</div>
        </template>
        
        <!-- 单选框组 -->
        <template v-else-if="field.type === 'radio'">
          <label class="field-label">{{ field.label }}</label>
          <div class="radio-group">
            <div v-for="option in field.options" :key="option.value" class="radio-item">
              <input 
                type="radio" 
                :id="`${field.name}-${option.value}`"
                :name="field.name"
                :value="option.value"
                v-model="formData[field.name]"
                :required="field.required"
                :disabled="field.disabled"
              />
              <label :for="`${field.name}-${option.value}`">{{ option.label }}</label>
            </div>
          </div>
          <div v-if="errors[field.name]" class="field-error">{{ errors[field.name] }}</div>
        </template>
        
        <!-- 复选框 -->
        <template v-else-if="field.type === 'checkbox'">
          <div class="checkbox-field">
            <input 
              type="checkbox" 
              :id="field.name"
              v-model="formData[field.name]"
              :required="field.required"
              :disabled="field.disabled"
            />
            <label :for="field.name">{{ field.label }}</label>
          </div>
          <div v-if="errors[field.name]" class="field-error">{{ errors[field.name] }}</div>
        </template>
        
        <!-- 文本域 -->
        <template v-else-if="field.type === 'textarea'">
          <label :for="field.name">{{ field.label }}</label>
          <textarea 
            :id="field.name"
            v-model="formData[field.name]"
            :placeholder="field.placeholder"
            :required="field.required"
            :disabled="field.disabled"
            :rows="field.rows || 3"
          ></textarea>
          <div v-if="errors[field.name]" class="field-error">{{ errors[field.name] }}</div>
        </template>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="submit-btn">{{ formConfig.submitText || '提交' }}</button>
        <button type="button" @click="resetForm" class="reset-btn">{{ formConfig.resetText || '重置' }}</button>
      </div>
    </form>
  </div>
</template>

<script>
/**
 * 表单自动化渲染器组件
 * 根据配置自动生成表单UI和处理表单逻辑
 */
export default {
  name: 'FormRenderer',
  props: {
    // 表单配置对象
    formConfig: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        submitText: '提交',
        resetText: '重置',
        fields: []
      })
    }
  },
  data() {
    return {
      // 表单数据
      formData: {},
      // 表单错误信息
      errors: {}
    };
  },
  created() {
    // 初始化表单数据
    this.initFormData();
  },
  methods: {
    /**
     * 初始化表单数据
     */
    initFormData() {
      const data = {};
      this.formConfig.fields.forEach(field => {
        data[field.name] = field.defaultValue !== undefined ? field.defaultValue : '';
      });
      this.formData = data;
    },
    
    /**
     * 验证表单字段
     * @returns {boolean} 验证是否通过
     */
    validateForm() {
      let isValid = true;
      this.errors = {};
      
      this.formConfig.fields.forEach(field => {
        // 必填验证
        if (field.required && !this.formData[field.name]) {
          this.errors[field.name] = `${field.label}不能为空`;
          isValid = false;
        }
        
        // 自定义验证规则
        if (field.rules && this.formData[field.name]) {
          field.rules.forEach(rule => {
            // 邮箱验证
            if (rule.type === 'email') {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(this.formData[field.name])) {
                this.errors[field.name] = rule.message || '请输入有效的邮箱地址';
                isValid = false;
              }
            }
            
            // 手机号验证
            if (rule.type === 'phone') {
              const phoneRegex = /^1[3-9]\d{9}$/;
              if (!phoneRegex.test(this.formData[field.name])) {
                this.errors[field.name] = rule.message || '请输入有效的手机号码';
                isValid = false;
              }
            }
            
            // 自定义正则验证
            if (rule.pattern && !rule.pattern.test(this.formData[field.name])) {
              this.errors[field.name] = rule.message || '输入格式不正确';
              isValid = false;
            }
          });
        }
      });
      
      return isValid;
    },
    
    /**
     * 处理表单提交
     */
    handleSubmit() {
      if (this.validateForm()) {
        this.$emit('submit', this.formData);
      } else {
        this.$emit('validation-error', this.errors);
      }
    },
    
    /**
     * 重置表单
     */
    resetForm() {
      this.initFormData();
      this.errors = {};
      this.$emit('reset');
    }
  }
};
</script>

<style scoped>
.form-renderer {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 500;
}

input, select, textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.radio-group {
  display: flex;
  gap: 15px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.checkbox-field {
  display: flex;
  align-items: center;
  gap: 8px;
}

.field-error {
  color: #f56c6c;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn {
  background-color: #409eff;
  color: white;
}

.reset-btn {
  background-color: #909399;
  color: white;
}
</style>