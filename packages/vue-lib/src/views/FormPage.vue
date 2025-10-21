<template>
  <div class="form-page">
    <h1>表单渲染器演示</h1>
    <FormRenderer 
      :formConfig="formConfig"
      @submit="handleSubmit"
      @reset="handleReset"
      @validation-error="handleValidationError"
    />
    
    <div v-if="submitResult" class="result-panel">
      <h3>表单提交结果：</h3>
      <pre>{{ JSON.stringify(submitResult, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
/**
 * 表单页面组件
 * 展示FormRenderer的使用方法
 */
import FormRenderer from '../components/FormRenderer.vue';

export default {
  name: 'FormPage',
  components: {
    FormRenderer
  },
  data() {
    return {
      // 表单提交结果
      submitResult: null,
      // 表单配置
      formConfig: {
        title: '用户信息表单',
        submitText: '提交表单',
        resetText: '清空表单',
        fields: [
          {
            type: 'input',
            name: 'username',
            label: '用户名',
            placeholder: '请输入用户名',
            required: true,
            defaultValue: ''
          },
          {
            type: 'input',
            name: 'email',
            label: '邮箱',
            inputType: 'email',
            placeholder: '请输入邮箱',
            required: true,
            rules: [
              {
                type: 'email',
                message: '请输入有效的邮箱地址'
              }
            ]
          },
          {
            type: 'input',
            name: 'phone',
            label: '手机号',
            placeholder: '请输入手机号',
            required: true,
            rules: [
              {
                type: 'phone',
                message: '请输入有效的手机号码'
              }
            ]
          },
          {
            type: 'select',
            name: 'gender',
            label: '性别',
            placeholder: '请选择性别',
            required: true,
            options: [
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
              { label: '其他', value: 'other' }
            ]
          },
          {
            type: 'radio',
            name: 'userType',
            label: '用户类型',
            required: true,
            options: [
              { label: '个人用户', value: 'personal' },
              { label: '企业用户', value: 'business' }
            ],
            defaultValue: 'personal'
          },
          {
            type: 'checkbox',
            name: 'agreement',
            label: '我已阅读并同意用户协议',
            required: true
          },
          {
            type: 'textarea',
            name: 'description',
            label: '个人简介',
            placeholder: '请输入个人简介',
            rows: 4
          }
        ]
      }
    };
  },
  methods: {
    /**
     * 处理表单提交
     * @param {Object} formData 表单数据
     */
    handleSubmit(formData) {
      console.log('表单提交数据:', formData);
      this.submitResult = formData;
      // 这里可以发送API请求
    },
    
    /**
     * 处理表单重置
     */
    handleReset() {
      console.log('表单已重置');
      this.submitResult = null;
    },
    
    /**
     * 处理表单验证错误
     * @param {Object} errors 错误信息
     */
    handleValidationError(errors) {
      console.error('表单验证错误:', errors);
    }
  }
};
</script>

<style scoped>
.form-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.result-panel {
  margin-top: 30px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

pre {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>